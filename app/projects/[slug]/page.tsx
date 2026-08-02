import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectStatement, projects } from "../data";
import MediaIcon, { type MediaIconName } from "../../media-icons";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const project = projects.find((item) => item.slug === slug);
  return project ? { title: `${project.title} — Alifway Media`, description: projectStatement[project.category] } : {};
}
export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params; const index = projects.findIndex((item) => item.slug === slug); if (index < 0) notFound();
  const project = projects[index]; const next = projects[(index + 1) % projects.length]; const previous = projects[(index - 1 + projects.length) % projects.length];
  const categoryIcons: Record<typeof project.category, MediaIconName> = { Food: "camera", Automotive: "film", "Fashion & Beauty": "camera", Branding: "clapper", Events: "mic", "Social Films": "play" };
  return <>
    <header className="site-nav projects-nav" aria-label="Primary navigation"><Link className="brand-link" href="/" aria-label="Alifway Media home"><img src="/assets/Alifway Media - Logo new (3).png" alt="Alifway Media" width="2185" height="405" /></Link><div className="nav-links"><Link href="/projects">All Projects</Link><Link className="nav-work" href="/">Home <span aria-hidden="true">↖</span></Link></div></header>
    <main className="project-detail" id="top">
      <section className="detail-hero"><p className="section-kicker" data-motion="fade">Project / {String(index + 1).padStart(2, "0")}</p><h1>{project.title.split(" ").map((word, i) => <span className="word-mask" key={`${word}-${i}`}><span>{word}&nbsp;</span></span>)}</h1><div className="detail-meta" data-motion="rise"><p>{project.category}</p><p>{project.year}</p><p>Alifway Media · UAE</p></div><div className="detail-media-symbol" data-parallax="28" aria-hidden="true"><MediaIcon name={categoryIcons[project.category]} /></div></section>
      <section className="detail-film" data-motion="clip"><div className="detail-film-frame"><iframe src={`https://drive.google.com/file/d/${project.id}/preview`} title={`${project.title} — Alifway Media`} allow="autoplay; fullscreen" allowFullScreen /></div><div className="film-caption"><span>Play in frame</span><span>Full screen enabled</span></div></section>
      <section className="detail-story" data-motion="rise"><p className="section-kicker">The direction / 02</p><div><h2>{projectStatement[project.category]}</h2><p>This film belongs to Alifway Media’s ongoing archive of moving images—made to hold attention, communicate feeling and give every frame a clear purpose.</p><a href={`https://drive.google.com/file/d/${project.id}/view`} target="_blank" rel="noreferrer">Open original film ↗</a></div></section>
      <nav className="detail-pager" aria-label="Project navigation"><Link href={`/projects/${previous.slug}`}><span>Previous</span><strong>← {previous.title}</strong></Link><Link href={`/projects/${next.slug}`}><span>Next project</span><strong>{next.title} →</strong></Link></nav>
      <section className="next-project" data-motion="rise"><p className="section-kicker">Continue / {String(((index + 1) % projects.length) + 1).padStart(2, "0")}</p><Link href={`/projects/${next.slug}`}><span className="line-mask"><span>Next project</span></span><strong>{next.title}<i>↗</i></strong></Link></section>
    </main>
    <footer className="site-footer projects-footer"><img src="/assets/alifway_media_dark_purple_monogram_transparent.png" alt="" /><p>Alifway Media © 2026</p><Link href="/projects">All projects ↑</Link></footer>
  </>;
}
