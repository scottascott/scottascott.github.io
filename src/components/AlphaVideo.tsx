"use client";

import { useEffect, useRef, useState } from "react";

export default function AlphaVideo({
  webmSrc,
  mp4Src,
  className = "",
}: {
  webmSrc: string;
  mp4Src: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackVideoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [supportsAlpha, setSupportsAlpha] = useState(true);

  useEffect(() => {
    // Must run post-mount, not as a useState lazy initializer: the server
    // render has no `document` to detect codec support with, so the client's
    // first render has to match that same default before correcting it here.
    const probe = document.createElement("video");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupportsAlpha(probe.canPlayType('video/webm; codecs="vp9"') !== "");
  }, []);

  useEffect(() => {
    const el = supportsAlpha ? canvasRef.current : fallbackVideoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [supportsAlpha]);

  useEffect(() => {
    if (!shouldLoad || !supportsAlpha) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    function draw() {
      if (video && canvas && video.videoWidth && video.videoHeight) {
        if (
          canvas.width !== video.videoWidth ||
          canvas.height !== video.videoHeight
        ) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
        ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      rafRef.current = requestAnimationFrame(draw);
    }

    video.play().catch(() => {});
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldLoad, supportsAlpha]);

  if (!supportsAlpha) {
    return (
      <video
        ref={fallbackVideoRef}
        src={shouldLoad ? mp4Src : undefined}
        autoPlay={shouldLoad}
        loop
        muted
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        x5-video-player-type="h5-page"
        x5-video-player-fullscreen="true"
        preload="none"
        className={`video-blend ${className}`}
      />
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        src={shouldLoad ? webmSrc : undefined}
        loop
        muted
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        x5-video-player-type="h5-page"
        x5-video-player-fullscreen="true"
        preload="none"
        className="hidden"
        aria-hidden="true"
      />
      <canvas ref={canvasRef} className={className} aria-hidden="true" />
    </>
  );
}
