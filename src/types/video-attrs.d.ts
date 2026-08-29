import "react";

declare module "react" {
  interface VideoHTMLAttributes<T> extends HTMLAttributes<T> {
    "webkit-playsinline"?: string;
    "x5-playsinline"?: string;
    "x5-video-player-type"?: string;
    "x5-video-player-fullscreen"?: string;
  }
}
