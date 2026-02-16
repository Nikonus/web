export interface CreateVideoDTO {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export interface VideoDTO {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}