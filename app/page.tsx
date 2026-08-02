/* eslint-disable @next/next/no-html-link-for-pages -- native anchors avoid a Vinext hydration fault in the cinematic home shell */
import ClientScripts from "./client-scripts";
import MediaIcon from "./media-icons";

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

      <header className="site-nav" aria-label="Primary navigation">
        <a className="brand-link" href="#top" aria-label="Alifway Media, back to top">
          <img
            src="/assets/Alifway Media - Logo new (3).png"
            alt="Alifway Media"
            width="2185"
            height="405"
          />
        </a>
        <div className="nav-links">
          <a href="/projects">Projects</a>
          <a className="nav-work" href="#selected-work">
            <span>Portfolio</span><span aria-hidden="true">↘</span>
          </a>
        </div>
      </header>

      <main id="top">
        <section className="scrub-chapter hero-chapter" data-sequence="clipA" aria-label="Alifway Media introduction">
          <div className="scrub-stage">
            <canvas className="sequence-canvas" aria-hidden="true" />
            <video className="motion-fallback" muted loop playsInline preload="metadata" aria-hidden="true">
              <source src="/video/clipA.mp4" type="video/mp4" />
            </video>
            <img className="sequence-fallback" src="/assets/alifway_media_dark_purple_monogram_transparent.png" alt="" />
            <div className="cinema-wash" aria-hidden="true" />
            <div className="hero-copy">
              <p className="eyebrow">Vision in motion.</p>
              <h1>Alifway<br />Media</h1>
              <div className="hero-foot">
                <p>Film craft, brand worlds<br />and stories built to move.</p>
                <span className="scroll-cue"><i /> Scroll to direct</span>
              </div>
            </div>
            <div className="chapter-index" aria-hidden="true"><span>01</span><span>Opening frame</span></div>
          </div>
        </section>

        <section className="media-journey" id="media-process" data-media-journey aria-labelledby="media-journey-heading">
          <div className="media-stage">
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
              <li className="is-active" data-media-step><span>01 / Capture</span><strong>Camera</strong><p>Find the frame and hold the feeling.</p></li>
              <li data-media-step><span>02 / Direct</span><strong>Cinema</strong><p>Turn the idea into movement and light.</p></li>
              <li data-media-step><span>03 / Shape</span><strong>Edit</strong><p>Build rhythm, tension and continuity.</p></li>
              <li data-media-step><span>04 / Finish</span><strong>Sound</strong><p>Give every image texture and atmosphere.</p></li>
              <li data-media-step><span>05 / Release</span><strong>Play</strong><p>Deliver a story made to be remembered.</p></li>
            </ol>

            <div className="media-journey-index" aria-hidden="true"><span id="media-step-number">01</span><span>Alifway production system</span></div>
          </div>
        </section>

        <section className="manifesto" aria-labelledby="manifesto-heading">
          <p className="section-kicker">Our point of view / 03</p>
          <h2 id="manifesto-heading" className="sr-only">Our manifesto</h2>
          <div className="manifesto-lines">
            <p data-reveal>PLACEHOLDER — YOUR FIRST MANIFESTO LINE.</p>
            <p data-reveal>PLACEHOLDER — YOUR SECOND MANIFESTO LINE.</p>
            <p data-reveal>PLACEHOLDER — YOUR CLOSING THOUGHT.</p>
          </div>
          <p className="manifesto-note">Words to be shaped by Alifway Media.</p>
        </section>

        <section className="scrub-chapter services-chapter" data-sequence="clipB" aria-label="Alifway Media services">
          <div className="scrub-stage">
            <canvas className="sequence-canvas" aria-hidden="true" />
            <video className="motion-fallback" muted loop playsInline preload="metadata" aria-hidden="true">
              <source src="/video/clipB.mp4" type="video/mp4" />
            </video>
            <img className="sequence-fallback" src="/assets/alifway_media_dark_purple_monogram_transparent.png" alt="" />
            <div className="cinema-wash" aria-hidden="true" />
            <div className="services-title">
              <p className="eyebrow">Image. Rhythm. Meaning.</p>
              <h2>What we<br />bring to frame.</h2>
            </div>
            <ol className="service-callouts">
              <li><i /><span>01</span><strong>Cinematography.</strong></li>
              <li><i /><span>02</span><strong>Post-production.</strong></li>
              <li><i /><span>03</span><strong>Brand narratives.</strong></li>
            </ol>
            <div className="chapter-index" aria-hidden="true"><span>04</span><span>Our practice</span></div>
          </div>
        </section>

        <section className="work-index" id="selected-work" aria-labelledby="work-heading">
          <div className="section-heading" data-motion="rise">
            <p className="section-kicker">Selected work / 05</p>
            <h2 id="work-heading">A living index<br />of moving ideas.</h2>
          </div>

          <div className="project-list" role="list">
            <a className="project-row" role="listitem" href="/projects" data-motion="rise">
              <span className="project-number">01</span><h3>Automotive / Motion Study</h3><span className="project-year">Film · 2026</span><span className="project-arrow" aria-hidden="true">↗</span>
            </a>
            <a className="project-row" role="listitem" href="/projects" data-motion="rise">
              <span className="project-number">02</span><h3>Hospitality / A Sense of Place</h3><span className="project-year">Campaign · 2026</span><span className="project-arrow" aria-hidden="true">↗</span>
            </a>
            <a className="project-row" role="listitem" href="/projects" data-motion="rise">
              <span className="project-number">03</span><h3>Fashion / After Light</h3><span className="project-year">Editorial · 2025</span><span className="project-arrow" aria-hidden="true">↗</span>
            </a>
            <a className="project-row" role="listitem" href="/projects" data-motion="rise">
              <span className="project-number">04</span><h3>Architecture / Human Scale</h3><span className="project-year">Narrative · 2025</span><span className="project-arrow" aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="social-portals" data-motion="clip">
            <a href="https://www.behance.net/alifwaymedia" target="_blank" rel="noreferrer">
              <span>Behance / Full portfolio</span><strong>Explore the<br />Archive</strong><i aria-hidden="true">↗</i>
            </a>
            <a href="https://www.instagram.com/alifwaymedia.ae/" target="_blank" rel="noreferrer">
              <span>Instagram / Daily practice</span><strong>Follow our<br />Vision</strong><i aria-hidden="true">↗</i>
            </a>
          </div>
        </section>

        <section className="contact" aria-labelledby="contact-heading" data-motion="rise">
          <p className="section-kicker">The next frame / 06</p>
          <h2 id="contact-heading">Start Your<br />Project</h2>
          <form className="contact-form" id="contact-form">
            <label htmlFor="contact-email">Your email address</label>
            <div className="email-line">
              <input id="contact-email" name="email" type="email" placeholder="name@studio.com" autoComplete="email" required />
              <button type="submit" aria-label="Continue your project enquiry">↗</button>
            </div>
            <p className="form-status" id="form-status" aria-live="polite" />
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <img src="/assets/alifway_media_dark_purple_monogram_transparent.png" alt="" />
        <p>Alifway Media © 2026</p>
        <a href="#top">Back to top ↑</a>
      </footer>

      <ClientScripts />
    </>
  );
}
