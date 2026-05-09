import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";
import { useGallery } from "@/hooks/use-gallery";
import { GalleryItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
});

function AdminGallery() {
  const { galleryQuery, createMutation, updateMutation, deleteMutation } = useGallery();
  const [editingItem, setEditingItem] = useState<Partial<GalleryItem> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [previewImage, setPreviewImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const items = galleryQuery.data || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      tag: formData.get("tag") as string,
      image: selectedFile || undefined,
      order_index: Number(formData.get("order_index") || 0),
    };

    if (editingItem?.id) {
      await updateMutation.mutateAsync({ id: editingItem.id, data: data as any });
    } else {
      if (!selectedFile) return toast.error("Please select an image");
      await createMutation.mutateAsync(data as any);
    }
    
    setIsDialogOpen(false);
    setPreviewImage("");
    setSelectedFile(null);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setPreviewImage(item.image_url);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    await deleteMutation.mutateAsync(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Gallery</h1>
          <p className="text-muted-foreground mt-1">Manage the images showcasing your clinic and work.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setPreviewImage("");
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem({})} className="rounded-xl px-6 shadow-lg hover:shadow-xl transition-all">
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[380px] rounded-[2rem] p-0 border-none shadow-2xl overflow-hidden bg-white/95 backdrop-blur-xl">
            <div className="p-6 space-y-5">
              <DialogHeader>
                <DialogTitle className="text-xl font-display font-bold tracking-tight text-center">
                  {editingItem?.id ? "Edit Gallery" : "Add Image"}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSave} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-1">Image Preview</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="h-40 rounded-2xl border-2 border-dashed border-muted hover:border-black hover:bg-muted/10 transition-all cursor-pointer overflow-hidden bg-muted/30 flex items-center justify-center group relative shadow-inner"
                  >
                    {previewImage ? (
                      <>
                        <img src={previewImage} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                          <Upload className="h-6 w-6 text-white animate-pulse" />
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4 space-y-1">
                        <div className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-[10px] font-semibold text-muted-foreground">Click to upload</p>
                      </div>
                    )}
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-1">Title</label>
                    <Input name="title" defaultValue={editingItem?.title} placeholder="e.g. Treatment Sanctuary" required className="rounded-xl border-muted bg-muted/30 focus:bg-white transition-all h-10 px-3 font-medium text-xs" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-1">Category</label>
                      <Input name="tag" defaultValue={editingItem?.tag} placeholder="e.g. Spa" required className="rounded-xl border-muted bg-muted/30 focus:bg-white transition-all h-10 px-3 font-medium text-xs" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-1">Order</label>
                      <Input name="order_index" type="number" defaultValue={editingItem?.order_index} required className="rounded-xl border-muted bg-muted/30 focus:bg-white transition-all h-10 px-3 font-medium text-xs" />
                    </div>
                  </div>
                </div>

                <DialogFooter className="pt-1 flex gap-2">
                  <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-10 flex-1 font-bold transition-all text-[10px] uppercase tracking-widest hover:bg-muted">
                    Cancel
                  </Button>
                  <Button type="submit" className="rounded-xl h-10 flex-1 font-bold shadow-lg bg-black text-white hover:bg-zinc-800 transition-all text-[10px] uppercase tracking-widest" disabled={createMutation.isPending || updateMutation.isPending}>
                    {createMutation.isPending || updateMutation.isPending ? "..." : "Save"}
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleryQuery.isLoading ? (
          <div className="col-span-full h-48 flex items-center justify-center">Loading gallery...</div>
        ) : items.length === 0 ? (
          <div className="col-span-full h-48 bg-white rounded-3xl border border-dashed border-border flex flex-col items-center justify-center text-muted-foreground">
            <ImageIcon className="h-10 w-10 mb-2 opacity-20" />
            <p>No gallery images yet.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="aspect-video relative overflow-hidden bg-muted">
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="h-8 w-8 rounded-full shadow-lg"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="h-8 w-8 rounded-full shadow-lg"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.tag}</div>
                <div className="font-semibold truncate">{item.title}</div>
                <div className="text-xs text-muted-foreground mt-1">Order: {item.order_index}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
