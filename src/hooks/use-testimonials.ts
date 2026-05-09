import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pageContentApi } from "@/api/page-content";
import { Testimonial } from "@/types";
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

export const useTestimonials = () => {
  const queryClient = useQueryClient();

  const testimonialsQuery = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      try {
        const data = await pageContentApi.getAll("Testimonials");
        return data
          .filter(item => item.isActive)
          .map((item, index): Testimonial => {
            let descData: any = { role: "", rating: 5, quote: "" };
            
            try {
              if (typeof item.description === "string" && item.description.startsWith("{")) {
                descData = JSON.parse(item.description);
              } else if (typeof item.description === "object" && item.description !== null) {
                descData = item.description;
              } else {
                descData.quote = item.description || "";
              }
            } catch (e) {
              descData.quote = item.description || "";
            }

            return {
              id: item.id || index + 3000,
              name: item.title || "",
              role: descData.role || "",
              quote: descData.quote || "",
              rating: descData.rating || 5,
              avatar_url: getFullImageUrl(item.image as string) || "",
              order_index: item.displayOrder,
            };
          });
      } catch (error) {
        const data = await pageContentApi.getAllForCustomers("Testimonials");
        return data.map((item): Testimonial => {
          let descData = { role: "", rating: 5, quote: "" };
          try {
            if (item.description?.startsWith("{")) descData = JSON.parse(item.description);
            else descData.quote = item.description || "";
          } catch (e) {}

          return {
            id: item.id,
            name: item.title || "",
            role: descData.role || "",
            rating: descData.rating || 5,
            quote: descData.quote || "",
            avatar_url: getFullImageUrl(item.image as string) || "",
            order_index: item.displayOrder,
          };
        });
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<Testimonial, "id" | "avatar_url"> & { image: File }) =>
      pageContentApi.addOrUpdate({
        id: 0,
        title: data.name,
        description: JSON.stringify({ role: data.role, rating: data.rating, quote: data.quote }),
        image: data.image,
        category: "Testimonials",
        displayOrder: data.order_index,
        isActive: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial added");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Testimonial> & { image?: File } }) =>
      pageContentApi.addOrUpdate({
        id,
        title: data.name,
        description: JSON.stringify({ role: data.role, rating: data.rating, quote: data.quote }),
        image: data.image || null,
        category: "Testimonials",
        displayOrder: data.order_index || 0,
        isActive: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial updated");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => pageContentApi.delete(id, "Testimonials"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial deleted");
    },
  });

  return {
    testimonialsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
