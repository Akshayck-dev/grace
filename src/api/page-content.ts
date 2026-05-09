import axios from "@/lib/axios";

export interface PageContent {
  id: number;
  title: string | null;
  description: string | null;
  image: string | File | null;
  mobileImage: string | File | null;
  category: string;
  displayOrder: number;
  location: string | null;
  createdDate?: string;
  modifiedOn?: string | null;
  isActive: boolean;
}

export const pageContentApi = {
  getAll: async (category?: string) => {
    // Adding optional CategoryName to admin fetch to resolve 400 errors.
    // Some clinical backends require category context even for administrative listings.
    const url = category ? `/User/GetAllPageContent?CategoryName=${category}` : "/User/GetAllPageContent";
    const { data } = await axios.get<PageContent[]>(url);
    return data;
  },
  
  getAllForCustomers: async (category: string) => {
    try {
      console.log(`🔍 Fetching public content for: ${category}`);
      // Sending both formats to ensure the server recognizes the filter
      const { data } = await axios.get<PageContent[]>(`/User/GetAllPageContentForCustomers?CategoryName=${category}&category=${category}`);
      
      // If plural-sensitive, try the fallback
      if (data.length === 0 && (category === "Testimonial" || category === "Gallery")) {
        const fallbackCat = category === "Testimonial" ? "Testimonials" : "Gallery";
        const { data: fallbackData } = await axios.get<PageContent[]>(`/User/GetAllPageContentForCustomers?CategoryName=${fallbackCat}&category=${fallbackCat}`);
        if (fallbackData.length > 0) return fallbackData;
      }

      return data;
    } catch (error: any) {
      console.error(`❌ Public fetch failed for ${category}:`, error.response?.status, error.response?.data);
      return [];
    }
  },

  addOrUpdate: async (content: Partial<PageContent>) => {
    const formData = new FormData();
    console.group("🚀 API: AddOrUpdatePageContent (Response-Match Mode)");
    
    const id = Number(content.id) || 0;
    const isNew = id === 0;
    const now = new Date().toISOString();

    // Exact Response Matching: Using the keys we see in the server's response logs
    formData.append("id", id.toString());
    formData.append("title", content.title || "");
    
    const description = typeof content.description === 'object' 
      ? JSON.stringify(content.description) 
      : (content.description || "");
    formData.append("description", description);
    
    formData.append("category", content.category || "Slider");
    formData.append("displayOrder", (content.displayOrder || 0).toString());
    formData.append("isActive", (content.isActive ?? true).toString());
    formData.append("location", content.location || "");

    if (isNew) {
      formData.append("createdOn", now);
      formData.append("modifiedOn", now);
    }

    // CATEGORY-SPECIFIC LOGIC
    if (content.category === "Slider") {
      // Pixel Placeholder Trick: Create a tiny transparent JPG to satisfy Slider requirements
      const createPlaceholderBlob = () => {
        const pixel = atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');
        const array = new Uint8Array(pixel.length);
        for (let i = 0; i < pixel.length; i++) array[i] = pixel.charCodeAt(i);
        return new Blob([array], { type: 'image/jpeg' });
      };

      // SLIDER MASTER KEYS: The server uses specific names for the hero category
      if (content.image instanceof File) {
        formData.append("slider_web", content.image, "desktop_asset.jpg");
        formData.append("image", content.image, "desktop_asset.jpg");
      } else {
        const placeholder = createPlaceholderBlob();
        formData.append("slider_web", placeholder, "desktop_placeholder.jpg");
        formData.append("image", placeholder, "desktop_placeholder.jpg");
      }

      if (content.mobileImage instanceof File) {
        formData.append("slider_mob", content.mobileImage, "mobile_asset.jpg");
        formData.append("mobileImage", content.mobileImage, "mobile_asset.jpg");
        formData.append("MobileImage", content.mobileImage, "mobile_asset.jpg");
      } else {
        const placeholder = createPlaceholderBlob();
        formData.append("slider_mob", placeholder, "mobile_placeholder.jpg");
        formData.append("mobileImage", placeholder, "mobile_placeholder.jpg");
        formData.append("MobileImage", placeholder, "mobile_placeholder.jpg");
      }
    } else {
      // CLEAN MODE for Gallery, Services, etc.
      if (content.image instanceof File) {
        formData.append("image", content.image, content.image.name);
      }
      // Never send mobile placeholders for non-slider categories
    }

    // Standard Fields (Common to all categories)
    formData.append("Id", id.toString());
    formData.append("id", id.toString());
    formData.append("Title", content.title || "");
    formData.append("title", content.title || "");
    formData.append("Description", content.description || "");
    formData.append("description", content.description || "");
    
    // Add specialized fields for Gallery/Services
    if (content.location) {
      formData.append("location", content.location);
      formData.append("Location", content.location);
    }
    
    formData.append("CategoryName", content.category || "");
    formData.append("category", content.category || "");
    formData.append("DisplayOrder", (content.displayOrder || 0).toString());
    formData.append("displayOrder", (content.displayOrder || 0).toString());
    formData.append("IsActive", (content.isActive ?? true).toString());
    formData.append("isActive", (content.isActive ?? true).toString());

    const { data } = await axios.post("/User/AddOrUpdatePageContent", formData);
    console.log("✅ Server Response:", data);
    return data;
  },

  delete: async (id: number, category?: string) => {
    // Passing lowercase 'id' as requested and as seen in the server's JSON structure.
    // The server uses this ID to set isActive = false (Soft Delete).
    await axios.post(`/User/DeletePageContent?id=${id}`, {
      id: id,
      CategoryName: category
    });
  },
};
