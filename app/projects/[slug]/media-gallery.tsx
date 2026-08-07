"use client";

import { useEffect, useRef, useState } from "react";

type VideoCardProps = {
  playerUrl: string;
  projectTitle: string;
  coverUrl: string;
  index: number;
};

function VideoCard({ playerUrl, projectTitle, coverUrl, index }: VideoCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [loadPlayer, setLoadPlayer] = useState(index < 3);

  useEffect(() => {
    if (loadPlayer || !cardRef.current) return;
    if (!("IntersectionObserver" in window)) { setLoadPlayer(true); return; }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setLoadPlayer(true);
        observer.disconnect();
      }
    }, { rootMargin: "500px 0px" });
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [loadPlayer]);

  return <article className="detail-video-card" role="listitem" ref={cardRef}>
    <div className="detail-video-player">
      {loadPlayer ? <iframe
        src={playerUrl}
        title={`${projectTitle} — video ${index + 1}`}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      /> : <div className="detail-video-poster" aria-label={`${projectTitle} film ${index + 1} preview`}>
        <img src={coverUrl} alt="" loading="lazy" />
        <span>Film {String(index + 1).padStart(2, "0")}</span>
      </div>}
    </div>
    <p><span>Film {String(index + 1).padStart(2, "0")}</span><span>Full screen</span></p>
  </article>;
}

export default function ProjectMediaGallery({ playerUrls, imageUrls, projectTitle, coverUrl }: { playerUrls: string[]; imageUrls: string[]; projectTitle: string; coverUrl: string }) {
  return <>
    {playerUrls.length > 0 && <div className="detail-video-grid" role="list" aria-label={`${projectTitle} videos`}>
      {playerUrls.map((playerUrl, index) => <VideoCard key={playerUrl} playerUrl={playerUrl} projectTitle={projectTitle} coverUrl={coverUrl} index={index} />)}
    </div>}
    {imageUrls.length > 0 && <div className="detail-image-grid" role="list" aria-label={`${projectTitle} images`}>
      {imageUrls.map((imageUrl, index) => <figure className="detail-image-card" role="listitem" key={imageUrl}>
        <img src={imageUrl} alt={`${projectTitle} — image ${index + 1}`} loading={index < 3 ? "eager" : "lazy"} decoding="async" />
        <figcaption>Image {String(index + 1).padStart(2, "0")}</figcaption>
      </figure>)}
    </div>}
  </>;
}
