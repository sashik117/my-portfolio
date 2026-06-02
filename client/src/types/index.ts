export type Project = {
  _id: string;
  title: string;
  slug?: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  imageStorageProvider?: "local" | "cloudinary";
  imageStorageKey?: string;
  category?: string;
  featured?: boolean;
  sortOrder?: number;
  status?: "draft" | "published";
  createdAt?: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type Message = ContactPayload & {
  _id: string;
  status: "new" | "read";
  createdAt: string;
};
