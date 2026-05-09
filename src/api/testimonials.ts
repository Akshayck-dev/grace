import axios from "@/lib/axios";
import { Testimonial } from "@/types";

export const testimonialsApi = {
  getAll: async () => {
    const { data } = await axios.get<Testimonial[]>("/testimonials");
    return data;
  },
  create: async (testimonial: Omit<Testimonial, "id">) => {
    const { data } = await axios.post<Testimonial>("/testimonials", testimonial);
    return data;
  },
  update: async (id: number, testimonial: Partial<Testimonial>) => {
    const { data } = await axios.put<Testimonial>(`/testimonials/${id}`, testimonial);
    return data;
  },
  delete: async (id: number) => {
    await axios.delete(`/testimonials/${id}`);
  },
};
