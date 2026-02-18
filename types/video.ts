export interface CreateVideoDTO {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  tags?: string[];
}

export interface VideoDTO {
  _id: string;
  title: string;
  tags?: string[];
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}