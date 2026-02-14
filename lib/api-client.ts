import axios, { AxiosInstance, AxiosError } from "axios";
import { IVideo } from "@/model/video.model";

export type VideoFormData = Omit<IVideo, "_id">;

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "/api",
      withCredentials: true, // required for cookies / NextAuth
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Optional: Response interceptor for centralized error handling
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

  async getVideos(): Promise<IVideo[]> {
    const { data } = await this.axiosInstance.get<IVideo[]>("/videos");
    return data;
  }

  async createVideo(videoData: VideoFormData): Promise<IVideo> {
    const { data } = await this.axiosInstance.post<IVideo>(
      "/videos",
      videoData
    );
    return data;
  }
}

export const apiClient = new ApiClient();