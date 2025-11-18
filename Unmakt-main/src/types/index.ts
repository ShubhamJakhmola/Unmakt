export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
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
