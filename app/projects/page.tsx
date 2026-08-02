"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useRef, useState } from "react";
import { categories, projectStatement, projects, type Category } from "./data";
import MediaIcon from "../media-icons";

export default function ProjectsPage() {
  const [active, setActive] = useState<Category | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filtered = useMemo(() => active ? projects.filter((project) => project.category === active) : [], [active]);
  const select = (category: Category) => {
    if (category === active) return;
    setIsFiltering(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setActive(category);
      requestAnimationFrame(() => {
        setIsFiltering(false);
        requestAnimationFrame(() => document.getElementById("category-films")?.scrollIntoView({ behavior: "smooth", block: "start" }));
      });
    }, 180);
  };

  return <>
    <header className="site-nav projects-nav" aria-label="Primary navigation">
      <Link className="brand-link" href="/" aria-label="Alifway Media home"><img src="/assets/Alifway Media - Logo new (3).png" alt="Alifway Media" width="2185" height="405" /></Link>
      <div className="nav-links"><Link className="is-current" href="/projects">Projects</Link><Link className="nav-work" href="/">Home <span aria-hidden="true">↖</span></Link></div>
    </header>
    <main className="projects-page" id="top">
      <section className="projects-hero">
        <div className="hero-media-cluster" data-parallax="34" aria-hidden="true">
          <span className="hero-media-main"><MediaIcon name="camera" /></span>
          <span className="hero-media-float hero-media-film"><MediaIcon name="film" /></span>
          <span className="hero-media-float hero-media-edit"><MediaIcon name="edit" /></span>
          <span className="hero-media-float hero-media-play"><MediaIcon name="play" /></span>
        </div>
        <p className="section-kicker projects-kicker" data-motion="fade">Projects / 01—26</p>
        <h1 aria-label="Stories built to move"><span className="line-mask"><span>Stories built</span></span><span className="line-mask"><span>to move.</span></span></h1>
        <div className="projects-intro" data-motion="rise"><p>A living archive of food, automotive, fashion, branding, events and social-first films.</p><span>Alifway Media · UAE</span></div>
        <div className="hero-scroll-label" aria-hidden="true"><i /> Explore the archive</div>
      </section>
      <section className="category-chooser" aria-labelledby="category-heading">
        <div className="category-heading" data-motion="rise">
          <p className="section-kicker">Choose a category / 02</p>
          <h2 id="category-heading">Explore by<br />discipline.</h2>
          <p>Each collection opens only the films related to that category.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => {
            const categoryProjects = projects.filter((project) => project.category === category);
            const representative = categoryProjects[0];
            return <button
              key={category}
              type="button"
              className={`category-card${active === category ? " is-active" : ""}`}
              data-category={category}
              data-motion="project"
              style={{ "--motion-order": index % 3 } as CSSProperties}
              onClick={() => select(category)}
              aria-pressed={active === category}
              aria-controls="category-films"
            >
              <span className="category-card-media" aria-hidden="true">
                <img src={`https://drive.google.com/thumbnail?id=${representative.id}&sz=w1600`} alt="" loading="lazy" referrerPolicy="no-referrer" onError={(event) => { event.currentTarget.style.display = "none"; }} />
              </span>
              <span className="category-card-shade" aria-hidden="true" />
              <span className="category-card-index">0{index + 1}</span>
              <span className="category-card-copy"><strong>{category}</strong><small>{projectStatement[category]}</small></span>
              <span className="category-card-count">{categoryProjects.length} films <i aria-hidden="true">↘</i></span>
            </button>;
          })}
        </div>
      </section>

      <section id="category-films" className={`category-films${active ? " has-selection" : ""}`} aria-live="polite">
        {active ? <>
          <div className="archive-status"><p><strong>{active}</strong> / {filtered.length} films</p><button type="button" onClick={() => setActive(null)}>Choose another category ↑</button></div>
          <div className={`video-index${isFiltering ? " is-filtering" : ""}`} aria-label={`${active} projects`}>
            {filtered.map((project, index) => <article className="video-project" key={project.id} id={project.slug} data-motion="project" style={{ "--motion-order": index % 3 } as CSSProperties}>
              <div className="video-frame" data-parallax="8">
                <iframe src={`https://drive.google.com/file/d/${project.id}/preview`} title={`${project.title} — Alifway Media`} allow="autoplay; fullscreen" allowFullScreen loading="lazy" />
                <Link className="frame-project-link" href={`/projects/${project.slug}`} aria-label={`Enter ${project.title} project page`}><span>Open project</span><i>↗</i></Link>
                <span className="frame-corner frame-corner-a" aria-hidden="true" /><span className="frame-corner frame-corner-b" aria-hidden="true" />
              </div>
              <div className="video-meta"><span>{String(index + 1).padStart(2, "0")}</span><h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2><p>{project.year} · {project.category}</p><Link href={`/projects/${project.slug}`} aria-label={`View ${project.title} project page`}>Enter ↗</Link></div>
              <p className="source-name">{project.filename}</p>
            </article>)}
          </div>
        </> : <div className="category-empty-state"><span>Collections / 06</span><p>Choose a category above to view its films.</p></div>}
      </section>
      <section className="projects-outro" data-motion="rise"><p className="section-kicker">More work / 27+</p><a href="https://www.behance.net/alifwaymedia" target="_blank" rel="noreferrer"><span className="line-mask"><span>Explore the</span></span><span className="line-mask"><span>Archive <i>↗</i></span></span></a></section>
    </main>
    <footer className="site-footer projects-footer"><img src="/assets/alifway_media_dark_purple_monogram_transparent.png" alt="" /><p>Alifway Media © 2026</p><a href="#top">Back to top ↑</a></footer>
  </>;
}
