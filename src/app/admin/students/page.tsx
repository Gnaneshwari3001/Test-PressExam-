

"use client"

import { useEffect, useState } from "react";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { database, auth } from "@/lib/firebase";
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, UserPlus, Edit, Shield, Trash2, KeyRound } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast";

interface User {
    uid: string;
    name: string;
    email: string;
    role: 'student' | 'instructor' | 'admin';
    photoURL?: string;
    disabled?: boolean;
}

type UserRole = 'student' | 'instructor' | 'admin';

export default function StudentsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setCurrentUser(user);
        const userRef = ref(database, 'users/' + user.uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setCurrentUserRole(userData.role);
          fetchUsers(userData.role);
        }
      } else {
        setLoading(false);
      }
    });
     return () => unsubscribe();
  }, []);

  const fetchUsers = async (role: UserRole) => {
    const usersRef = ref(database, 'users');
    try {
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const allUsers = snapshot.val();
        let usersData: User[] = Object.keys(allUsers).map(uid => ({
          uid,
          ...allUsers[uid]
        }));
        if(role === 'instructor') {
          usersData = usersData.filter(user => user.role === 'student');
        }
        setUsers(usersData);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const searchMatch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = activeTab === 'all' || user.role === activeTab;
    return searchMatch && roleMatch;
  });

  const pageTitle = currentUserRole === 'admin' ? "User Management" : "Manage Students";
  const pageDescription = currentUserRole === 'admin' 
    ? "View and manage all registered students, instructors, and admins."
    : "View and manage all registered students.";
    
  const handleAction = (action: string, uid: string) => {
      toast({
          title: "Action Triggered",
          description: `${action} for user ${uid}. This feature is in development.`,
      })
  }

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">{pageTitle}</h1>
            <p className="text-muted-foreground mt-1">{pageDescription}</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline">Import CSV</Button>
            <Button onClick={() => router.push('/admin/users/new')}>
                <UserPlus className="mr-2 h-4 w-4"/> Add User
            </Button>
        </div>
      </header>

      <Card>
        <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    />
                </div>
                 {currentUserRole === 'admin' && (
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="student">Students</TabsTrigger>
                            <TabsTrigger value="instructor">Instructors</TabsTrigger>
                            <TabsTrigger value="admin">Admins</TabsTrigger>
                        </TabsList>
                    </Tabs>
                )}
            </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                   <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.uid}>
                      <TableCell className="font-medium flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={user.photoURL} alt={user.name} />
                            <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {user.name}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                       <TableCell>
                        <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'instructor' ? 'default' : 'secondary'} className="capitalize">
                          {user.role}
                        </Badge>
                      </TableCell>
                       <TableCell>
                          <Badge variant={user.disabled ? "outline" : "default"} className={user.disabled ? "" : "bg-green-600"}>
                            {user.disabled ? "Disabled" : "Active"}
                          </Badge>
                       </TableCell>
                      <TableCell className="text-right">
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => router.push(`/admin/students/${user.uid}`)}>View Profile</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push(`/admin/users/${user.uid}/edit`)}><Edit className="mr-2 h-4 w-4"/>Edit User</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAction('Change Role', user.uid)}><Shield className="mr-2 h-4 w-4"/>Change Role</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAction('Password Reset', user.uid)}><KeyRound className="mr-2 h-4 w-4"/>Send Reset Link</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive" onClick={() => handleAction('Disable User', user.uid)}><Trash2 className="mr-2 h-4 w-4"/>Disable User</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                   <TableRow>
                        <TableCell colSpan={5} className="text-center py-16 text-muted-foreground">
                            No users found.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
