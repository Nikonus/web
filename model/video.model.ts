import mongoose, { Schema, model, models } from "mongoose";

export const Video_dimensions = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;

  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  aiDescription?: string;
tags?: string[];

  // ⭐ Added analytics field
  views: number;

  createdAt?: Date;
  updatedAt?: Date;

  

  controls?: {
    play: boolean;
    pause: boolean;
    stop: boolean;
    seek: boolean;
    volume: boolean;
  };

  transformations?: {
    crop?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    resize?: {
      width: number;
      height: number;
    };
    rotate?: number;
  };

  
}

const videoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },

    // ⭐ Important for analytics
    views: {
      type: Number,
      default: 0,
    },

    controls: {
      play: { type: Boolean, default: true },
      pause: { type: Boolean, default: true },
      stop: { type: Boolean, default: true },
      seek: { type: Boolean, default: true },
      volume: { type: Boolean, default: true },
    },
    aiDescription: {
  type: String,
},

tags: [
  {
    type: String,
  },
],

    transformations: {
      crop: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        width: { type: Number, default: Video_dimensions.width },
        height: { type: Number, default: Video_dimensions.height },
      },
      resize: {
        width: { type: Number, default: Video_dimensions.width },
        height: { type: Number, default: Video_dimensions.height },
      },
      rotate: { type: Number, default: 0 },
    },
  },
  
  { timestamps: true }
);

const Video =
  models.Video || model<IVideo>("Video", videoSchema);

export default Video;