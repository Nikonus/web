import axios, { AxiosInstance, AxiosError } from "axios";
import { VideoDTO, CreateVideoDTO } from "@/types/video";

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "/api",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const message =
          error.response?.data &&
          typeof error.response.data === "object" &&
          "message" in error.response.data
            ? (error.response.data as any).message
            : error.message;

        return Promise.reject(new Error(message));
      }
    );
  }

  async getVideos(): Promise<VideoDTO[]> {
    const { data } = await this.axiosInstance.get<VideoDTO[]>("/video");
    return data;
  }
  async deleteVideo(id: string): Promise<void> {
  await this.axiosInstance.delete(`/video/${id}`);
}

  async createVideo(videoData: CreateVideoDTO): Promise<VideoDTO> {
    const { data } = await this.axiosInstance.post<VideoDTO>(
      "/video",
      videoData
    );
    return data;
  }
}


export const apiClient = new ApiClient();