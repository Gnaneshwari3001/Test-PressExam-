
"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { onAuthStateChanged, type User as FirebaseUser, updateProfile } from 'firebase/auth';
import { auth, database, storage } from '@/lib/firebase';
import { useState, useEffect, useRef } from 'react';
import { get, ref, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { Skeleton } from "@/components/ui/skeleton";
import { Upload } from "lucide-react";

const formSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email(),
  bio: z.string().max(200, "Bio must be less than 200 characters.").optional(),
});

export default function ProfilePage() {
    const { toast } = useToast();
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: "",
            email: "",
            bio: "",
        },
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                form.setValue("displayName", currentUser.displayName || "");
                form.setValue("email", currentUser.email || "");

                // Fetch additional user data from DB (like bio)
                const userRef = ref(database, `users/${currentUser.uid}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    form.setValue("bio", snapshot.val().bio || "");
                }

            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [form]);


    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!user) return;
        try {
            // Update Firebase Auth profile
            await updateProfile(user, { displayName: values.displayName });

            // Update Realtime Database
            const userRef = ref(database, `users/${user.uid}`);
            await update(userRef, {
                name: values.displayName,
                bio: values.bio,
            });

            toast({
                title: "Profile Updated",
                description: "Your profile information has been successfully updated.",
            });
        } catch (error: any) {
            toast({
                title: "Update Failed",
                description: error.message,
                variant: "destructive",
            });
        }
    }

     const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0] && user) {
            const file = event.target.files[0];
            setUploading(true);
            try {
                const imageRef = storageRef(storage, `profile-pictures/${user.uid}`);
                await uploadBytes(imageRef, file);
                const photoURL = await getDownloadURL(imageRef);

                await updateProfile(user, { photoURL });
                
                const userDbRef = ref(database, `users/${user.uid}`);
                await update(userDbRef, { photoURL });

                // Force re-render to show new photo
                setUser({...user});

                toast({
                    title: "Photo Updated",
                    description: "Your profile picture has been successfully updated.",
                });

            } catch (error: any) {
                 toast({
                    title: "Upload Failed",
                    description: error.message,
                    variant: "destructive",
                });
            } finally {
                setUploading(false);
            }
        }
    };
    
    if (loading) {
        return <Skeleton className="h-96 w-full" />;
    }

  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Student Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your account and personal information.</p>
        </header>

        <Card>
            <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>Update your personal information below.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-6 mb-8">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={user?.photoURL || undefined} />
                        <AvatarFallback className="text-3xl">{user?.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                         <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                        />
                        <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                            <Upload className="mr-2 h-4 w-4"/> {uploading ? 'Uploading...' : 'Change Photo'}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                </div>

                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                            control={form.control}
                            name="displayName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Tell us a little about yourself" {...field} rows={4} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        <div className="flex justify-end">
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
