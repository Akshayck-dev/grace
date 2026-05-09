import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil, Trash2, Star, User, Upload, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";
import { useTestimonials } from "@/hooks/use-testimonials";
import { Testimonial } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/testimonials")({
  component: AdminTestimonials,
});

function AdminTestimonials() {
  const { testimonialsQuery, createMutation, updateMutation, deleteMutation } = useTestimonials();
  const [editingT, setEditingT] = useState<Partial<Testimonial> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [previewAvatar, setPreviewAvatar] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const testimonials = testimonialsQuery.data || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      quote: formData.get("quote") as string,
      rating: Number(formData.get("rating") || 5),
      order_index: Number(formData.get("order_index") || 0),
      image: selectedFile || undefined,
    };

    if (editingT?.id) {
      await updateMutation.mutateAsync({ id: editingT.id, data: data as any });
    } else {
      if (!selectedFile) return toast.error("Please select an avatar");
      await createMutation.mutateAsync(data as any);
    }
    
    setIsDialogOpen(false);
    setPreviewAvatar("");
    setSelectedFile(null);
  };

  const handleEdit = (t: Testimonial) => {
    setEditingT(t);
    setPreviewAvatar(t.avatar_url);
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    await deleteMutation.mutateAsync(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Testimonials</h1>
          <p className="text-muted-foreground mt-1">Manage what your clients are saying about you.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setPreviewAvatar("");
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingT({ rating: 5 })} className="rounded-xl px-6 shadow-lg hover:shadow-xl transition-all">
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[380px] max-h-[90vh] overflow-y-auto rounded-[2rem] p-0 border-none shadow-2xl bg-white/95 backdrop-blur-xl">
            <div className="p-6 space-y-5">
              <DialogHeader>
                <DialogTitle className="text-xl font-display font-bold tracking-tight text-center">{editingT?.id ? "Edit Feedback" : "Add Feedback"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-5">
                <div className="flex items-center gap-5">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="h-20 w-20 rounded-full border-2 border-dashed border-muted hover:border-black hover:bg-muted/10 transition-all cursor-pointer overflow-hidden bg-muted/30 flex items-center justify-center group relative flex-shrink-0 shadow-inner"
                  >
                    {previewAvatar ? (
                      <>
                        <img src={previewAvatar} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                          <Upload className="h-4 w-4 text-white" />
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-2">
                        <User className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                        <span className="text-[8px] font-bold uppercase tracking-tighter text-muted-foreground">Photo</span>
                      </div>
                    )}
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-1">Client Name</label>
                      <Input name="name" defaultValue={editingT?.name} placeholder="Name..." required className="rounded-xl border-muted bg-muted/30 focus:bg-white transition-all h-9 px-3 text-xs font-medium" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-1">Subtitle</label>
                      <Input name="role" defaultValue={editingT?.role} placeholder="Service..." required className="rounded-xl border-muted bg-muted/30 focus:bg-white transition-all h-9 px-3 text-xs font-medium" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-1">Quote</label>
                    <Textarea name="quote" defaultValue={editingT?.quote} placeholder="Message..." required className="rounded-xl border-muted bg-muted/30 focus:bg-white transition-all min-h-[80px] resize-none px-3 py-2 text-xs font-medium leading-relaxed" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-1">Rating (1-5)</label>
                      <Input name="rating" type="number" min="1" max="5" defaultValue={editingT?.rating} required className="rounded-xl border-muted bg-muted/30 focus:bg-white transition-all h-9 px-3 text-xs font-medium" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-1">Order</label>
                      <Input name="order_index" type="number" defaultValue={editingT?.order_index} required className="rounded-xl border-muted bg-muted/30 focus:bg-white transition-all h-9 px-3 text-xs font-medium" />
                    </div>
                  </div>
                </div>
                
                <DialogFooter className="pt-1 flex gap-2">
                  <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-10 flex-1 font-bold text-[10px] uppercase tracking-widest hover:bg-muted">
                    Cancel
                  </Button>
                  <Button type="submit" className="rounded-xl h-10 flex-1 font-bold shadow-lg bg-black text-white hover:bg-zinc-800 text-[10px] uppercase tracking-widest" disabled={createMutation.isPending || updateMutation.isPending}>
                    {createMutation.isPending || updateMutation.isPending ? "..." : "Save"}
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
        {testimonialsQuery.isLoading ? (
          <div className="h-32 flex items-center justify-center">Loading testimonials...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[80px]">Order</TableHead>
                <TableHead className="w-[200px]">Client</TableHead>
                <TableHead>Testimonial</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    No testimonials found.
                  </TableCell>
                </TableRow>
              ) : (
                testimonials.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">#{t.order_index}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden border border-border bg-muted flex-shrink-0">
                          {t.avatar_url ? (
                            <img src={t.avatar_url} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <User className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold truncate">
                            {t.name?.startsWith('{') ? "New Feedback" : t.name}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {t.role?.startsWith('{') ? "" : t.role}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm line-clamp-2 italic text-muted-foreground">
                        {t.quote?.startsWith('{') ? "No message added yet." : `"${t.quote}"`}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current" />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="rounded-full"
                          onClick={() => handleEdit(t)}
                        >
                          <Pencil className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="rounded-full text-red-500"
                          onClick={() => handleDelete(t.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
