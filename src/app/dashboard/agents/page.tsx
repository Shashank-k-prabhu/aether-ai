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
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  Play,
  Pause,
  AlertTriangle,
  Bot,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Agent Zod Schema
const agentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50).trim(),
  description: z.string().max(500, "Description must be under 500 characters").optional(),
  type: z.enum(["assistant", "copilot", "custom"]),
  status: z.enum(["idle", "running", "paused", "failed"]),
});

type AgentFormValues = z.infer<typeof agentSchema>;

interface Agent {
  _id: string;
  name: string;
  description?: string;
  type: "assistant" | "copilot" | "custom";
  status: "idle" | "running" | "paused" | "failed";
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Sheet states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);

  // Delete dialog states
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [mutatingIds, setMutatingIds] = useState<string[]>([]);
  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);

  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AgentFormValues>({
    resolver: async (data) => {
      // Inline validator using safeParse to avoid resolver dependency package resolution issues
      const result = agentSchema.safeParse(data);
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
      description: "",
      type: "assistant",
      status: "idle",
    },
  });

  const typeValue = watch("type");
  const statusValue = watch("status");

  // Fetch agents
  const fetchAgents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/agents");
      if (res.ok) {
        const data = await res.json();
        setAgents(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // Open form for Create
  const handleCreateOpen = () => {
    setEditingAgent(null);
    setFormError("");
    reset({
      name: "",
      description: "",
      type: "assistant",
      status: "idle",
    });
    setIsFormOpen(true);
  };

  // Open form for Edit
  const handleEditOpen = (agent: Agent) => {
    setEditingAgent(agent);
    setFormError("");
    reset({
      name: agent.name,
      description: agent.description || "",
      type: agent.type,
      status: agent.status,
    });
    setIsFormOpen(true);
  };

  // Handle Form Submit
  const onSubmit = async (data: AgentFormValues) => {
    setFormError("");
    setSubmitting(true);
    try {
      const url = editingAgent ? `/api/agents/${editingAgent._id}` : "/api/agents";
      const method = editingAgent ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        await fetchAgents();
        setIsFormOpen(false);
      } else {
        const errData = await res.json();
        setFormError(errData.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setFormError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Open Delete Confirmation
  const handleDeleteOpen = (agent: Agent) => {
    setAgentToDelete(agent);
    setDeleteConfirmOpen(true);
  };

  // Handle Delete Action
  const handleDeleteConfirm = async () => {
    if (!agentToDelete) return;
    try {
      const res = await fetch(`/api/agents/${agentToDelete._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAgents(agents.filter((a) => a._id !== agentToDelete._id));
        setDeleteConfirmOpen(false);
        setAgentToDelete(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Change agent status quick action
  const toggleStatus = async (agent: Agent) => {
    setMutatingIds((prev) => [...prev, agent._id]);
    const newStatus = agent.status === "running" ? "paused" : "running";
    try {
      const res = await fetch(`/api/agents/${agent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setAgents(agents.map((a) => (a._id === agent._id ? updated : a)));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setMutatingIds((prev) => prev.filter((id) => id !== agent._id));
    }
  };

  // Filtering
  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string, isMutating: boolean) => {
    if (isMutating) {
      return (
        <Badge className="bg-zinc-800 text-zinc-200 border border-zinc-700 gap-1.5 animate-pulse font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-ping" />
          Processing...
        </Badge>
      );
    }
    switch (status) {
      case "running":
        return <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Running</Badge>;
      case "paused":
        return <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20">Paused</Badge>;
      case "failed":
        return <Badge className="bg-rose-500/10 text-rose-400 border border-rose-500/20">Failed</Badge>;
      default:
        return <Badge className="bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">Idle</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white font-mono uppercase">
            Agent Registry
          </h2>
          <p className="text-xs text-zinc-500 font-mono">
            Provision and orchestrate autonomous system agents.
          </p>
        </div>
        <Button
          onClick={handleCreateOpen}
          className="bg-primary text-black hover:bg-primary-hover font-mono text-xs h-9 rounded-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Provision Agent
        </Button>
      </div>

      {/* Control Panel (Search / Filters) */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search agents by name or tag..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 h-9 border-zinc-900 bg-zinc-950/50 text-xs text-zinc-300 placeholder-zinc-500 focus:border-primary rounded-lg font-mono"
          />
        </div>
      </div>

      {/* Main Table Card */}
      <Card className="border-zinc-900 bg-zinc-950/20 rounded-xl overflow-hidden">
        {loading ? (
          /* Loading State */
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
        ) : filteredAgents.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center space-y-6">
            <div className="mx-auto h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
              <Bot className="h-6 w-6" />
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-sm font-semibold text-white font-mono uppercase">No Agents Provisioned</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                You haven&apos;t registered any autonomous agents yet. Get started by provisioning your first AI model integrations.
              </p>
            </div>
            <Button
              onClick={handleCreateOpen}
              variant="outline"
              className="border-zinc-800 bg-transparent text-zinc-300 hover:bg-zinc-900 text-xs font-mono h-9 rounded-lg"
            >
              <Plus className="h-3.5 w-3.5 mr-2" />
              Deploy First Agent
            </Button>
          </div>
        ) : (
          /* List View */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-900 bg-zinc-950/80 font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                  <th className="p-4 font-semibold">Agent Info</th>
                  <th className="p-4 font-semibold">Classification</th>
                  <th className="p-4 font-semibold">Operational Status</th>
                  <th className="p-4 font-semibold">Deployment Owner</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 bg-transparent">
                {paginatedAgents.map((agent) => {
                  const isMutating = mutatingIds.includes(agent._id);
                  return (
                    <tr key={agent._id} className="hover:bg-zinc-950/40 transition-colors group">
                      <td className="p-4">
                        <div className="font-semibold text-white text-sm font-mono">{agent.name}</div>
                        {agent.description && (
                          <div className="text-zinc-300 text-xs max-w-xs truncate mt-0.5">{agent.description}</div>
                        )}
                      </td>
                      <td className="p-4 capitalize">
                        <span className="font-mono text-zinc-100 bg-zinc-900/80 border border-zinc-700/80 px-2 py-0.5 rounded text-[10px]">
                          {agent.type}
                        </span>
                      </td>
                      <td className="p-4">{getStatusBadge(agent.status, isMutating)}</td>
                      <td className="p-4 font-mono text-zinc-200">
                        <div>{agent.createdBy?.name || "Operator"}</div>
                        <div className="text-[10px] text-zinc-400">{agent.createdBy?.email}</div>
                      </td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button disabled={isMutating} variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 border border-transparent disabled:opacity-50">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg w-40 text-xs font-mono">
                            <DropdownMenuItem
                              onClick={() => toggleStatus(agent)}
                              className="cursor-pointer py-1.5 focus:bg-zinc-900"
                            >
                              {agent.status === "running" ? (
                                <>
                                  <Pause className="h-3.5 w-3.5 mr-2 text-zinc-500" />
                                  Pause Agent
                                </>
                              ) : (
                                <>
                                  <Play className="h-3.5 w-3.5 mr-2 text-primary" />
                                  Resume Agent
                                </>
                              )}
                            </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-zinc-900" />
                          <DropdownMenuItem
                            onClick={() => handleEditOpen(agent)}
                            className="cursor-pointer py-1.5 focus:bg-zinc-900"
                          >
                            <Edit2 className="h-3.5 w-3.5 mr-2 text-zinc-500" />
                            Edit Schema
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteOpen(agent)}
                            className="cursor-pointer py-1.5 text-rose-400 focus:text-rose-400 focus:bg-rose-500/10"
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-zinc-900 p-4 bg-zinc-950/40">
                <div className="text-[10px] font-mono text-zinc-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredAgents.length)} of{" "}
                  {filteredAgents.length} agents
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

      {/* Create / Edit Slider Sheet */}
      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent className="w-full sm:max-w-md bg-zinc-950 border-l border-zinc-900 text-zinc-300 p-6 flex flex-col h-full">
          <SheetHeader className="pb-4 border-b border-zinc-900">
            <SheetTitle className="text-white font-mono uppercase text-sm tracking-wide">
              {editingAgent ? "Modify Agent Schema" : "Provision New Agent"}
            </SheetTitle>
            <SheetDescription className="text-zinc-500 text-xs font-mono">
              Define operational parameters for deployment.
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
                Agent Designation
              </Label>
              <Input
                id="name"
                placeholder="e.g. Sentinel-Copilot-9"
                {...register("name")}
                className="h-9 border-zinc-900 bg-zinc-900/50 text-xs text-white placeholder-zinc-600 focus:border-primary rounded-lg font-mono"
              />
              {errors.name && (
                <p className="text-[10px] text-rose-400 font-mono">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-xs font-mono text-zinc-400 uppercase">
                Description / Task Objective
              </Label>
              <textarea
                id="description"
                placeholder="Brief summary of agent scope, API pipelines, or core directives..."
                rows={3}
                {...register("description")}
                className="w-full p-3 border border-zinc-900 bg-zinc-900/50 text-xs text-white placeholder-zinc-600 focus:border-primary rounded-lg font-mono resize-none focus:outline-none"
              />
              {errors.description && (
                <p className="text-[10px] text-rose-400 font-mono">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="type" className="text-xs font-mono text-zinc-400 uppercase">
                  Classification
                </Label>
                <Select value={typeValue} onValueChange={(val) => setValue("type", val as "assistant" | "copilot" | "custom")}>
                  <SelectTrigger className="w-full h-9 border-zinc-900 bg-zinc-900/50 text-xs text-white font-mono rounded-lg">
                    <SelectValue placeholder="Select classification" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs">
                    <SelectItem value="assistant">Assistant</SelectItem>
                    <SelectItem value="copilot">Copilot</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="status" className="text-xs font-mono text-zinc-400 uppercase">
                  Initial Status
                </Label>
                <Select value={statusValue} onValueChange={(val) => setValue("status", val as "idle" | "running" | "paused" | "failed")}>
                  <SelectTrigger className="w-full h-9 border-zinc-900 bg-zinc-900/50 text-xs text-white font-mono rounded-lg">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs">
                    <SelectItem value="idle">Idle</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-900 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsFormOpen(false)}
                className="text-xs font-mono text-zinc-400 hover:text-white rounded-lg h-9"
              >
                Abort
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-primary text-black hover:bg-primary-hover font-mono text-xs h-9 rounded-lg"
              >
                {submitting ? "Processing..." : editingAgent ? "Apply Updates" : "Deploy"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmOpen && agentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirmOpen(false)} />
          
          {/* Dialog Container */}
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
                  Are you sure you want to decommission <span className="font-mono text-rose-400 font-semibold">{agentToDelete.name}</span>? This action is permanent.
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
                Delete Agent
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
