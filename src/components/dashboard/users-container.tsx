"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  AlertTriangle,
  UserCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// User validation schema
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50).trim(),
  role: z.enum(["admin", "user"]),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
}

interface UsersContainerProps {
  currentUserId: string;
}

export function UsersContainer({ currentUserId }: UsersContainerProps) {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Edit Sheet states
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Delete dialog states
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: async (data) => {
      const result = userSchema.safeParse(data);
      if (!result.success) {
        const fieldErrors: Record<string, { message: string }> = {};
        result.error.issues.forEach((issue) => {
          const path = issue.path[0] as string;
          fieldErrors[path] = { message: issue.message };
        });
        return { values: {}, errors: fieldErrors };
      }
      return { values: result.data, errors: {} };
    },
    defaultValues: {
      name: "",
      role: "user",
    },
  });

  const roleValue = watch("role");

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Open Edit Sheet
  const handleEditOpen = (user: UserData) => {
    setEditingUser(user);
    setFormError("");
    reset({
      name: user.name,
      role: user.role,
    });
    setIsEditOpen(true);
  };

  // Submit User Edits
  const onSubmit = async (data: UserFormValues) => {
    if (!editingUser) return;
    setFormError("");
    setSubmitting(true);
    try {
      const res = await fetch(`/api/users/${editingUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        await fetchUsers();
        setIsEditOpen(false);
      } else {
        const errData = await res.json();
        setFormError(errData.error || "Failed to update user profile.");
      }
    } catch (err) {
      console.error(err);
      setFormError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Open Delete Confirmation
  const handleDeleteOpen = (user: UserData) => {
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };

  // Confirm Delete Action
  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    try {
      const res = await fetch(`/api/users/${userToDelete._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers(users.filter((u) => u._id !== userToDelete._id));
        setDeleteConfirmOpen(false);
        setUserToDelete(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filters
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Title section */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white font-mono uppercase">
          User Console Directory
        </h2>
        <p className="text-xs text-zinc-500 font-mono">
          Manage system operator credentials, roles, and administrative flags.
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search operator registry..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 h-9 border-zinc-900 bg-zinc-950/50 text-xs text-zinc-300 placeholder-zinc-500 focus:border-primary rounded-lg font-mono"
          />
        </div>
      </div>

      {/* Table grid */}
      <Card className="border-zinc-900 bg-zinc-950/20 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center justify-between py-3 border-b border-zinc-900 last:border-0 animate-pulse">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-zinc-800 rounded" />
                  <div className="h-3 w-48 bg-zinc-900 rounded" />
                </div>
                <div className="h-6 w-16 bg-zinc-800 rounded-full" />
              </div>
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="mx-auto h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
              <UserCheck className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white font-mono uppercase">No Operators Match Search</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Refine your filter query to match name, email, or role fields.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-900 bg-zinc-950/80 font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                  <th className="p-4 font-semibold">Operator Info</th>
                  <th className="p-4 font-semibold">Console Authorization</th>
                  <th className="p-4 font-semibold">Registered Since</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 bg-transparent">
                {paginatedUsers.map((user) => {
                  const isSelf = currentUserId === user._id;
                  return (
                    <tr key={user._id} className="hover:bg-zinc-950/40 transition-colors group">
                      <td className="p-4">
                        <div className="font-semibold text-white text-sm font-mono flex items-center gap-2">
                          {user.name}
                          {isSelf && (
                            <span className="text-[9px] font-mono font-bold bg-primary/10 text-primary border border-primary/20 rounded px-1">
                              YOU
                            </span>
                          )}
                        </div>
                        <div className="text-zinc-400 text-xs mt-0.5">{user.email}</div>
                      </td>
                      <td className="p-4">
                        {user.role === "admin" ? (
                          <Badge className="bg-primary/10 text-primary border border-primary/20 gap-1 font-mono uppercase text-[10px] py-0.5">
                            Admin
                          </Badge>
                        ) : (
                          <Badge className="bg-zinc-800 text-zinc-300 border border-zinc-700 gap-1 font-mono uppercase text-[10px] py-0.5">
                            User
                          </Badge>
                        )}
                      </td>
                      <td className="p-4 font-mono text-zinc-400">
                        {new Date(user.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 border border-transparent">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg w-40 text-xs font-mono">
                            <DropdownMenuItem
                              onClick={() => handleEditOpen(user)}
                              className="cursor-pointer py-1.5 focus:bg-zinc-900"
                            >
                              <Edit2 className="h-3.5 w-3.5 mr-2 text-zinc-500" />
                              Edit Privileges
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-zinc-900" />
                            <DropdownMenuItem
                              onClick={() => handleDeleteOpen(user)}
                              disabled={isSelf}
                              className="cursor-pointer py-1.5 text-rose-400 focus:text-rose-400 focus:bg-rose-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              <Trash2 className="h-3.5 w-3.5 mr-2" />
                              Decommission
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-zinc-900 p-4 bg-zinc-950/40">
                <div className="text-[10px] font-mono text-zinc-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
                  {filteredUsers.length} operators
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 rounded-lg border-zinc-800 bg-transparent text-zinc-400 hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-xs font-mono text-zinc-400 px-2">
                    {currentPage} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 rounded-lg border-zinc-800 bg-transparent text-zinc-400 hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Edit Operator Privileges Sheet */}
      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <SheetContent className="w-full sm:max-w-md bg-zinc-950 border-l border-zinc-900 text-zinc-300 p-6 flex flex-col h-full">
          <SheetHeader className="pb-4 border-b border-zinc-900">
            <SheetTitle className="text-white font-mono uppercase text-sm tracking-wide">
              Modify Operator Privileges
            </SheetTitle>
            <SheetDescription className="text-zinc-500 text-xs font-mono">
              Adjust console authorization and access role mappings.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex-1 pt-6 overflow-y-auto">
            {formError && (
              <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3 text-xs text-rose-400 font-mono">
                {formError}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-mono text-zinc-400 uppercase">
                Operator Username
              </Label>
              <Input
                id="name"
                placeholder="e.g. Shashank Prabhu"
                {...register("name")}
                className="h-9 border-zinc-900 bg-zinc-900/50 text-xs text-white placeholder-zinc-600 focus:border-primary rounded-lg font-mono"
              />
              {errors.name && (
                <p className="text-[10px] text-rose-400 font-mono">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="role" className="text-xs font-mono text-zinc-400 uppercase">
                Console Authorization Role
              </Label>
              <Select value={roleValue} onValueChange={(val) => setValue("role", val as "admin" | "user")}>
                <SelectTrigger className="w-full h-9 border-zinc-900 bg-zinc-900/50 text-xs text-white font-mono rounded-lg">
                  <SelectValue placeholder="Select authorization role" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs">
                  <SelectItem value="user">User (Restricted Access)</SelectItem>
                  <SelectItem value="admin">Admin (Full Control Access)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 border-t border-zinc-900 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsEditOpen(false)}
                className="text-xs font-mono text-zinc-400 hover:text-white rounded-lg h-9"
              >
                Abort
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-primary text-black hover:bg-primary-hover font-mono text-xs h-9 rounded-lg"
              >
                {submitting ? "Processing..." : "Apply Updates"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmOpen && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirmOpen(false)} />
          
          <div className="relative z-10 w-full max-w-sm rounded-xl border border-zinc-900 bg-zinc-950 p-6 space-y-6 text-zinc-300">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold font-mono text-white uppercase tracking-wide">
                  Confirm Decommission
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Are you sure you want to decommission account <span className="font-mono text-rose-400 font-semibold">{userToDelete.email}</span>? They will lose all console access.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 text-xs font-mono">
              <Button
                variant="ghost"
                onClick={() => setDeleteConfirmOpen(false)}
                className="text-zinc-400 hover:text-white h-9 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className="bg-rose-500 text-white hover:bg-rose-600 h-9 rounded-lg font-semibold"
              >
                Decommission
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
