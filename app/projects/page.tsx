"use client";

import { useMemo, useState } from "react";

type Category = "Food" | "Automotive" | "Fashion & Beauty" | "Branding" | "Events" | "Social Films";

type Project = {
  title: string;
  filename: string;
  id: string;
  year: string;
  category: Category;
};

const projects: Project[] = [
  { title: "Salon Film", filename: "SALON VIDEO-copy.MOV", id: "1eWjypGUZzW0wrG8np8kxxyVic5_FyEc1", year: "2026", category: "Fashion & Beauty" },
  { title: "Salon Reel", filename: "SALON REEL.MOV", id: "1s3ASKGIOaXBl4JFOF5sYgiXBeqDhauj-", year: "2026", category: "Fashion & Beauty" },
  { title: "Portrait Study", filename: "E7F68031-A12E-42EB-9563-CF9C11DCD387.MOV", id: "1p9IUgJKRNskz670brSbsEY8cXak_50K4", year: "2026", category: "Fashion & Beauty" },
  { title: "June / 23", filename: "0623.MP4", id: "1ziUOGE93xBfzRxcj8ynM2HPU_XnMbFyi", year: "2026", category: "Social Films" },
  { title: "June / 17", filename: "0617.MP4", id: "1TcmZs-76S1sl2OdDL8x9HUFbQnnz2d16", year: "2026", category: "Automotive" },
  { title: "June / 11", filename: "0611-copy(3).mp4", id: "10Iv9ZXhZ1UYPnrnsnpY22g6TrRIEVQgN", year: "2026", category: "Food" },
  { title: "May / 28 — Cut II", filename: "0528 (2)-copy-copy.MP4", id: "1mVPgO7MDzzLrfn9ma3Jyjz6f4-HeY4iA", year: "2026", category: "Branding" },
  { title: "DJ Poli", filename: "dj poli.MP4", id: "1WFr64g9YJQLcs9ML_lksHq_1MUf-VPcA", year: "2026", category: "Events" },
  { title: "May / 28", filename: "0528.MP4", id: "1FF7JXnIkJe_vG1bA7w2wSHvvilLK7Jqu", year: "2026", category: "Branding" },
  { title: "May / 21", filename: "0521-copy-copy-copy(1).mp4", id: "1I0tzka047wj4K5hlBha9rQ8CVWVQfCJA", year: "2026", category: "Automotive" },
  { title: "May / 24", filename: "0524.MP4", id: "1oRzSOZPdiA8TirV4pjzdyuF2MJKmWgGH", year: "2026", category: "Food" },
  { title: "Thaachi", filename: "Thaachi.mp4", id: "1aHuqEIeXxWqefo2ndCSkyi-OSLWgewRV", year: "2026", category: "Food" },
  { title: "May / 01", filename: "0501 (3)(2).MP4", id: "1SoXO0NhTbSls9dajrqdoWlUa0kzBuosp", year: "2026", category: "Social Films" },
  { title: "April / 11", filename: "0411(2).mp4", id: "1pM_t4iFed_7aP387sOmzU4wzcwis-8vh", year: "2026", category: "Automotive" },
  { title: "December / 30", filename: "1230(1) 2.MP4", id: "1NVjqmtzN1pGPU6GthASekX-iCNVwBcWR", year: "2025", category: "Events" },
  { title: "AW", filename: "aw.mov", id: "1G4nYwNul9deCK0I8iiKrzDZLuPcEYuNy", year: "2025", category: "Branding" },
  { title: "December / 26", filename: "1226.mov", id: "1lP8-q1NqPRUYXz4hy-B3Wx1QN_hjxbpL", year: "2025", category: "Events" },
  { title: "Hanan Karama", filename: "HANAN KARAMA.mov", id: "16AsIR07xXgyq04z4ofwDa0cwG9vLELRv", year: "2025", category: "Fashion & Beauty" },
  { title: "Hanan Shaah", filename: "HANAN SHAAH(1).mov", id: "1G7oHH6dgLBECUGUdiTy2FpCQJR6fUmLi", year: "2025", category: "Fashion & Beauty" },
  { title: "Hanan / Cut IV", filename: "HANAN(4).mov", id: "1Vo3jFD6GNYY0LDOV3RX_XsqTFEWbXvNB", year: "2025", category: "Fashion & Beauty" },
  { title: "Hanan", filename: "HANAN.mov", id: "1oqyVPh-2eNf0ufiilDcvhzOSLUBMMFiz", year: "2025", category: "Fashion & Beauty" },
  { title: "October / 14", filename: "1014.MOV", id: "1mYn_gyx0C5RIuwFt0DNU0j__TMStrpmx", year: "2025", category: "Events" },
  { title: "Story", filename: "Story .MP4", id: "1K9vZERz-6YbCNIeOfbl64Jb_3UtdrKqm", year: "2025", category: "Branding" },
  { title: "September / 19", filename: "0919 (1).MP4", id: "1fKQ7wXhRKa2y7uG2tbAE5TDPpdmVJNu6", year: "2025", category: "Social Films" },
  { title: "Fafa", filename: "fafa copy.MOV", id: "11MKHLGelMo0np2cwIoXQ5-85HWiLk7JG", year: "2025", category: "Fashion & Beauty" },
  { title: "August / 04", filename: "0804(1).MOV", id: "1ZN9mq3Z5Gumy0dzk0g_cQtAZn4WK8QRe", year: "2025", category: "Social Films" },
];

const categories = ["All Work", "Food", "Automotive", "Fashion & Beauty", "Branding", "Events", "Social Films"] as const;

export default function ProjectsPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("All Work");
  const visibleCategories = useMemo(
    () => categories.filter(
      (category) => category === "All Work" || projects.some((project) => project.category === category),
    ),
    [],
  );
  const filtered = useMemo(() => active === "All Work" ? projects : projects.filter((project) => project.category === active), [active]);

  return (
    <>
      <header className="site-nav projects-nav" aria-label="Primary navigation">
        <a className="brand-link" href="/" aria-label="Alifway Media home"><img src="/assets/Alifway Media - Logo new (3).png" alt="Alifway Media" width="2185" height="405" /></a>
        <div className="nav-links"><a className="is-current" href="/projects">Projects</a><a className="nav-work" href="/">Home <span aria-hidden="true">↖</span></a></div>
      </header>
      <main className="projects-page" id="top">
        <section className="projects-hero">
          <p className="section-kicker">Projects / 01—26</p>
          <h1>Stories built<br />to move.</h1>
          <div className="projects-intro"><p>A living archive of food, automotive, fashion, branding, events and social-first films.</p><span>Alifway Media · UAE</span></div>
        </section>

        <nav className="project-filters" aria-label="Filter projects by category">
          <a href="/">Home</a>
          {visibleCategories.map((category) => (
            <button key={category} type="button" className={active === category ? "is-active" : ""} onClick={() => setActive(category)} aria-pressed={active === category}>
              {category}<span>{category === "All Work" ? projects.length : projects.filter((project) => project.category === category).length}</span>
            </button>
          ))}
        </nav>

        <div className="archive-status"><p><strong>{active}</strong> / {filtered.length} films</p><p>Original videos are hosted on Google Drive.</p></div>

        <section className="video-index" aria-label={`${active} projects`}>
          {filtered.map((project, index) => (
            <article className="video-project" key={project.id}>
              <div className="video-frame"><iframe src={`https://drive.google.com/file/d/${project.id}/preview`} title={`${project.title} — Alifway Media`} allow="autoplay; fullscreen" allowFullScreen loading="lazy" /></div>
              <div className="video-meta"><span>{String(index + 1).padStart(2, "0")}</span><h2>{project.title}</h2><p>{project.year} · {project.category}</p><a href={`https://drive.google.com/file/d/${project.id}/view`} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} in Google Drive`}>View ↗</a></div>
              <p className="source-name">{project.filename}</p>
            </article>
          ))}
        </section>
        <section className="projects-outro"><p className="section-kicker">More work / 27+</p><a href="https://www.behance.net/alifwaymedia" target="_blank" rel="noreferrer">Explore the<br />Archive <span>↗</span></a></section>
      </main>
      <footer className="site-footer projects-footer"><img src="/assets/alifway_media_dark_purple_monogram_transparent.png" alt="" /><p>Alifway Media © 2026</p><a href="#top">Back to top ↑</a></footer>
    </>
  );
}
