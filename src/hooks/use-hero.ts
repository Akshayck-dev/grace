import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pageContentApi } from "@/api/page-content";
import { HeroSlide } from "@/types";
import { toast } from "sonner";
import { BASE_URL } from "@/api/config";

const getFullImageUrl = (path: string | null) => {
  if (!path || typeof path !== "string" || path === "/uploads/") return null;
  
  let url = path.trim();
  if (!url.startsWith("http")) {
    url = `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  }
  
  const rawToken = localStorage.getItem("auth_token");
  if (rawToken) {
    // Clean token from any quotes
    const token = rawToken.replace(/["']/g, "").trim();
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}token=${token}`;
  }
  
  return url;
};

export const useHero = () => {
  const queryClient = useQueryClient();

  const heroQuery = useQuery({
    queryKey: ["hero"],
    queryFn: async () => {
      try {
        const data = await pageContentApi.getAll("Slider");
        return data
          .filter(item => item.isActive)
          .map((item): HeroSlide => {
            console.log("🔍 Raw Slider Item:", item);
            // Check multiple possible keys for mobile image from the server
            const mobilePath = item.mobileImage || (item as any).slider_mob || (item as any).mobile_image || (item as any).slider_mobile;
            const desktopPath = item.image || (item as any).slider_web;

            let titleData: any = { eyebrow: "", title1: "", title2: "" };
            let descData: any = { description: "", cta: "", accent_to: "" };
            
            try {
              if (typeof item.title === "string" && item.title.startsWith("{")) {
                titleData = JSON.parse(item.title);
              } else if (typeof item.title === "object" && item.title !== null) {
                titleData = item.title;
              } else {
                titleData.title1 = item.title || "";
              }
            } catch (e) {
              titleData.title1 = item.title || "";
            }

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
              id: item.id,
              eyebrow: titleData.eyebrow || "",
              title1: titleData.title1 || "",
              title2: titleData.title2 || "",
              description: descData.description || "",
              cta: descData.cta || "",
              accent_to: descData.accent_to || "",
              image_url: getFullImageUrl(desktopPath as string),
              mobile_image_url: getFullImageUrl(mobilePath as string),
              order_index: item.displayOrder,
            };
          });
      } catch (error) {
        // Fallback to Public API if Admin API is currently unavailable/failing
        const data = await pageContentApi.getAllForCustomers("Slider");
        return data.map((item): HeroSlide => {
          let titleData = { eyebrow: "", title1: "", title2: "" };
          let descData = { description: "", cta: "", accent_to: "" };
          
          try {
            if (item.title?.startsWith("{")) titleData = JSON.parse(item.title);
            else titleData.title1 = item.title || "";
          } catch (e) {}

          try {
            if (item.description?.startsWith("{")) descData = JSON.parse(item.description);
            else descData.description = item.description || "";
          } catch (e) {}

          return {
            id: item.id,
            eyebrow: titleData.eyebrow,
            title1: titleData.title1,
            title2: titleData.title2,
            description: descData.description,
            cta: descData.cta,
            accent_to: descData.accent_to,
            image_url: getFullImageUrl(item.image as string),
            mobile_image_url: getFullImageUrl(item.mobileImage as string),
            order_index: item.displayOrder,
          };
        });
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<HeroSlide, "id" | "image_url" | "mobile_image_url"> & { image: File; mobileImage: File }) =>
      pageContentApi.addOrUpdate({
        id: 0,
        title: JSON.stringify({ eyebrow: data.eyebrow, title1: data.title1, title2: data.title2 }),
        description: JSON.stringify({ description: data.description, cta: data.cta, accent_to: data.accent_to }),
        image: data.image,
        mobileImage: data.mobileImage,
        category: "Slider",
        displayOrder: data.order_index,
        isActive: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero"] });
      toast.success("Hero slide added");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<HeroSlide> & { image?: File; mobileImage?: File } }) =>
      pageContentApi.addOrUpdate({
        id,
        title: JSON.stringify({ eyebrow: data.eyebrow, title1: data.title1, title2: data.title2 }),
        description: JSON.stringify({ description: data.description, cta: data.cta, accent_to: data.accent_to }),
        image: data.image || null,
        mobileImage: data.mobileImage || null,
        category: "Slider",
        displayOrder: data.order_index || 0,
        isActive: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero"] });
      toast.success("Hero slide updated");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => pageContentApi.delete(id, "Slider"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero"] });
      toast.success("Hero slide deleted");
    },
  });

  return {
    heroQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
