
"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Palette, Bell, ShieldCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  enableDarkMode: z.boolean().default(false),
  logo: z.any().optional(),
  platformName: z.string().min(1, "Platform name is required."),
  enableAiProctoring: z.boolean().default(true),
  maxRetakes: z.string(),
  disableCopyPaste: z.boolean().default(true),
  emailOnSignup: z.boolean().default(true),
  emailOnResult: z.boolean().default(false),
});


export default function PlatformSettingsPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableDarkMode: false,
      platformName: "TestPress",
      enableAiProctoring: true,
      maxRetakes: "2",
      disableCopyPaste: true,
      emailOnSignup: true,
      emailOnResult: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Settings saved:", values);
    toast({
      title: "Settings Saved!",
      description: "Your platform settings have been successfully updated.",
    });
  }

  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Platform Settings</h1>
            <p className="text-muted-foreground mt-1">Configure global settings for the TestPress platform.</p>
        </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Palette/> Theme & Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the platform.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="enableDarkMode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Enable Dark Mode for All Users</FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="logo"
                      render={({ field }) => (
                        <FormItem>
                            <FormLabel>Upload Logo</FormLabel>
                             <FormControl>
                                <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0] ?? null)} />
                            </FormControl>
                            <p className="text-xs text-muted-foreground">Recommended size: 200x50px. PNG format.</p>
                            <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="platformName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Platform Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ShieldCheck/> Exam Policies</CardTitle>
                    <CardDescription>Set global rules for all examinations conducted on the platform.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="enableAiProctoring"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Enable AI Proctoring by Default</FormLabel>
                            </div>
                            <FormControl>
                                <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            </FormItem>
                        )}
                        />
                         <FormField
                            control={form.control}
                            name="maxRetakes"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Maximum Retake Attempts</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger className="w-full md:w-1/2">
                                        <SelectValue placeholder="Select max retakes" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="0">No retakes allowed</SelectItem>
                                        <SelectItem value="1">1 Retake</SelectItem>
                                        <SelectItem value="2">2 Retakes</SelectItem>
                                        <SelectItem value="3">3 Retakes</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="disableCopyPaste"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Disable Copy/Paste During Exams</FormLabel>
                                </div>
                                <FormControl>
                                    <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                </FormItem>
                            )}
                        />
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bell/> Notification Settings</CardTitle>
                    <CardDescription>Configure email and platform notification settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="emailOnSignup"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Send Welcome Email on User Signup</FormLabel>
                            </div>
                            <FormControl>
                                <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            </FormItem>
                        )}
                        />
                       <FormField
                        control={form.control}
                        name="emailOnResult"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Email Students Their Results Automatically</FormLabel>
                            </div>
                            <FormControl>
                                <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            </FormItem>
                        )}
                        />
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit">Save All Changes</Button>
            </div>
        </form>
      </Form>
    </div>
  );
}
