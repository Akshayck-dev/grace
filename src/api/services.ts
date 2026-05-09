import axios from "@/lib/axios";
import { Service } from "@/types";

export const servicesApi = {
  getAll: async () => {
    const { data } = await axios.get<Service[]>("/services");
    return data;
  },
  getById: async (id: number) => {
    const { data } = await axios.get<Service>(`/services/${id}`);
    return data;
  },
  create: async (service: Omit<Service, "id">) => {
    const { data } = await axios.post<Service>("/services", service);
    return data;
  },
  update: async (id: number, service: Partial<Service>) => {
    const { data } = await axios.put<Service>(`/services/${id}`, service);
    return data;
  },
  delete: async (id: number) => {
    await axios.delete(`/services/${id}`);
  },
};
