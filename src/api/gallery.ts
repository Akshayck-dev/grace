import axios from "@/lib/axios";
import { GalleryItem } from "@/types";

export const galleryApi = {
  getAll: async () => {
    const { data } = await axios.get<GalleryItem[]>("/gallery");
    return data;
  },
  create: async (item: Omit<GalleryItem, "id">) => {
    const { data } = await axios.post<GalleryItem>("/gallery", item);
    return data;
  },
  update: async (id: number, item: Partial<GalleryItem>) => {
    const { data } = await axios.put<GalleryItem>(`/gallery/${id}`, item);
    return data;
  },
  delete: async (id: number) => {
    await axios.delete(`/gallery/${id}`);
  },
};
