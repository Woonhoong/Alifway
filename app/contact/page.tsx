import type { Metadata } from "next";
import ClientScripts from "../client-scripts";
import MediaIcon from "../media-icons";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Start a Project — Alifway Media",
  description: "Share your production brief with Alifway Media in Dubai, UAE.",
};

export default function ContactPage() {
  return <>
    <SiteHeader current="contact" />
    <main className="contact-page" id="top">
      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="contact-hero-atmosphere" aria-hidden="true">
          <span className="contact-lens"><MediaIcon name="aperture" /></span>
          <span className="contact-camera"><MediaIcon name="camera" /></span>
          <span className="contact-film"><MediaIcon name="film" /></span>
          <i className="contact-light contact-light-a" />
          <i className="contact-light contact-light-b" />
        </div>
        <p className="section-kicker" data-motion="fade">The next frame / Contact</p>
        <div className="contact-hero-copy">
          <h1 id="contact-title"><span className="line-mask"><span>Start your</span></span><span className="line-mask"><span>project.</span></span></h1>
          <div className="contact-hero-note" data-motion="rise">
            <p>Bring the idea, the ambition or even the rough first thought. We will help shape it into a clear visual direction.</p>
            <span>Film · Photography · Post · Social</span>
          </div>
        </div>
        <div className="hero-scroll-label" aria-hidden="true"><i /> Build the brief</div>
      </section>

      <section className="contact contact-page-form" aria-labelledby="brief-heading" data-motion="rise">
        <div className="contact-aside">
          <p className="section-kicker">Project brief / 01</p>
          <p>Tell us what you are planning, when you need it and what you want the work to achieve. We will use it to shape the right creative and production approach.</p>
          <a href="https://www.instagram.com/alifwaymedia.ae/" target="_blank" rel="noreferrer">Instagram<br /><strong>@alifwaymedia.ae</strong></a>
          <a className="contact-phone" href="tel:+971522662436"><i aria-hidden="true"><MediaIcon name="phone" /></i><span>Phone / WhatsApp<br /><strong>+971 52 266 2436</strong></span></a>
          <a className="contact-location" href="https://maps.app.goo.gl/pASqu4J3zBVR5DWd6?g_st=ic" target="_blank" rel="noreferrer">Location<br /><strong>RKM Building - 106 - near Al Qiyadha Metro - Abu Hail - Dubai</strong></a>
        </div>

        <div className="contact-form-column">
          <h2 id="brief-heading">Tell us what<br />you see.</h2>
          <form className="contact-form" id="contact-form">
            <div className="brief-grid">
              <label className="brief-field">
                <span>Your name *</span>
                <input name="name" type="text" placeholder="Name" autoComplete="name" required />
              </label>
              <label className="brief-field">
                <span>Email address *</span>
                <input id="contact-email" name="email" type="email" placeholder="name@company.com" autoComplete="email" required />
              </label>
              <label className="brief-field">
                <span>Company / brand</span>
                <input name="company" type="text" placeholder="Brand name" autoComplete="organization" />
              </label>
              <label className="brief-field">
                <span>Phone / WhatsApp</span>
                <input name="phone" type="tel" placeholder="+971" autoComplete="tel" />
              </label>
              <label className="brief-field">
                <span>What do you need? *</span>
                <select name="service" defaultValue="" required>
                  <option value="" disabled>Select a service</option>
                  <option>Brand film</option>
                  <option>Social content</option>
                  <option>Product campaign</option>
                  <option>Event coverage</option>
                  <option>Post-production</option>
                  <option>Photography</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className="brief-field">
                <span>Estimated budget</span>
                <select name="budget" defaultValue="Not sure yet">
                  <option>Not sure yet</option>
                  <option>Under AED 10,000</option>
                  <option>AED 10,000–25,000</option>
                  <option>AED 25,000–50,000</option>
                  <option>AED 50,000+</option>
                </select>
              </label>
              <label className="brief-field brief-field-wide">
                <span>When do you need it?</span>
                <input name="timeline" type="text" placeholder="Target date or timeframe" />
              </label>
              <label className="brief-field brief-field-wide brief-message">
                <span>Tell us about the project *</span>
                <textarea name="brief" rows={5} placeholder="What are you creating, who is it for, and what should it achieve?" required />
              </label>
            </div>
            <div className="brief-submit">
              <p>Share as much as you know now. We can help define the creative direction, scope and next steps together.</p>
              <button type="submit"><span>Prepare project brief</span><i className="media-nav-symbol" aria-hidden="true"><MediaIcon name="clapper" /></i></button>
            </div>
            <p className="form-status" id="form-status" aria-live="polite" />
          </form>
        </div>
      </section>

      <section className="contact-process" aria-labelledby="contact-process-title">
        <p className="section-kicker">What happens next / 02</p>
        <h2 id="contact-process-title">A clear path<br />from idea to frame.</h2>
        <ol>
          <li data-motion="rise"><span>01</span><strong>Share</strong><p>Send the brief, references, timeline and goals.</p><i><MediaIcon name="clapper" /></i></li>
          <li data-motion="rise"><span>02</span><strong>Shape</strong><p>We align on concept, production scope and visual direction.</p><i><MediaIcon name="edit" /></i></li>
          <li data-motion="rise"><span>03</span><strong>Create</strong><p>Alifway turns the approved direction into moving work.</p><i><MediaIcon name="camera" /></i></li>
        </ol>
      </section>
    </main>
    <SiteFooter />
    <ClientScripts />
  </>;
}
