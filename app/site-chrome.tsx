import MediaIcon from "./media-icons";
import { RuixenGradientFooter } from "@/components/ui/ruixen-gradient-footer";

type HeaderProps = {
  current?: "home" | "projects" | "contact";
};

type SocialName = "instagram" | "whatsapp" | "linkedin" | "x" | "tiktok" | "behance";

function SocialIcon({ name }: { name: SocialName }) {
  if (name === "linkedin" || name === "behance") {
    return <span className="social-letter" aria-hidden="true">{name === "linkedin" ? "in" : "Bē"}</span>;
  }

  return <svg className="social-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
    {name === "instagram" && <>
      <rect x="5.5" y="5.5" width="21" height="21" rx="6" />
      <circle cx="16" cy="16" r="5" />
      <circle cx="23.2" cy="8.9" r="1" fill="currentColor" stroke="none" />
    </>}
    {name === "whatsapp" && <>
      <path d="M26 15.5A10 10 0 0 1 11.2 24l-5.5 1.4 1.5-5.2A10 10 0 1 1 26 15.5Z" />
      <path d="M12 10.4c.5-.3 1.4 2.3 1.7 2.7.3.4-.7 1.3-.8 1.7.6 1.9 2.5 3.7 4.4 4.3.4-.1 1.2-1.2 1.6-.9.5.2 2.9 1.3 2.7 1.8-.5 1.8-2.1 2.5-3.8 2.2-4.5-.8-9.6-5.7-9.8-10.3 0-1.1 1-2.4 2-2.5.8-.1 1.5.3 2 .9Z" />
    </>}
    {name === "x" && <path d="M7 6l18 20M25 6 7 26M11.5 6H7l13.5 20H25L11.5 6Z" />}
    {name === "tiktok" && <>
      <path d="M18 5v14.3a5.6 5.6 0 1 1-4.7-5.5" />
      <path d="M18 5c1.1 4.2 3.5 6.5 7 6.8" />
    </>}
  </svg>;
}

export function SiteHeader({ current }: HeaderProps) {
  return <header className="site-nav projects-nav" aria-label="Primary navigation">
    <a className="brand-link" href="/" aria-label="Alifway Media home">
      <img src="/assets/Alifway Media - Logo new (3).png" alt="Alifway Media" width="2185" height="405" />
    </a>
    <nav className="nav-links" aria-label="Website sections">
      <a className={current === "home" ? "is-current" : ""} href="/">Home</a>
      <a className={current === "projects" ? "is-current" : ""} href="/projects">Projects</a>
      <a className={`nav-work${current === "contact" ? " is-current" : ""}`} href="/contact">
        <span>Contact</span><span className="media-nav-symbol" aria-hidden="true"><MediaIcon name="clapper" /></span>
      </a>
    </nav>
  </header>;
}

export function ContactTeaser({ label = "The next frame / 06" }: { label?: string }) {
  return <section className="contact-teaser" aria-labelledby="contact-teaser-title" data-motion="rise">
    <div className="contact-teaser-atmosphere" aria-hidden="true">
      <span className="contact-teaser-aperture"><MediaIcon name="aperture" /></span>
      <span className="contact-teaser-camera"><MediaIcon name="camera" /></span>
      <i /><i />
    </div>
    <p className="section-kicker">{label}</p>
    <div className="contact-teaser-copy">
      <h2 id="contact-teaser-title">Have a story<br />worth moving?</h2>
      <p>Tell us what you are making. We will shape the right production path—from first treatment to final delivery.</p>
      <a href="/contact"><span>Start your project</span><i className="media-nav-symbol" aria-hidden="true"><MediaIcon name="clapper" /></i></a>
    </div>
  </section>;
}

export function SiteFooter() {
  return <RuixenGradientFooter className="site-footer site-footer-expanded">
    <div className="footer-brand">
      <img src="/assets/alifway_media_white_monogram_transparent.png" alt="" />
      <p>Alifway Media<br /><span>Dubai · UAE</span></p>
    </div>

    <div className="footer-contact">
      <span>Begin a conversation</span>
      <a href="/contact">Start your project</a>
      <a className="footer-instagram" href="https://www.instagram.com/alifwaymedia.ae/" target="_blank" rel="noreferrer">@alifwaymedia.ae</a>
      <div className="footer-contact-meta">
        <a className="footer-phone" href="tel:+971522662436"><MediaIcon name="phone" /><span>+971 52 266 2436</span></a>
        <a className="footer-address" href="https://maps.app.goo.gl/pASqu4J3zBVR5DWd6?g_st=ic" target="_blank" rel="noreferrer">RKM Building - 106 - near Al Qiyadha Metro - Abu Hail - Dubai</a>
      </div>
    </div>

    <div className="footer-socials" aria-label="Alifway Media social links">
      <a href="https://www.instagram.com/alifwaymedia.ae/" target="_blank" rel="noreferrer" aria-label="Instagram"><SocialIcon name="instagram" /></a>
      <a href="https://wa.me/971522662436" target="_blank" rel="noreferrer" aria-label="WhatsApp +971 52 266 2436"><SocialIcon name="whatsapp" /></a>
      <span className="is-pending" role="img" aria-label="LinkedIn profile link awaiting URL" title="Add the Alifway LinkedIn URL to activate"><SocialIcon name="linkedin" /></span>
      <span className="is-pending" role="img" aria-label="X profile link awaiting URL" title="Add the Alifway X URL to activate"><SocialIcon name="x" /></span>
      <span className="is-pending" role="img" aria-label="TikTok profile link awaiting URL" title="Add the Alifway TikTok URL to activate"><SocialIcon name="tiktok" /></span>
      <a href="https://www.behance.net/alifwaymedia" target="_blank" rel="noreferrer" aria-label="Behance"><SocialIcon name="behance" /></a>
    </div>

    <div className="footer-base">
      <p>Alifway Media © 2026</p>
      <a className="footer-media-link" href="#top">Top <span className="media-nav-symbol" aria-hidden="true"><MediaIcon name="aperture" /></span></a>
    </div>
  </RuixenGradientFooter>;
}
