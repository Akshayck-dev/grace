import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pageContentApi, PageContent } from "@/api/page-content";
import { GalleryItem } from "@/types";
import { toast } from "sonner";
import { BASE_URL } from "@/api/config";

const getFullImageUrl = (path: string | File | null) => {
  if (!path || typeof path !== "string" || path === "/uploads/") return null;
  let url = path;
  if (!path.startsWith("http")) {
    url = `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  }
  
  const token = localStorage.getItem("auth_token");
  if (token) {
    return `${url}${url.includes("?") ? "&" : "?"}token=${token}`;
  }
  return url;
};

export const useGallery = () => {
  const queryClient = useQueryClient();

  const galleryQuery = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      try {
        const data = await pageContentApi.getAll("Gallery");
        return data
          .filter(item => item.isActive)
          .map((item, index): GalleryItem => ({
            id: item.id || index + 2000,
            title: item.title || "",
            tag: item.location || "",
            image_url: getFullImageUrl(item.image as string) || "",
            order_index: item.displayOrder,
          }));
      } catch (error) {
        const data = await pageContentApi.getAllForCustomers("Gallery");
        return data.map((item, index): GalleryItem => ({
          id: item.id || index + 2000,
          title: item.title || "",
          tag: item.location || "",
          image_url: getFullImageUrl(item.image as string) || "",
          order_index: item.displayOrder,
        }));
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: { title: string; tag: string; image: File; order_index: number }) =>
      pageContentApi.addOrUpdate({
        id: 0,
        title: data.title,
        location: data.tag,
        image: data.image,
        category: "Gallery",
        displayOrder: data.order_index,
        isActive: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Image added to gallery");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { title: string; tag: string; image?: File; order_index: number } }) =>
      pageContentApi.addOrUpdate({
        id,
        title: data.title,
        location: data.tag,
        image: data.image || null,
        category: "Gallery",
        displayOrder: data.order_index,
        isActive: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Gallery item updated");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => pageContentApi.delete(id, "Gallery"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Image removed from gallery");
    },
  });

  return {
    galleryQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
