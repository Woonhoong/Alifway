import Link from "next/link";
import type { CSSProperties } from "react";
import { projects } from "./data";
import MediaIcon from "../media-icons";
import { ContactTeaser, SiteFooter, SiteHeader } from "../site-chrome";

export default function ProjectsPage() {
  return <>
    <SiteHeader current="projects" />
    <main className="projects-page" id="top">
      <section className="projects-hero">
        <div className="hero-media-cluster" data-parallax="34" aria-hidden="true">
          <span className="hero-media-main"><MediaIcon name="camera" /></span>
          <span className="hero-media-float hero-media-film"><MediaIcon name="film" /></span>
          <span className="hero-media-float hero-media-edit"><MediaIcon name="edit" /></span>
          <span className="hero-media-float hero-media-play"><MediaIcon name="play" /></span>
        </div>
        <p className="section-kicker projects-kicker" data-motion="fade">Projects / 01—12</p>
        <h1 aria-label="Stories built to move"><span className="line-mask"><span>Stories built</span></span><span className="line-mask"><span>to move.</span></span></h1>
        <div className="projects-intro" data-motion="rise"><p>Photography, films and brand content created for restaurants, beauty, businesses, events and people.</p><span>Alifway Media · UAE</span></div>
        <div className="hero-scroll-label" aria-hidden="true"><i /> Explore our work</div>
      </section>

      <section id="projects-archive" className="behance-archive" aria-label="Alifway Media projects">
        <div className="archive-status"><p><strong>Selected work</strong> / {projects.length} projects</p><a href="https://www.behance.net/alifwaymedia" target="_blank" rel="noreferrer">More work <span className="media-nav-symbol" aria-hidden="true"><MediaIcon name="film" /></span></a></div>
        <div className="behance-project-grid" role="list">
          {projects.map((project, index) => <article className="behance-project-card" role="listitem" key={project.behanceId} id={project.slug} data-motion="project" style={{ "--motion-order": index % 3 } as CSSProperties}>
            <Link className="behance-project-cover" href={`/projects/${project.slug}`} aria-label={`Open ${project.title}`}>
              <img src={project.coverUrl} alt={`${project.title} project cover`} loading="lazy" />
              <span className="behance-project-count">{project.playerUrls.length ? `${project.playerUrls.length} film${project.playerUrls.length === 1 ? "" : "s"}` : `${project.imageUrls.length} photograph${project.imageUrls.length === 1 ? "" : "s"}`}</span>
              <i className="behance-project-play" aria-hidden="true"><MediaIcon name="play" /></i>
            </Link>
            <div className="behance-project-meta">
              <h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2>
              <p>Alifway Media · {project.year}</p>
            </div>
          </article>)}
        </div>
      </section>

      <ContactTeaser label="Ready to create / 02" />
    </main>
    <SiteFooter />
  </>;
}
