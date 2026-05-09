export interface HeroSlide {
  id: number;
  eyebrow: string;
  title1: string;
  title2: string;
  description: string;
  cta: string;
  accent_to: string;
  image_url: string;
  mobile_image_url: string;
  order_index: number;
}

export interface Service {
  id: number;
  icon_name: string;
  title: string;
  description: string;
  details: string;
  order_index: number;
}

export interface GalleryItem {
  id: number;
  image_url: string;
  title: string;
  tag: string;
  order_index: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar_url: string;
  rating: number;
  quote: string;
  order_index: number;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
