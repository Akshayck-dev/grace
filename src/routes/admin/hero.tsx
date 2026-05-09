import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil, Trash2, Upload, Image as ImageIcon, Smartphone } from "lucide-react";
import { useState, useRef } from "react";
import { useHero } from "@/hooks/use-hero";
import { HeroSlide } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/hero")({
  component: AdminHero,
});

function AdminHero() {
  const { heroQuery, createMutation, updateMutation, deleteMutation } = useHero();
  const [editingSlide, setEditingSlide] = useState<Partial<HeroSlide> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [isQuickAdd, setIsQuickAdd] = useState(false);
  
  const [desktopImage, setDesktopImage] = useState<string>("");
  const [mobileImage, setMobileImage] = useState<string>("");
  const [desktopFile, setDesktopFile] = useState<File | null>(null);
  const [mobileFile, setMobileFile] = useState<File | null>(null);
  
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const slides = heroQuery.data || [];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'desktop' | 'mobile') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Intelligent Resizer: Maintains performance while allowing custom compositions
    const targetWidth = type === 'desktop' ? 1920 : 800;
    
    const img = new Image();
    const reader = new FileReader();
    
    reader.onload = (event) => {
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scaleFactor = targetWidth / img.width;
        const width = img.width > targetWidth ? targetWidth : img.width;
        const height = img.width > targetWidth ? img.height * scaleFactor : img.height;
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const suffix = type === 'mobile' ? "_mobile.jpg" : "_desktop.jpg";
              const resizedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + suffix, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              
              if (type === 'mobile') {
                setMobileFile(resizedFile);
                setMobileImage(URL.createObjectURL(blob));
              } else {
                setDesktopFile(resizedFile);
                setDesktopImage(URL.createObjectURL(blob));
              }
            }
          }, 'image/jpeg', 0.85);
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // STEP 1: Create the record with the Desktop Image first
    const createData: any = {
      category: "Slider",
      order_index: Number(formData.get("order_index") || 0),
      image: desktopFile || undefined,
      title: '{"eyebrow":"","title1":"","title2":""}',
      description: '{"description":"","cta":"","accent_to":""}'
    };

    if (editingSlide?.id) {
      // For existing slides, just update everything normally
      const updateData = {
        ...createData,
        image: desktopFile || undefined,
        mobileImage: mobileFile || undefined,
        eyebrow: "", // Simplified out
        title1: formData.get("title") as string || "", // New unified title
        title2: "", // Simplified out
        description: formData.get("description") as string || "",
        cta: "Explore More", // Standardized
        accent_to: "/treatments", // Standardized
      };
      await updateMutation.mutateAsync({ id: editingSlide.id, data: updateData });
    } else {
      // AUTO-SYNC FLOW for New Slides:
      // A. Create the base record
      await createMutation.mutateAsync(createData);
      
      // B. Refetch and find the newest record ID
      const { data: freshSlides } = await heroQuery.refetch();
      const newestSlide = freshSlides?.sort((a: any, b: any) => b.id - a.id)[0];

      // C. If we have a mobile file, immediately sync it to that new ID
      if (newestSlide?.id && mobileFile) {
        await updateMutation.mutateAsync({
          id: newestSlide.id,
          data: {
            ...createData,
            mobileImage: mobileFile,
            slider_mob: mobileFile // Master key for stability
          }
        });
      }
    }
    
    setIsDialogOpen(false);
    setDesktopImage("");
    setMobileImage("");
    setDesktopFile(null);
    setMobileFile(null);
    setEditingSlide(null);
  };

  const handleEdit = (slide: HeroSlide) => {
    setIsQuickAdd(false);
    setEditingSlide(slide);
    setDesktopImage(slide.image_url);
    setMobileImage(slide.mobile_image_url);
    setDesktopFile(null);
    setMobileFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;
    await deleteMutation.mutateAsync(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Hero Section</h1>
          <p className="text-muted-foreground mt-1">Manage the slides in your homepage hero carousel.</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setDesktopImage("");
              setMobileImage("");
              setEditingSlide({});
            }
          }}>
            <DialogTrigger asChild>
              <Button className="rounded-xl px-6 shadow-lg hover:shadow-xl transition-all font-bold text-xs uppercase tracking-tight bg-black text-white hover:bg-zinc-800">
                <Plus className="h-4 w-4 mr-2" />
                Upload Slide
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-[2rem] p-0 border-none shadow-2xl bg-white/95 backdrop-blur-xl">
              <div className="p-6 space-y-5">
                <DialogHeader>
                  <DialogTitle className="text-xl font-display font-bold tracking-tight text-center">
                    {editingSlide?.id ? "Edit Slide" : "Upload New Slide"}
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSave} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-1 flex items-center gap-2">
                        <ImageIcon className="h-3 w-3" /> Desktop
                      </label>
                      <div 
                        className="group relative h-32 rounded-2xl border-2 border-dashed border-muted hover:border-black hover:bg-muted/10 transition-all overflow-hidden bg-muted/30 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-inner"
                        onClick={() => desktopInputRef.current?.click()}
                      >
                        {desktopImage ? (
                          <>
                            <img src={desktopImage} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                              <Button type="button" size="sm" variant="secondary" className="rounded-full h-8 px-4 font-bold text-[10px] uppercase">
                                Change
                              </Button>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-center px-4">
                            <Upload className="h-5 w-5 text-muted-foreground group-hover:text-black transition-colors" />
                            <span className="text-[9px] font-bold uppercase text-muted-foreground group-hover:text-black">Upload Desktop</span>
                          </div>
                        )}
                        <input type="file" ref={desktopInputRef} className="hidden" onChange={(e) => handleFileChange(e, 'desktop')} accept="image/*" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-1 flex items-center gap-2">
                        <Smartphone className="h-3 w-3" /> Mobile
                      </label>
                      <div 
                        className="group relative h-32 rounded-2xl border-2 border-dashed border-muted hover:border-black hover:bg-muted/10 transition-all overflow-hidden bg-muted/30 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-inner"
                        onClick={() => mobileInputRef.current?.click()}
                      >
                        {mobileImage ? (
                          <>
                            <img src={mobileImage} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                              <Button type="button" size="sm" variant="secondary" className="rounded-full h-8 px-4 font-bold text-[10px] uppercase">
                                Change
                              </Button>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-center px-4">
                            <Upload className="h-5 w-5 text-muted-foreground group-hover:text-black transition-colors" />
                            <span className="text-[9px] font-bold uppercase text-muted-foreground group-hover:text-black">Upload Mobile</span>
                          </div>
                        )}
                        <input type="file" ref={mobileInputRef} className="hidden" onChange={(e) => handleFileChange(e, 'mobile')} accept="image/*" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-1">Main Title</label>
                    <Input name="title" defaultValue={editingSlide?.title1} placeholder="e.g. Rediscover Your Natural Radiance" className="rounded-xl border-muted bg-muted/30 focus:bg-white transition-all h-9 px-3 text-xs font-medium" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-1">Description</label>
                    <Textarea name="description" defaultValue={editingSlide?.description} placeholder="Enter your slide message..." className="rounded-xl border-muted bg-muted/30 focus:bg-white transition-all min-h-[80px] px-3 py-2 text-xs font-medium resize-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-1">Order Index</label>
                    <Input name="order_index" type="number" defaultValue={editingSlide?.order_index || slides.length + 1} required className="rounded-xl border-muted bg-muted/30 focus:bg-white transition-all h-9 px-3 text-xs font-medium" />
                  </div>

                  <DialogFooter className="pt-2 flex gap-2">
                    <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-10 flex-1 font-bold text-[10px] uppercase tracking-widest hover:bg-muted">
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="rounded-xl h-10 flex-1 font-bold shadow-lg bg-black text-white hover:bg-zinc-800 text-[10px] uppercase tracking-widest" 
                      disabled={createMutation.isPending || updateMutation.isPending}
                    >
                      {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Slide"}
                    </Button>
                  </DialogFooter>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
        {heroQuery.isLoading ? (
          <div className="h-32 flex items-center justify-center">Loading slides...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[80px]">Order</TableHead>
                <TableHead className="w-[120px]">Image</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Links</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slides.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    No slides found. Add your first hero slide!
                  </TableCell>
                </TableRow>
              ) : (
                slides.map((slide) => (
                  <TableRow key={slide.id}>
                    <TableCell className="font-medium">#{slide.order_index}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <div className="group relative">
                          <div className="h-10 w-16 rounded-lg overflow-hidden border border-border bg-muted shadow-sm">
                            <img src={slide.image_url} alt="Desktop" className="h-full w-full object-cover" />
                          </div>
                          <div className="absolute -top-1 -left-1 bg-black text-[8px] text-white px-1 rounded-sm font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Web</div>
                        </div>
                        <div className="group relative">
                          <div className="h-10 w-8 rounded-lg overflow-hidden border border-border bg-muted shadow-sm">
                            <img src={slide.mobile_image_url} alt="Mobile" className="h-full w-full object-cover" />
                          </div>
                          <div className="absolute -top-1 -left-1 bg-aurora text-[8px] text-white px-1 rounded-sm font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Mob</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {slide.eyebrow?.startsWith('{') ? "" : slide.eyebrow}
                        </div>
                        <div className="font-bold text-base truncate">
                          {slide.title1?.startsWith('{') ? "New Slide" : `${slide.title1} ${slide.title2}`}
                        </div>
                        <div className="text-sm text-muted-foreground truncate">
                          {slide.description?.startsWith('{') ? "No description added yet." : slide.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs space-y-1">
                        <div className="font-semibold">CTA: {slide.cta}</div>
                        <div className="text-muted-foreground">{slide.accent_to}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => handleEdit(slide)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(slide.id)}
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
