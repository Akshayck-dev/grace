import axios from "@/lib/axios";
import { HeroSlide } from "@/types";

export const heroApi = {
  getAll: async () => {
    const { data } = await axios.get<HeroSlide[]>("/hero");
    return data;
  },
  create: async (slide: Omit<HeroSlide, "id">) => {
    const { data } = await axios.post<HeroSlide>("/hero", slide);
    return data;
  },
  update: async (id: number, slide: Partial<HeroSlide>) => {
    const { data } = await axios.put<HeroSlide>(`/hero/${id}`, slide);
    return data;
  },
  delete: async (id: number) => {
    await axios.delete(`/hero/${id}`);
  },
};
