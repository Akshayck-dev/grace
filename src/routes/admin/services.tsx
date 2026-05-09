import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil, Trash2, Sparkles, Droplet, Sun, Heart, Flower2, Gem } from "lucide-react";
import { useState } from "react";
import { useServices } from "@/hooks/use-services";
import { Service } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/services")({
  component: AdminServices,
});

const iconOptions = [
  { name: "Sparkles", icon: Sparkles },
  { name: "Droplet", icon: Droplet },
  { name: "Sun", icon: Sun },
  { name: "Heart", icon: Heart },
  { name: "Flower2", icon: Flower2 },
  { name: "Gem", icon: Gem },
];

function AdminServices() {
  const { servicesQuery, createMutation, updateMutation, deleteMutation } = useServices();
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("Sparkles");

  const services = servicesQuery.data || [];

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      details: formData.get("details") as string,
      icon_name: selectedIcon,
      order_index: Number(formData.get("order_index") || 0),
    };

    if (editingService?.id) {
      await updateMutation.mutateAsync({ id: editingService.id, data });
    } else {
      await createMutation.mutateAsync(data as any);
    }
    
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    await deleteMutation.mutateAsync(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Services</h1>
          <p className="text-muted-foreground mt-1">Manage the treatment options listed on your site.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingService({}); setSelectedIcon("Sparkles"); }} className="rounded-xl px-6 shadow-lg hover:shadow-xl transition-all">
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 border-none shadow-2xl">
            <div className="p-8 space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold">{editingService?.id ? "Edit Service" : "Add New Service"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">Service Title</label>
                    <Input name="title" defaultValue={editingService?.title} placeholder="e.g. Signature Facials" required className="rounded-xl border-muted bg-muted/30 focus:bg-white transition-all h-11" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground">Icon</label>
                    <Select value={selectedIcon} onValueChange={setSelectedIcon}>
                      <SelectTrigger className="rounded-xl border-muted bg-muted/30 focus:bg-white transition-all h-11">
                        <SelectValue placeholder="Select icon" />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((opt) => (
                          <SelectItem key={opt.name} value={opt.name}>
                            <div className="flex items-center gap-2">
                              <opt.icon className="h-4 w-4" />
                              {opt.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">Short Description</label>
                  <Textarea name="description" defaultValue={editingService?.description} placeholder="A brief summary..." required className="rounded-xl border-muted bg-muted/30 focus:bg-white transition-all min-h-[100px] resize-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">Extended Details</label>
                  <Textarea name="details" defaultValue={editingService?.details} placeholder="List treatments, etc..." required className="rounded-xl border-muted bg-muted/30 focus:bg-white transition-all min-h-[100px] resize-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">Order Index</label>
                  <Input name="order_index" type="number" defaultValue={editingService?.order_index} required className="rounded-xl border-muted bg-muted/30 focus:bg-white transition-all h-11" />
                </div>
                <DialogFooter className="pt-4 flex gap-2">
                  <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 flex-1 font-medium">Cancel</Button>
                  <Button type="submit" className="rounded-xl h-12 flex-1 font-bold shadow-lg" disabled={createMutation.isPending || updateMutation.isPending}>
                    {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Service"}
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
        {servicesQuery.isLoading ? (
          <div className="h-32 flex items-center justify-center">Loading services...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[80px]">Order</TableHead>
                <TableHead className="w-[100px]">Icon</TableHead>
                <TableHead>Service Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    No services found.
                  </TableCell>
                </TableRow>
              ) : (
                services.map((service) => {
                  const IconComp = iconOptions.find(i => i.name === service.icon_name)?.icon || Sparkles;
                  return (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">#{service.order_index}</TableCell>
                      <TableCell>
                        <div className="h-10 w-10 rounded-xl bg-black text-white flex items-center justify-center">
                          <IconComp className="h-5 w-5" />
                        </div>
                      </TableCell>
                      <TableCell className="font-bold">
                        {service.title?.startsWith('{') ? "New Treatment" : service.title}
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-muted-foreground">
                        {service.description?.startsWith('{') ? "No description added yet." : service.description}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-full"
                            onClick={() => {
                              setEditingService(service);
                              setSelectedIcon(service.icon_name);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-full text-red-500"
                            onClick={() => handleDelete(service.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
