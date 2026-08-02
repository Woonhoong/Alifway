const projects = [
  ["Salon Film", "SALON VIDEO-copy.MOV", "1eWjypGUZzW0wrG8np8kxxyVic5_FyEc1", "2026"],
  ["Salon Reel", "SALON REEL.MOV", "1s3ASKGIOaXBl4JFOF5sYgiXBeqDhauj-", "2026"],
  ["Portrait Study", "E7F68031-A12E-42EB-9563-CF9C11DCD387.MOV", "1p9IUgJKRNskz670brSbsEY8cXak_50K4", "2026"],
  ["June / 23", "0623.MP4", "1ziUOGE93xBfzRxcj8ynM2HPU_XnMbFyi", "2026"],
  ["June / 17", "0617.MP4", "1TcmZs-76S1sl2OdDL8x9HUFbQnnz2d16", "2026"],
  ["June / 11", "0611-copy(3).mp4", "10Iv9ZXhZ1UYPnrnsnpY22g6TrRIEVQgN", "2026"],
  ["May / 28 — Cut II", "0528 (2)-copy-copy.MP4", "1mVPgO7MDzzLrfn9ma3Jyjz6f4-HeY4iA", "2026"],
  ["DJ Poli", "dj poli.MP4", "1WFr64g9YJQLcs9ML_lksHq_1MUf-VPcA", "2026"],
  ["May / 28", "0528.MP4", "1FF7JXnIkJe_vG1bA7w2wSHvvilLK7Jqu", "2026"],
  ["May / 21", "0521-copy-copy-copy(1).mp4", "1I0tzka047wj4K5hlBha9rQ8CVWVQfCJA", "2026"],
  ["May / 24", "0524.MP4", "1oRzSOZPdiA8TirV4pjzdyuF2MJKmWgGH", "2026"],
  ["Thaachi", "Thaachi.mp4", "1aHuqEIeXxWqefo2ndCSkyi-OSLWgewRV", "2026"],
  ["May / 01", "0501 (3)(2).MP4", "1SoXO0NhTbSls9dajrqdoWlUa0kzBuosp", "2026"],
  ["April / 11", "0411(2).mp4", "1pM_t4iFed_7aP387sOmzU4wzcwis-8vh", "2026"],
  ["December / 30", "1230(1) 2.MP4", "1NVjqmtzN1pGPU6GthASekX-iCNVwBcWR", "2025"],
  ["AW", "aw.mov", "1G4nYwNul9deCK0I8iiKrzDZLuPcEYuNy", "2025"],
  ["December / 26", "1226.mov", "1lP8-q1NqPRUYXz4hy-B3Wx1QN_hjxbpL", "2025"],
  ["Hanan Karama", "HANAN KARAMA.mov", "16AsIR07xXgyq04z4ofwDa0cwG9vLELRv", "2025"],
  ["Hanan Shaah", "HANAN SHAAH(1).mov", "1G7oHH6dgLBECUGUdiTy2FpCQJR6fUmLi", "2025"],
  ["Hanan / Cut IV", "HANAN(4).mov", "1Vo3jFD6GNYY0LDOV3RX_XsqTFEWbXvNB", "2025"],
  ["Hanan", "HANAN.mov", "1oqyVPh-2eNf0ufiilDcvhzOSLUBMMFiz", "2025"],
  ["October / 14", "1014.MOV", "1mYn_gyx0C5RIuwFt0DNU0j__TMStrpmx", "2025"],
  ["Story", "Story .MP4", "1K9vZERz-6YbCNIeOfbl64Jb_3UtdrKqm", "2025"],
  ["September / 19", "0919 (1).MP4", "1fKQ7wXhRKa2y7uG2tbAE5TDPpdmVJNu6", "2025"],
  ["Fafa", "fafa copy.MOV", "11MKHLGelMo0np2cwIoXQ5-85HWiLk7JG", "2025"],
  ["August / 04", "0804(1).MOV", "1ZN9mq3Z5Gumy0dzk0g_cQtAZn4WK8QRe", "2025"],
] as const;

export default function ProjectsPage() {
  return (
    <>
      <header className="site-nav projects-nav" aria-label="Primary navigation">
        <a className="brand-link" href="/" aria-label="Alifway Media home">
          <img src="/assets/alifway-media-header-clear.png" alt="Alifway Media" width="2185" height="405" />
        </a>
        <div className="nav-links"><a className="is-current" href="/projects">Projects</a><a className="nav-work" href="/">Home <span aria-hidden="true">↖</span></a></div>
      </header>
      <main className="projects-page" id="top">
        <section className="projects-hero">
          <p className="section-kicker">Projects / 01—26</p>
          <h1>Stories built<br />to move.</h1>
          <div className="projects-intro"><p>A living archive of films, campaigns, portraits and social-first motion.</p><span>Alifway Media · UAE</span></div>
        </section>
        <section className="video-index" aria-label="Alifway Media video projects">
          {projects.map(([title, filename, id, year], index) => (
            <article className="video-project" key={id}>
              <div className="video-frame">
                <iframe src={`https://drive.google.com/file/d/${id}/preview`} title={`${title} — Alifway Media`} allow="autoplay; fullscreen" allowFullScreen loading="lazy" />
              </div>
              <div className="video-meta">
                <span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{year} · Film</p>
                <a href={`https://drive.google.com/file/d/${id}/view`} target="_blank" rel="noreferrer" aria-label={`Open ${title} in Google Drive`}>View ↗</a>
              </div>
              <p className="source-name">{filename}</p>
            </article>
          ))}
        </section>
        <section className="projects-outro"><p className="section-kicker">More work / 27+</p><a href="https://www.behance.net/alifwaymedia" target="_blank" rel="noreferrer">Explore the<br />Archive <span>↗</span></a></section>
      </main>
      <footer className="site-footer projects-footer"><img src="/assets/alifway_media_white_monogram_transparent.png" alt="" /><p>Alifway Media © 2026</p><a href="#top">Back to top ↑</a></footer>
    </>
  );
}
