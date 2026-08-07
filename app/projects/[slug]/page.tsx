import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectStatement, projects } from "../data";
import MediaIcon from "../../media-icons";
import { ContactTeaser, SiteFooter, SiteHeader } from "../../site-chrome";
import ProjectMediaGallery from "./media-gallery";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const project = projects.find((item) => item.slug === slug);
  return project ? { title: `${project.title} — Alifway Media`, description: projectStatement[project.category] } : {};
}
export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params; const index = projects.findIndex((item) => item.slug === slug); if (index < 0) notFound();
  const project = projects[index]; const next = projects[(index + 1) % projects.length]; const previous = projects[(index - 1 + projects.length) % projects.length];
  return <>
    <SiteHeader current="projects" />
    <main className="project-detail" id="top">
      <section className="detail-hero"><div className="detail-hero-cover" aria-hidden="true"><img src={project.coverUrl} alt="" /></div><p className="section-kicker" data-motion="fade">Project / {String(index + 1).padStart(2, "0")}</p><h1>{project.title.split(" ").map((word, i) => <span className="word-mask" key={`${word}-${i}`}><span>{word}&nbsp;</span></span>)}</h1><div className="detail-meta" data-motion="rise"><p>{project.category}</p><p>{project.year}</p><p>Alifway Media · UAE</p></div><div className="detail-media-symbol" data-parallax="28" aria-hidden="true"><MediaIcon name="film" /></div></section>
      <section className="detail-film">
        <ProjectMediaGallery playerUrls={project.playerUrls} imageUrls={project.imageUrls} projectTitle={project.title} coverUrl={project.coverUrl} />
        <div className="film-caption"><span>{project.playerUrls.length ? `${project.playerUrls.length} film${project.playerUrls.length === 1 ? "" : "s"}` : `${project.imageUrls.length} photograph${project.imageUrls.length === 1 ? "" : "s"}`}</span><span>Photography · Videography · Production</span></div>
      </section>
      <section className="detail-story" data-motion="rise"><p className="section-kicker">What we do / 02</p><div><h2>{projectStatement[project.category]}</h2><p>We create photography and videography that gives brands a distinct visual presence. From concept and cinematography to editing and social content, every frame is shaped to tell a clear, memorable story.</p><a className="media-text-link" href={project.behanceUrl} target="_blank" rel="noreferrer">Open on Behance <span className="media-nav-symbol" aria-hidden="true"><MediaIcon name="play" /></span></a></div></section>
      <nav className="detail-pager" aria-label="Project navigation"><Link href={`/projects/${previous.slug}`}><span>Previous project</span><strong><i className="media-nav-symbol" aria-hidden="true"><MediaIcon name="previous" /></i>{previous.title}</strong></Link><Link href={`/projects/${next.slug}`}><span>Next project</span><strong>{next.title}<i className="media-nav-symbol" aria-hidden="true"><MediaIcon name="next" /></i></strong></Link></nav>
      <section className="next-project" data-motion="rise"><p className="section-kicker">Continue / {String(((index + 1) % projects.length) + 1).padStart(2, "0")}</p><Link href={`/projects/${next.slug}`}><span className="line-mask"><span>Next project</span></span><strong>{next.title}<i className="media-nav-symbol" aria-hidden="true"><MediaIcon name="next" /></i></strong></Link></section>
      <ContactTeaser label="Your project / Next" />
    </main>
    <SiteFooter />
  </>;
}
