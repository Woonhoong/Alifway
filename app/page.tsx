/* eslint-disable @next/next/no-html-link-for-pages -- native anchors avoid a Vinext hydration fault in the cinematic home shell */
import ClientScripts from "./client-scripts";
import type { CSSProperties } from "react";
import MediaIcon, { type MediaIconName } from "./media-icons";
import { categories, categoryAsset, categoryHeadline, projects, type Category } from "./projects/data";
import { ContactTeaser, SiteFooter, SiteHeader } from "./site-chrome";

const categoryIcons: Record<Category, MediaIconName> = {
  Food: "camera",
  Automotive: "film",
  "Fashion & Beauty": "aperture",
  Branding: "clapper",
  Events: "mic",
  "Social Films": "play",
};

const practiceScenes = [
  {
    number: "01",
    action: "Capture",
    title: "Cinematography",
    description: "Light, movement and performance composed with intention—before the first frame is ever recorded.",
    detail: "Direction · Camera · Lighting",
    fallback: "/assets/categories/food.png",
    frame: "https://drive.google.com/thumbnail?id=10Iv9ZXhZ1UYPnrnsnpY22g6TrRIEVQgN&sz=w1920",
    href: "/projects/june-11-06",
  },
  {
    number: "02",
    action: "Shape",
    title: "Post-production",
    description: "Picture, colour and sound refined into a rhythm that holds attention and carries the story.",
    detail: "Edit · Colour · Sound design",
    fallback: "/assets/categories/events.png",
    frame: "https://drive.google.com/thumbnail?id=1WFr64g9YJQLcs9ML_lksHq_1MUf-VPcA&sz=w1920",
    href: "/projects/dj-poli-08",
  },
  {
    number: "03",
    action: "Move",
    title: "Brand narratives",
    description: "A clear brand idea translated into cinematic moments made for campaigns, screens and the scroll.",
    detail: "Concept · Campaign · Social films",
    fallback: "/assets/categories/branding.png",
    frame: "https://drive.google.com/thumbnail?id=1mVPgO7MDzzLrfn9ma3Jyjz6f4-HeY4iA&sz=w1920",
    href: "/projects/may-28-cut-ii-07",
  },
] as const;

const practiceFrameStrip = [
  "10Iv9ZXhZ1UYPnrnsnpY22g6TrRIEVQgN",
  "1WFr64g9YJQLcs9ML_lksHq_1MUf-VPcA",
  "1mVPgO7MDzzLrfn9ma3Jyjz6f4-HeY4iA",
  "1TcmZs-76S1sl2OdDL8x9HUFbQnnz2d16",
  "1s3ASKGIOaXBl4JFOF5sYgiXBeqDhauj-",
  "1aHuqEIeXxWqefo2ndCSkyi-OSLWgewRV",
] as const;

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#selected-work">Skip to selected work</a>

      <div className="site-loader" id="site-loader" role="status" aria-live="polite">
        <div className="loader-core">
          <img
            className="loader-mark"
            src="/assets/alifway_media_white_monogram_transparent.png"
            alt="Alifway Media"
          />
          <div className="loader-meta">
            <span>Loading cinematic frames</span>
            <span id="loader-percent">0%</span>
          </div>
          <div className="loader-track" aria-hidden="true">
            <span id="loader-progress" />
          </div>
        </div>
      </div>

      <SiteHeader current="home" />

      <main id="top">
        <section
          className="scrub-chapter hero-chapter"
          data-sequence="hero-camera"
          data-frame-count="42"
          data-frame-root="/frames/hero-camera"
          aria-label="Alifway Media camera-build introduction"
        >
          <div className="scrub-stage">
            <canvas className="sequence-canvas" aria-hidden="true" />
            <video className="motion-fallback" muted playsInline preload="metadata" aria-hidden="true">
              <source src="/video/camera-build.mp4" type="video/mp4" />
            </video>
            <img className="sequence-fallback" src="/frames/hero-camera/frame_0042.jpg" alt="" />
            <div className="hero-theme-wash" aria-hidden="true" />

            <div className="hero-brand-stamp" aria-hidden="true">
              <span>Alifway Media</span>
              <span>Dubai · UAE</span>
            </div>

            <div className="hero-scroll-copy" aria-hidden="false">
              <article className="hero-story-panel hero-story-panel-left" data-hero-panel data-phase-start="-0.065" data-phase-end="0.31">
                <p>01 / First light</p>
                <h1>Vision begins<br />at the source.</h1>
                <span>Every memorable story starts with the right point of view.</span>
              </article>

              <article className="hero-story-panel hero-story-panel-right" data-hero-panel data-phase-start="0.34" data-phase-end="0.65">
                <p>02 / Built in motion</p>
                <h2>Every piece<br />serves the story.</h2>
                <span>Film craft, visual rhythm and brand thinking—assembled frame by frame.</span>
              </article>

              <article className="hero-story-panel hero-story-panel-left hero-story-panel-final" data-hero-panel data-phase-start="0.68" data-phase-end="0.985">
                <p>03 / Ready to create</p>
                <h2>Ideas that move<br />brands forward.</h2>
                <span>Campaigns, films and digital experiences made for ambitious brands.</span>
              </article>
            </div>

            <div className="hero-wordmark" data-hero-mark aria-hidden="true">
              <span>Alifway Media</span>
              <i>Vision in motion</i>
            </div>

            <div className="hero-scroll-meter" aria-hidden="true">
              <span>Scroll to assemble</span>
              <i><b /></i>
              <span>42 frames</span>
            </div>
            <div className="chapter-index" aria-hidden="true"><span>01</span><span>Opening frame</span></div>
          </div>
        </section>

        <section className="media-journey" id="media-process" data-media-journey aria-labelledby="media-journey-heading">
          <div className="media-stage">
            <div className="media-journey-backgrounds" aria-hidden="true">
              <img className="is-active" data-media-background src="/assets/production-line/01-directing-camera-background.png" alt="" />
              <img data-media-background src="/assets/production-line/02-cinema-background.png" alt="" />
              <img data-media-background src="/assets/production-line/03-post-production-background.png" alt="" />
              <img data-media-background src="/assets/production-line/04-sound-production-background.png" alt="" />
              <img data-media-background src="/assets/production-line/05-final-delivery-background.png" alt="" />
            </div>

            <div className="media-journey-head">
              <p className="section-kicker">The production line / 02</p>
              <h2 id="media-journey-heading">Every idea<br />finds its form.</h2>
            </div>

            <div className="media-motion-rail" aria-hidden="true">
              <i />
              <div className="media-marker">
                <span className="media-glyph is-active" data-media-glyph><MediaIcon name="camera" /></span>
                <span className="media-glyph" data-media-glyph><MediaIcon name="film" /></span>
                <span className="media-glyph" data-media-glyph><MediaIcon name="edit" /></span>
                <span className="media-glyph" data-media-glyph><MediaIcon name="mic" /></span>
                <span className="media-glyph" data-media-glyph><MediaIcon name="play" /></span>
              </div>
            </div>

            <ol className="media-journey-steps">
              <li className="is-active" data-media-step>
                <span>01 / Capture</span><strong>Camera</strong>
                <p>We shape the brief, find the point of view and capture every frame with intention.<small>Creative direction · Production · Cinematography</small></p>
              </li>
              <li data-media-step>
                <span>02 / Direct</span><strong>Cinema</strong>
                <p>Light, performance and movement come together to turn an idea into a living scene.<small>Direction · Lighting · On-set craft</small></p>
              </li>
              <li data-media-step>
                <span>03 / Shape</span><strong>Edit</strong>
                <p>We refine the strongest moments into a clear rhythm built around the brand story.<small>Editing · Colour · Motion design</small></p>
              </li>
              <li data-media-step>
                <span>04 / Finish</span><strong>Sound</strong>
                <p>Music, voice and detail give the picture its atmosphere, energy and emotional weight.<small>Sound design · Mix · Voice</small></p>
              </li>
              <li data-media-step>
                <span>05 / Release</span><strong>Play</strong>
                <p>Every film is finished for the right screen, format and audience—ready to make an impact.<small>Campaign delivery · Social cuts · Masters</small></p>
              </li>
            </ol>

            <div className="media-journey-index" aria-hidden="true"><span id="media-step-number">01</span><span>Alifway production system</span></div>
          </div>
        </section>

        <section className="manifesto" id="manifesto" data-manifesto aria-labelledby="manifesto-heading">
          <div className="manifesto-atmosphere" aria-hidden="true">
            <i className="manifesto-glow manifesto-glow-a" />
            <i className="manifesto-glow manifesto-glow-b" />
            <span>Idea · Image · Sound · Motion ·</span>
          </div>

          <div className="manifesto-intro">
            <p className="section-kicker">Our point of view / 03</p>
            <p className="manifesto-lede" data-reveal>
              From the first frame to the final cut, we create visual work that feels
              considered, human and unmistakably yours.
            </p>
          </div>
          <h2 id="manifesto-heading" className="sr-only">Our manifesto</h2>
          <div className="manifesto-lines">
            <p data-reveal>Every story begins with a point of view.</p>
            <p data-reveal>Craft gives every idea its rhythm.</p>
            <p data-reveal>Emotion is what makes it stay.</p>
          </div>
          <div className="manifesto-footer">
            <p className="manifesto-note">Alifway Media — vision shaped through image, sound and motion.</p>
            <p className="manifesto-promise">Stories made to move people—and brands.</p>
          </div>
        </section>

        <section className="practice-reel" id="practice" data-practice-reel aria-labelledby="practice-heading">
          <div className="practice-stage">
            <div className="practice-backdrop" aria-hidden="true">
              <span data-practice-word>Capture</span>
              <span data-practice-word>Shape</span>
              <span data-practice-word>Move</span>
              <i /><i />
            </div>

            <div className="practice-heading">
              <p className="eyebrow">Image. Rhythm. Meaning. / 04</p>
              <h2 id="practice-heading">What we<br />bring to frame.</h2>
            </div>

            <div className="practice-viewfinder">
              <div className="practice-corners" aria-hidden="true"><i /><i /><i /><i /></div>
              {practiceScenes.map((scene, index) => (
                <a
                  className={`practice-scene${index === 0 ? " is-active" : ""}`}
                  data-practice-scene
                  href={scene.href}
                  aria-label={`View ${scene.title} project`}
                  key={scene.title}
                >
                  <img className="practice-frame-fallback" src={scene.fallback} alt="" loading={index === 0 ? "eager" : "lazy"} />
                  <img className="practice-real-frame" src={scene.frame} alt="" loading={index === 0 ? "eager" : "lazy"} referrerPolicy="no-referrer" />
                  <span className="practice-scene-shade" aria-hidden="true" />
                  <span className="practice-scene-label">Alifway project reel · {scene.number}</span>
                  <span className="practice-scene-open">View film <MediaIcon name="play" /></span>
                </a>
              ))}
            </div>

            <ol className="practice-steps">
              {practiceScenes.map((scene, index) => (
                <li className={index === 0 ? "is-active" : ""} data-practice-step key={scene.title}>
                  <div className="practice-step-head">
                    <span>{scene.number} / {scene.action}</span>
                    <strong>{scene.title}</strong>
                    <i><b /></i>
                  </div>
                  <div className="practice-step-copy">
                    <p>{scene.description}</p>
                    <small>{scene.detail}</small>
                  </div>
                </li>
              ))}
            </ol>

            <div className="practice-filmstrip" aria-hidden="true">
              {practiceFrameStrip.map((id) => <img src={`https://drive.google.com/thumbnail?id=${id}&sz=w640`} alt="" loading="lazy" referrerPolicy="no-referrer" key={id} />)}
            </div>
            <div className="practice-counter" aria-hidden="true"><span id="practice-step-number">01</span><i /><span>03</span></div>
          </div>
        </section>

        <section className="work-index" id="selected-work" aria-labelledby="work-heading">
          <div className="section-heading" data-motion="rise">
            <p className="section-kicker">Selected work / 05</p>
            <h2 id="work-heading">A living index<br />of moving ideas.</h2>
          </div>

          <div className="home-category-grid" role="list">
            {categories.map((category, index) => {
              const count = projects.filter((project) => project.category === category).length;
              return <a
                className="home-category-card"
                role="listitem"
                href={`/projects?category=${encodeURIComponent(category)}#category-films`}
                data-motion="project"
                style={{ "--motion-order": index % 3 } as CSSProperties}
                key={category}
              >
                <img src={categoryAsset[category]} alt="" loading="lazy" />
                <span className="home-category-shade" aria-hidden="true" />
                <span className="home-category-number">0{index + 1}</span>
                <span className="home-category-copy"><small>{categoryHeadline[category]}</small><strong>{category}</strong></span>
                <span className="home-category-meta">{count} films <i className="media-nav-symbol" aria-hidden="true"><MediaIcon name={categoryIcons[category]} /></i></span>
              </a>;
            })}
          </div>

          <div className="social-portals" data-motion="clip">
            <a href="https://www.behance.net/alifwaymedia" target="_blank" rel="noreferrer">
              <span>Behance / Full portfolio</span><strong>Explore the<br />Archive</strong><i className="media-nav-symbol" aria-hidden="true"><MediaIcon name="film" /></i>
            </a>
            <a href="https://www.instagram.com/alifwaymedia.ae/" target="_blank" rel="noreferrer">
              <span>Instagram / Daily practice</span><strong>Follow our<br />Vision</strong><i className="media-nav-symbol" aria-hidden="true"><MediaIcon name="camera" /></i>
            </a>
          </div>
        </section>

        <ContactTeaser />
      </main>

      <SiteFooter />

      <ClientScripts />
    </>
  );
}
