import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { getContactHref, site, type SiteImage } from "@/config/site";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

function Ornament({ opening = false }: { opening?: boolean }) {
  return (
    <svg viewBox="0 0 500 500" fill="none" aria-hidden="true" focusable="false" className={`h-auto w-full text-[#c7a477] ${opening ? "oracle-opening" : ""}`}>
      <circle cx="250" cy="250" r="215" stroke="currentColor" strokeOpacity=".35" />
      <circle cx="250" cy="250" r="195" stroke="currentColor" strokeOpacity=".18" />
      <path d="M250 12v42M250 446v42M12 250h42M446 250h42M88 88l24 24M388 388l24 24M88 412l24-24M388 112l24-24" stroke="currentColor" />
      <g className="card-left" transform="rotate(-19 250 310)">
        <rect x="150" y="125" width="144" height="222" rx="65" fill="#38151e" stroke="currentColor" />
        <rect x="161" y="137" width="122" height="198" rx="55" stroke="currentColor" strokeOpacity=".4" />
        <path d="M222 185l12 32 33 12-33 12-12 32-12-32-33-12 33-12z" stroke="currentColor" />
        <circle cx="222" cy="301" r="4" fill="currentColor" />
      </g>
      <g className="card-right" transform="rotate(19 250 310)">
        <rect x="206" y="125" width="144" height="222" rx="65" fill="#38151e" stroke="currentColor" />
        <rect x="217" y="137" width="122" height="198" rx="55" stroke="currentColor" strokeOpacity=".4" />
        <path d="M288 185a39 39 0 1 0 0 76 43 43 0 0 1 0-76Z" stroke="currentColor" />
        <path d="M294 195v20m-10-10h20" stroke="currentColor" />
        <circle cx="278" cy="301" r="4" fill="currentColor" />
      </g>
      <g className="shells" stroke="currentColor">
        <ellipse cx="194" cy="380" rx="25" ry="14" transform="rotate(-22 194 380)" />
        <path d="m173 387 42-14m-32 3 4 9m4-12 4 10m4-13 4 10m4-12 4 9" />
        <ellipse cx="304" cy="380" rx="25" ry="14" transform="rotate(22 304 380)" />
        <path d="m283 372 42 16m-31-15-4 9m12-6-4 9m12-5-4 9m12-6-4 9" />
        <path d="m250 361 6 16 16 6-16 6-6 16-6-16-16-6 16-6Z" />
      </g>
    </svg>
  );
}

function Photo({ image, className = "" }: { image: SiteImage; className?: string }) {
  if (!image.src) return null;
  return (
    <figure data-photo className={`overflow-hidden ${className}`}>
      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" width="1000" height="1250" className="h-full w-full object-cover" />
    </figure>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-5" data-reveal>{eyebrow}</p>
      <h2 data-title className="editorial-title whitespace-pre-line">{title}</h2>
    </div>
  );
}

function ContactLink({ className = "" }: { className?: string }) {
  const href = getContactHref();
  return <a href={href} className={`editorial-button ${className}`}>{href.startsWith("https:") ? site.ui.whatsapp : site.ui.contact}<span aria-hidden="true">↗</span></a>;
}

export default function App() {
  const scope = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileMenu = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = site.seo.title;
    const metadata: [string, string, string][] = [
      ["name", "description", site.seo.description],
      ["property", "og:title", site.seo.title],
      ["property", "og:description", site.seo.description],
      ["property", "og:locale", site.seo.locale],
      ["property", "og:type", "website"],
      ...(site.seo.image ? [["property", "og:image", site.seo.image] as [string, string, string]] : []),
    ];
    metadata.forEach(([attribute, name, content]) => {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    mobileMenu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) {
        setMenuOpen(false);
        document.querySelector<HTMLAnchorElement>("[data-brand]")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  useGSAP(() => {
    const media = gsap.matchMedia();
    let disposed = false;
    const initialize = () => {
      if (disposed || !scope.current) return;
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const root = scope.current!;
        const splits: SplitText[] = [];
        root.querySelectorAll<HTMLElement>("[data-title]").forEach((heading) => {
          const split = SplitText.create(heading, { type: "words", aria: "auto" });
          splits.push(split);
          gsap.from(split.words, {
            yPercent: 60, opacity: 0, duration: 1, stagger: .045, ease: "power3.out",
            scrollTrigger: { trigger: heading, start: "top 88%", once: true },
          });
        });
        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 24, opacity: 0, duration: .85, ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 90%", once: true },
          });
        });
        root.querySelectorAll<HTMLElement>("[data-photo]").forEach((element) => {
          gsap.from(element, {
            clipPath: "inset(12% 8% 12% 8%)", opacity: .2, duration: 1.2,
            scrollTrigger: { trigger: element, start: "top 85%", once: true },
          });
        });
        root.querySelectorAll<HTMLElement>("[data-thread]").forEach((element) => {
          gsap.from(element, {
            scaleX: 0, transformOrigin: "left center", ease: "none",
            scrollTrigger: { trigger: element, start: "top 95%", end: "top 45%", scrub: .6 },
          });
        });
        const opening = root.querySelector(".oracle-opening");
        if (opening) {
          gsap.timeline({ scrollTrigger: { trigger: opening, start: "top 90%", end: "center 45%", scrub: .8 } })
            .from(opening.querySelector(".card-left"), { rotation: 0, x: 28, transformOrigin: "50% 90%", duration: 1 }, 0)
            .from(opening.querySelector(".card-right"), { rotation: 0, x: -28, transformOrigin: "50% 90%", duration: 1 }, 0)
            .from(opening.querySelector(".shells"), { y: -25, opacity: 0, duration: .7 }, .2);
        }
        gsap.from(".timeline-thread", {
          scaleY: 0, transformOrigin: "top center", ease: "none",
          scrollTrigger: { trigger: ".timeline", start: "top 75%", end: "bottom 65%", scrub: .7 },
        });
        gsap.from(".hero-glow", { opacity: 0, scale: .7, duration: 2, ease: "power2.out" });
        const desktop = gsap.matchMedia();
        desktop.add("(min-width: 1024px)", () => {
          ScrollTrigger.create({
            trigger: "#trajetoria", start: "top 130px", end: "bottom 75%",
            pin: ".trajectory-heading", pinSpacing: false,
          });
          gsap.timeline({
            scrollTrigger: { trigger: ".knowledge-scene", start: "top top", end: "+=45%", pin: true, scrub: .8 },
          }).fromTo(".knowledge-halo", { scale: .7, opacity: .15 }, { scale: 1.1, opacity: .45, ease: "none" });
        });
        ScrollTrigger.refresh();
        return () => {
          desktop.revert();
          splits.forEach((split) => split.revert());
        };
      }, scope);
    };
    void document.fonts.ready.then(initialize);
    return () => { disposed = true; media.revert(); };
  }, { scope });

  function closeMenuToSection(href: string) {
    setMenuOpen(false);
    document.getElementById(href.slice(1))?.focus({ preventScroll: true });
  }

  return (
    <div ref={scope} className="min-h-screen bg-background text-foreground">
      <a href="#conteudo" className="skip-link">{site.ui.skip}</a>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#c7a477]/25 bg-[#261018]/95 text-[#f6eee0]">
        <div className="page-width flex min-h-20 items-center justify-between gap-6">
          <a data-brand href="#inicio" aria-label={`${site.name} — ${site.ui.home}`} className="max-w-[230px] py-3 font-serif text-xl leading-tight sm:text-2xl">
            {site.images.logo.src ? <img src={site.images.logo.src} alt={site.images.logo.alt} className="max-h-14 max-w-full object-contain" /> : site.name}
          </a>
          <nav aria-label={site.ui.navigation} className="hidden items-center gap-6 text-xs lg:flex">
            {site.navigation.map((item) => <a key={item.href} className="nav-link" href={item.href}>{item.label}</a>)}
          </nav>
          <button ref={menuButton} type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? site.ui.closeMenu : site.ui.openMenu} onClick={() => setMenuOpen(!menuOpen)} className="flex h-12 w-12 shrink-0 flex-col items-center justify-center gap-1.5 border border-[#c7a477]/50 lg:hidden">
            <span aria-hidden="true" className={`block h-px w-5 bg-current ${menuOpen ? "translate-y-1 rotate-45" : ""}`} />
            <span aria-hidden="true" className={`block h-px w-5 bg-current ${menuOpen ? "-translate-y-1 -rotate-45" : ""}`} />
          </button>
        </div>
        <nav id="mobile-navigation" ref={mobileMenu} aria-label={site.ui.navigation} hidden={!menuOpen} className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-[#c7a477]/25 bg-[#261018] px-6 py-5 lg:hidden">
          {site.navigation.map((item) => <a key={item.href} href={item.href} onClick={() => closeMenuToSection(item.href)} className="block border-b border-[#c7a477]/20 py-4 text-lg">{item.label}</a>)}
        </nav>
      </header>

      <main id="conteudo" tabIndex={-1}>
        <section id="inicio" tabIndex={-1} className="relative isolate flex min-h-[min(950px,100svh)] items-center overflow-hidden bg-[#38151e] pb-14 pt-36 text-[#f6eee0] sm:pt-44">
          <div aria-hidden="true" className="hero-glow pointer-events-none absolute -right-40 top-12 -z-10 h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(151,52,66,0.36),transparent_68%)]" />
          <div className="page-width w-full">
            <div className="grid items-center gap-8 lg:grid-cols-[1.35fr_1fr]">
              <div className="relative z-10">
                <p data-reveal className="eyebrow mb-8 text-[#d9ba91]">{site.hero.eyebrow}</p>
                <h1 data-title className="hero-title">{site.hero.firstLine}<br /><em className="font-normal text-[#d9ba91]">{site.hero.secondLine}</em></h1>
                <p data-reveal className="mt-8 text-sm text-[#dfcfc4]">{site.hero.introduction}<span className="mx-3" aria-hidden="true">/</span><span>{site.ui.pending}</span></p>
                <div data-reveal className="mt-10 flex flex-wrap items-center gap-6">
                  <ContactLink />
                  <a href="#trajetoria" className="text-sm underline decoration-[#c7a477] underline-offset-8">{site.hero.discover}</a>
                </div>
              </div>
              <div data-reveal className="mx-auto w-full max-w-[260px] sm:max-w-[350px] lg:max-w-[480px]"><Ornament /></div>
            </div>
            <div data-thread className="mt-14 h-px w-full bg-[#c7a477]/40 lg:mt-20" />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[.18em] text-[#d9ba91]">
              <span>{site.hero.index}</span><a href="#quem-sou" className="flex items-center gap-4 py-2">{site.hero.scroll}<span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>

        <section id="quem-sou" tabIndex={-1} className="section-space bg-background">
          <div className="page-width grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="relative mx-auto w-full max-w-lg">
              {site.images.portrait.src ? <Photo image={site.images.portrait} className="aspect-[4/5] rounded-t-full" /> : null}
              <div className={`${site.images.portrait.src ? "absolute -bottom-10 right-0 w-40 sm:w-52" : "w-full"} rounded-t-full bg-[#38151e] p-6 sm:p-10`}><Ornament opening /></div>
            </div>
            <div>
              <SectionHeading eyebrow={site.about.eyebrow} title={site.about.title} />
              <div data-thread className="my-8 h-px w-24 bg-[#8c643c]" />
              <p data-reveal className="eyebrow mb-4">{site.about.copyLabel}</p>
              <p data-reveal className="body-copy">{site.about.body}</p>
            </div>
          </div>
        </section>

        <section id="trajetoria" tabIndex={-1} className="section-space border-y border-border bg-[#ede3d4]">
          <div className="page-width grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="trajectory-heading self-start"><SectionHeading eyebrow={site.trajectory.eyebrow} title={site.trajectory.title} /></div>
            <ol className="timeline relative ml-2 space-y-24 py-6 lg:space-y-48 lg:py-14">
              <div aria-hidden="true" className="timeline-thread absolute bottom-0 left-0 top-0 w-px bg-[#8c643c]" />
              {site.trajectory.entries.map((entry) => (
                <li key={entry.date} className="relative pl-9 sm:pl-14">
                  <span aria-hidden="true" className="absolute -left-1.5 top-2 h-3 w-3 rotate-45 border border-[#8c643c] bg-[#ede3d4]" />
                  <div data-reveal><p className="eyebrow text-[#785432]">{entry.date}</p><h3 className="mt-6 font-serif text-3xl sm:text-4xl">{entry.title}</h3><p className="body-copy mt-5">{entry.body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="oraculos" tabIndex={-1} className="section-space bg-[#261018] text-[#f6eee0]">
          <div className="page-width">
            <SectionHeading eyebrow={site.oracles.eyebrow} title={site.oracles.title} />
            <div data-thread className="my-10 h-px bg-[#c7a477]/40" />
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              {site.oracles.items.map((item, index) => (
                <article key={item.number} className={index === 1 ? "md:pt-20" : ""}>
                  {index === 0 ? (site.images.cards.src ? <Photo image={site.images.cards} className="mb-8 aspect-[4/3]" /> : <div className="mb-8 flex aspect-[4/3] items-center justify-center border border-[#c7a477]/25 bg-[#38151e]"><div className="w-3/4 max-w-xs"><Ornament /></div></div>) : (site.images.buzios.src ? <Photo image={site.images.buzios} className="mb-8 aspect-[4/3]" /> : <div className="mb-8 flex aspect-[4/3] flex-col items-center justify-center gap-4 border border-[#c7a477]/40 px-8 text-center"><span aria-hidden="true" className="text-4xl text-[#d9ba91]">◇</span><p className="font-serif text-2xl">{site.ui.photoPlaceholder}</p><p className="max-w-60 text-xs leading-relaxed text-[#dfcfc4]">{site.ui.photoPlaceholderDetail}</p><span className="text-xs text-[#dfcfc4]">{site.ui.pending}</span></div>)}
                  <div data-reveal className="flex items-baseline gap-5"><span className="text-xs text-[#d9ba91]">{item.number}</span><h3 className="font-serif text-4xl sm:text-5xl">{item.title}</h3></div>
                  <p data-reveal className="mt-5 text-sm leading-7 text-[#dfcfc4]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="saberes" tabIndex={-1} className="knowledge-scene relative isolate flex min-h-[75svh] items-center overflow-hidden bg-[#571d2c] py-28 text-center text-[#f6eee0] lg:min-h-screen">
          <div aria-hidden="true" className="knowledge-halo pointer-events-none absolute left-1/2 top-1/2 -z-10 -ml-[min(40vw,300px)] -mt-[min(40vw,300px)] h-[min(80vw,600px)] w-[min(80vw,600px)] rounded-full border border-[#c7a477]/40 opacity-45" />
          <div className="page-width flex flex-col items-center">
            <SectionHeading eyebrow={site.knowledge.eyebrow} title={site.knowledge.title} />
            <div data-thread className="my-9 h-px w-24 bg-[#d9ba91]" />
            <p data-reveal className="text-base text-[#dfcfc4]">{site.knowledge.body}</p>
          </div>
        </section>

        <section id="alem-da-espiritualidade" tabIndex={-1} className="section-space bg-background">
          <div className={`page-width grid items-center gap-12 ${site.images.life.src ? "lg:grid-cols-2 lg:gap-24" : ""}`}>
            <div><SectionHeading eyebrow={site.beyond.eyebrow} title={site.beyond.title} /><p data-reveal className="body-copy mt-8">{site.beyond.body}</p></div>
            <Photo image={site.images.life} className="aspect-[4/5]" />
          </div>
        </section>

        <section id="atendimentos" tabIndex={-1} className="section-space border-y border-border bg-[#ede3d4]">
          <div className="page-width grid gap-12 lg:grid-cols-2 lg:gap-24">
            <SectionHeading eyebrow={site.appointments.eyebrow} title={site.appointments.title} />
            <div data-reveal className="border-l border-[#8c643c]/60 pl-6 sm:pl-10">
              <p className="max-w-md font-serif text-2xl leading-relaxed sm:text-3xl">{site.appointments.availability}</p>
              <p className="body-copy my-6">{site.appointments.body}</p>
              {site.links.whatsappNumber ? <ContactLink className="button-dark" /> : <p className="max-w-sm text-sm leading-7 text-muted-foreground">{site.appointments.pendingContact}</p>}
              {site.links.instagram ? <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm underline underline-offset-4">{site.ui.instagram}<span aria-hidden="true">↗</span><span className="sr-only">{site.ui.external}</span></a> : <p className="mt-6 text-xs text-muted-foreground">{site.ui.instagram} · {site.ui.pending}</p>}
            </div>
          </div>
        </section>

        <section id="perguntas-frequentes" tabIndex={-1} className="section-space bg-background">
          <div className="page-width grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
            <SectionHeading eyebrow={site.faq.eyebrow} title={site.faq.title} />
            <div className="border-t border-[#8c643c]/40">
              {site.faq.items.map((item, index) => (
                <details key={item.question} className="faq-item border-b border-[#8c643c]/40">
                  <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-6 text-base font-medium">
                    <span>{item.question}</span><span aria-hidden="true" className="faq-icon shrink-0 text-2xl font-light">+</span>
                  </summary>
                  <p className="pb-7 pr-8 text-sm leading-7 text-muted-foreground">{index === 3 && site.links.instagram ? <a className="underline underline-offset-4" href={site.links.instagram} target="_blank" rel="noopener noreferrer">{site.ui.instagram}<span className="sr-only"> — {site.ui.external}</span></a> : item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space relative overflow-hidden bg-[#38151e] text-center text-[#f6eee0]">
          <div className="page-width flex flex-col items-center">
            <p data-reveal className="eyebrow mb-8 text-[#d9ba91]">{site.closing.eyebrow}</p>
            <h2 data-title className="editorial-title whitespace-pre-line">{site.closing.title}</h2>
            <div data-reveal className="mt-10"><ContactLink /></div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1b1014] py-9 text-[#dfcfc4]">
        <div className="page-width flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div><p className="font-serif text-xl text-[#f6eee0]">{site.name}</p><p className="mt-3 text-[11px] leading-6">© {new Date().getFullYear()} {site.name}. {site.ui.copyright}</p></div>
          <nav aria-label={site.ui.footerNavigation} className="flex flex-wrap items-center gap-8 text-xs">
            {site.links.instagram ? <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="nav-link">{site.ui.instagram}<span className="sr-only"> — {site.ui.external}</span></a> : <span>{site.ui.instagram} · {site.ui.pending}</span>}
            <a className="nav-link" href="#inicio">{site.ui.top} <span aria-hidden="true">↑</span></a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
