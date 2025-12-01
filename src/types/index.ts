export interface Service {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  expertise: string[];
}

export interface CommunityApplication {
  name: string;
  email: string;
  skills: string;
  experience: string;
  portfolio?: string;
  message: string;
}
