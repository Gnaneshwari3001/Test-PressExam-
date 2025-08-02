
"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { database } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";

interface UserProfile {
    uid: string;
    name: string;
    email: string;
    role: 'student' | 'instructor' | 'admin';
}

const formSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("A valid email is required."),
  role: z.enum(["student", "instructor", "admin"], { required_error: "Please select a role." }),
});

export default function EditUserPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "student",
    },
  });

   useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        const userRef = ref(database, `users/${userId}`);
        try {
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const userData = { uid: userId, ...snapshot.val() };
                setUser(userData);
                form.reset({
                    name: userData.name,
                    email: userData.email,
                    role: userData.role,
                });
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast({ title: "Error", description: "Failed to fetch user data.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [userId, form, toast]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Updated user values:", values);
    // In a real app, you would update the user in Firebase Auth and DB here.
    toast({
      title: "User Updated!",
      description: "The user details have been successfully updated.",
    });
    router.push("/admin/students");
  }
  
  if (loading) {
    return <Skeleton className="w-full h-96" />
  }

  if (!user) {
    return <div>User not found!</div>
  }

  return (
    <div>
        <header className="flex items-center mb-8">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight font-headline ml-4">Edit User</h1>
        </header>
        
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Editing profile for {user.name}</CardTitle>
                <CardDescription>Modify the details for this user account.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder="John Doe" {...field} />
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
                            <Input type="email" placeholder="user@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="instructor">Instructor</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" type="button" onClick={() => router.push('/admin/students')}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
