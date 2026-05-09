import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pageContentApi } from "@/api/page-content";
import { Service } from "@/types";
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

export const useServices = () => {
  const queryClient = useQueryClient();

  const servicesQuery = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      try {
        const data = await pageContentApi.getAll("Service");
        return data
          .filter(item => item.isActive)
          .map((item, index): Service => {
            let descData: any = { icon_name: "", description: "", details: "" };
            
            try {
              if (typeof item.description === "string" && item.description.startsWith("{")) {
                descData = JSON.parse(item.description);
              } else if (typeof item.description === "object" && item.description !== null) {
                descData = item.description;
              } else {
                descData.description = item.description || "";
              }
            } catch (e) {
              descData.description = item.description || "";
            }

            return {
              id: item.id || index + 1000,
              title: item.title || "",
              icon_name: descData.icon_name || "Activity",
              description: descData.description || "",
              details: descData.details || "",
              order_index: item.displayOrder,
            };
          });
      } catch (error) {
        const data = await pageContentApi.getAllForCustomers("Service");
        return data.map((item): Service => {
          let descData = { icon_name: "", description: "", details: "" };
          try {
            if (item.description?.startsWith("{")) descData = JSON.parse(item.description);
            else descData.description = item.description || "";
          } catch (e) {}

          return {
            id: item.id,
            title: item.title || "",
            icon_name: descData.icon_name || "Activity",
            description: descData.description || "",
            details: descData.details || "",
            order_index: item.displayOrder,
          };
        });
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<Service, "id">) =>
      pageContentApi.addOrUpdate({
        id: 0,
        title: data.title,
        description: JSON.stringify({ icon_name: data.icon_name, description: data.description, details: data.details }),
        category: "Service",
        displayOrder: data.order_index,
        isActive: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service created successfully");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Service> }) =>
      pageContentApi.addOrUpdate({
        id,
        title: data.title,
        description: JSON.stringify({ icon_name: data.icon_name, description: data.description, details: data.details }),
        category: "Service",
        displayOrder: data.order_index || 0,
        isActive: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service updated successfully");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => pageContentApi.delete(id, "Service"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service deleted successfully");
    },
  });

  return {
    servicesQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
