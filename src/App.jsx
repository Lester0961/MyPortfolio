import {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Buildings,
  CaretRight,
  Certificate,
  CheckCircle,
  Code,
  CurrencyDollar,
  Database,
  DownloadSimple,
  EnvelopeSimple,
  FacebookLogo,
  GithubLogo,
  GraduationCap,
  InstagramLogo,
  LinkedinLogo,
  List,
  MapPin,
  MonitorPlay,
  PaperPlaneTilt,
  Stack,
  TerminalWindow,
  X,
} from "@phosphor-icons/react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {
  assets,
  experience,
  featuredProjects,
  secondaryProjects,
  skillGroups,
  socialLinks,
} from "./data";

gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

const SystemsCanvas = lazy(() => import("./components/SystemsCanvas"));

const navigation = [
  ["About", "about"],
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Experience", "experience"],
  ["Credentials", "certifications"],
  ["Contact", "contact"],
];

const socialIcons = {
  github: GithubLogo,
  linkedin: LinkedinLogo,
  facebook: FacebookLogo,
  instagram: InstagramLogo,
  jobstreet: Briefcase,
  paypal: CurrencyDollar,
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useGitHubProfile() {
  const [profile, setProfile] = useState({
    public_repos: 11,
    followers: null,
    html_url: "https://github.com/Lester0961",
    status: "loading",
  });

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.github.com/users/Lester0961", {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub profile unavailable");
        return response.json();
      })
      .then((data) => {
        setProfile({
          public_repos: data.public_repos,
          followers: data.followers,
          html_url: data.html_url,
          status: "ready",
        });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setProfile((current) => ({ ...current, status: "fallback" }));
        }
      });
    return () => controller.abort();
  }, []);

  return profile;
}

function MagneticLink({ className = "", children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(pointer: coarse)").matches) return undefined;
    const moveX = gsap.quickTo(element, "x", { duration: 0.45, ease: "power3" });
    const moveY = gsap.quickTo(element, "y", { duration: 0.45, ease: "power3" });

    const handleMove = (event) => {
      const bounds = element.getBoundingClientRect();
      moveX((event.clientX - bounds.left - bounds.width / 2) * 0.22);
      moveY((event.clientY - bounds.top - bounds.height / 2) * 0.22);
    };
    const reset = () => {
      moveX(0);
      moveY(0);
    };

    element.addEventListener("pointermove", handleMove, { passive: true });
    element.addEventListener("pointerleave", reset);
    return () => {
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <a ref={ref} className={className} {...props}>
      {children}
    </a>
  );
}

function ProjectScene({ project, onOpen }) {
  const imageRef = useRef(null);

  return (
    <article className="project-scene" data-project={project.id}>
      <div className="project-shell" style={{ "--project-color": project.theme }}>
        <div className="project-media-wrap">
          <div className="project-browser-bar" aria-hidden="true">
            <span />
            <span />
            <span />
            <b>{project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}</b>
          </div>
          <img
            ref={imageRef}
            className="project-image"
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            data-project-image={project.id}
          />
          <div className="project-depth-shadow" aria-hidden="true" />
        </div>

        <div className="project-copy">
          <p className="project-kicker">{project.shortName}</p>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="project-stack" aria-label={`${project.name} technology stack`}>
            {project.stack.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
          <div className="project-actions">
            <MagneticLink href={project.liveUrl} target="_blank" rel="noreferrer">
              Live app <ArrowUpRight aria-hidden="true" />
            </MagneticLink>
            <button type="button" onClick={() => onOpen(project, imageRef.current)}>
              Case study <CaretRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function DetailDialog({ item, sourceElement, reducedMotion, onClose }) {
  const dialogRef = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !item) return undefined;
    if (!dialog.open) dialog.showModal();

    gsap.set(dialog, { autoAlpha: 1 });
    gsap.fromTo(
      dialog.querySelector(".dialog-panel"),
      { y: reducedMotion ? 0 : 70, scale: reducedMotion ? 1 : 0.9, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: reducedMotion ? 0.01 : 0.72, ease: "expo.out" },
    );

    if (sourceElement && mediaRef.current && !reducedMotion) {
      const finalState = Flip.getState(mediaRef.current);
      Flip.fit(mediaRef.current, sourceElement, { scale: true });
      Flip.to(finalState, {
        duration: 0.92,
        ease: "expo.inOut",
        scale: true,
        onComplete: () => gsap.set(mediaRef.current, { clearProps: "all" }),
      });
    }

    const handleCancel = (event) => {
      event.preventDefault();
      onClose();
    };
    const handleBackdrop = (event) => {
      if (event.target === dialog) onClose();
    };
    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("click", handleBackdrop);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleBackdrop);
    };
  }, [item, onClose, reducedMotion, sourceElement]);

  if (!item) return null;
  const detailImage = item.image || assets.systemsEngineImage;
  const detailImageAlt = item.imageAlt || "Abstract digital systems environment";

  return (
    <dialog ref={dialogRef} className="project-dialog" aria-labelledby="dialog-title">
      <div className="dialog-panel">
        <button type="button" className="dialog-close" onClick={onClose} aria-label="Close case study">
          <X aria-hidden="true" />
        </button>
        <div className="dialog-media" ref={mediaRef}>
          <img src={detailImage} alt={detailImageAlt} />
        </div>
        <div className="dialog-content">
          <p className="dialog-type">{item.type || item.shortName}</p>
          <h2 id="dialog-title">{item.name}</h2>
          <div className="dialog-grid">
            <section>
              <h3>Context</h3>
              <p>{item.details.context}</p>
            </section>
            <section>
              <h3>My role</h3>
              <p>{item.details.role}</p>
            </section>
            <section>
              <h3>Result</h3>
              <p>{item.details.result}</p>
            </section>
          </div>
          <div className="dialog-stack">
            {item.stack.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
          <div className="dialog-actions">
            {item.liveUrl && (
              <a href={item.liveUrl} target="_blank" rel="noreferrer">
                Open live app <ArrowUpRight aria-hidden="true" />
              </a>
            )}
            {item.githubUrl && (
              <a href={item.githubUrl} target="_blank" rel="noreferrer">
                View repository <GithubLogo aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}

function CertificateDialog({ open, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return undefined;
    if (!dialog.open) dialog.showModal();
    const handleCancel = (event) => {
      event.preventDefault();
      onClose();
    };
    const handleBackdrop = (event) => {
      if (event.target === dialog) onClose();
    };
    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("click", handleBackdrop);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleBackdrop);
    };
  }, [onClose, open]);

  if (!open) return null;
  return (
    <dialog ref={dialogRef} className="certificate-dialog" aria-labelledby="certificate-dialog-title">
      <div className="certificate-dialog-panel">
        <button type="button" className="dialog-close" onClick={onClose} aria-label="Close certificate">
          <X aria-hidden="true" />
        </button>
        <img src={assets.certificateImage} alt="TESDA National Certificate II in Computer Systems Servicing" />
        <div>
          <h2 id="certificate-dialog-title">TESDA National Certificate II</h2>
          <p>Computer Systems Servicing</p>
          <p>Certificate 23131602004985</p>
          <p>Valid until May 29, 2028</p>
        </div>
      </div>
    </dialog>
  );
}

function SkillsConstellation() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const activeGroup = useMemo(
    () => skillGroups.find((group) => group.id === activeId) || skillGroups[0],
    [activeId],
  );
  const groupIcon = activeId === "frontend" ? Code : activeId === "connected" ? Database : Stack;
  const ActiveIcon = groupIcon;

  return (
    <div className="skills-system">
      <div className="skill-selector" role="tablist" aria-label="Skill groups">
        {skillGroups.map((group) => (
          <button
            type="button"
            key={group.id}
            role="tab"
            aria-selected={activeId === group.id}
            onClick={() => setActiveId(group.id)}
          >
            {group.title}
          </button>
        ))}
      </div>
      <div className="constellation" key={activeGroup.id}>
        <div className="constellation-core">
          <ActiveIcon aria-hidden="true" />
          <strong>{activeGroup.title}</strong>
          <p>{activeGroup.summary}</p>
        </div>
        <div className="orbit-ring orbit-ring-one" aria-hidden="true" />
        <div className="orbit-ring orbit-ring-two" aria-hidden="true" />
        {activeGroup.items.map((item, index) => (
          <span
            className="tech-node"
            key={item}
            style={{ "--node-index": index, "--node-total": activeGroup.items.length }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const appRef = useRef(null);
  const heroStageRef = useRef(null);
  const sourceElementRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const reducedMotion = useReducedMotion();
  const githubProfile = useGitHubProfile();

  const closeProject = () => {
    const dialog = document.querySelector(".project-dialog");
    if (!dialog || reducedMotion) {
      if (dialog?.open) dialog.close();
      setSelectedProject(null);
      return;
    }
    gsap.to(dialog.querySelector(".dialog-panel"), {
      y: 35,
      scale: 0.96,
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        dialog.close();
        setSelectedProject(null);
      },
    });
  };

  const openProject = (project, sourceElement) => {
    sourceElementRef.current = sourceElement;
    setSelectedProject(project);
  };

  const closeCertificate = () => {
    const dialog = document.querySelector(".certificate-dialog");
    if (dialog?.open) dialog.close();
    setCertificateOpen(false);
  };

  useLayoutEffect(() => {
    const app = appRef.current;
    if (!app) return undefined;
    let context;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      context = gsap.context(() => {
        if (reducedMotion) {
          gsap.set(".boot-screen", { display: "none" });
          gsap.set(".hero-word, .hero-intro, .hero-actions, .hero-project-layer, .site-nav", {
            opacity: 1,
            visibility: "visible",
            clearProps: "transform",
          });
          return;
        }

        const bootTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        bootTimeline
          .fromTo(".boot-line-fill", { scaleX: 0 }, { scaleX: 1, duration: 0.75 })
          .from(".boot-label span", { yPercent: 120, stagger: 0.055, duration: 0.45 }, "<0.08")
          .to(".boot-screen", {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.95,
            ease: "expo.inOut",
          })
          .set(".boot-screen", { display: "none" })
          .from(".site-nav", { y: -80, opacity: 0, duration: 0.65 }, "-=0.5")
          .from(
            ".hero-word",
            { yPercent: 130, rotateX: -70, opacity: 0, stagger: 0.055, duration: 0.9 },
            "-=0.5",
          )
          .from(".hero-intro", { y: 30, opacity: 0, duration: 0.6 }, "-=0.5")
          .from(".hero-actions", { y: 26, opacity: 0, duration: 0.55 }, "-=0.4")
          .from(
            ".hero-project-layer",
            {
              z: -700,
              y: 180,
              rotateX: 35,
              rotateZ: (index) => (index - 1) * 16,
              opacity: 0,
              stagger: 0.11,
              duration: 1.15,
              ease: "expo.out",
            },
            "-=0.8",
          );

        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#about",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          })
          .to(".hero-copy", { yPercent: -20, scale: 0.88, opacity: 0.18, ease: "none" }, 0)
          .to(
            ".hero-project-layer",
            {
              z: (index) => 460 + index * 170,
              y: (index) => -110 + index * 60,
              rotateZ: (index) => (index - 1) * -10,
              opacity: (index) => 0.12 + index * 0.18,
              ease: "none",
              stagger: 0.05,
            },
            0,
          )
          .to(".systems-canvas-motion", { scale: 1.7, opacity: 0, ease: "none" }, 0);

        const splitInstances = [];
        gsap.utils.toArray(".split-heading").forEach((heading) => {
          const split = SplitText.create(heading, {
            type: "lines,words",
            mask: "lines",
            autoSplit: true,
            aria: "auto",
          });
          splitInstances.push(split);
          gsap.from(split.words, {
            yPercent: 115,
            rotateX: -42,
            opacity: 0,
            stagger: 0.035,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 82%",
              once: true,
            },
          });
        });

        gsap.from(".metric-value", {
          yPercent: 120,
          opacity: 0,
          stagger: 0.1,
          duration: 0.85,
          ease: "expo.out",
          scrollTrigger: { trigger: ".metrics", start: "top 82%", once: true },
        });

        const media = gsap.matchMedia();
        media.add("(min-width: 768px)", () => {
          const scenes = gsap.utils.toArray(".project-scene");
          scenes.forEach((scene, index) => {
            if (index === scenes.length - 1) return;
            ScrollTrigger.create({
              trigger: scene,
              start: "top top",
              endTrigger: scenes[scenes.length - 1],
              end: "top top",
              pin: true,
              pinSpacing: false,
            });
            gsap.to(scene.querySelector(".project-shell"), {
              scale: 0.78 - index * 0.025,
              rotateX: 12,
              y: -42,
              opacity: 0.16,
              filter: "blur(12px)",
              ease: "none",
              scrollTrigger: {
                trigger: scenes[index + 1],
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            });
          });
        });

        gsap.utils.toArray(".project-media-wrap").forEach((mediaWrap) => {
          gsap.fromTo(
            mediaWrap.querySelector(".project-image"),
            { scale: 1.16, yPercent: -4 },
            {
              scale: 1,
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: mediaWrap,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });

        gsap.from(".secondary-project-row", {
          xPercent: (index) => (index % 2 === 0 ? -12 : 12),
          opacity: 0,
          stagger: 0.1,
          duration: 0.85,
          ease: "expo.out",
          scrollTrigger: { trigger: ".secondary-projects", start: "top 78%", once: true },
        });

        gsap.fromTo(
          ".experience-current",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".experience-grid",
              start: "top 75%",
              end: "bottom 35%",
              scrub: 1,
            },
          },
        );

        gsap.from(".experience-role", {
          x: 70,
          opacity: 0,
          stagger: 0.14,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: ".experience-grid", start: "top 72%", once: true },
        });

        gsap.fromTo(
          ".certificate-scan",
          { yPercent: -120 },
          {
            yPercent: 180,
            ease: "none",
            scrollTrigger: {
              trigger: ".credential-media",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          },
        );

        gsap.from(".contact-orbit-link", {
          scale: 0,
          rotate: (index) => (index % 2 === 0 ? -80 : 80),
          opacity: 0,
          stagger: 0.08,
          duration: 0.85,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: ".contact-orbit", start: "top 78%", once: true },
        });

        return () => {
          media.revert();
          splitInstances.forEach((split) => split.revert());
        };
      }, app);
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [reducedMotion]);

  useEffect(() => {
    const stage = heroStageRef.current;
    if (!stage || reducedMotion || window.matchMedia("(pointer: coarse)").matches) return undefined;
    const layers = Array.from(stage.querySelectorAll(".hero-project-layer"));
    const setters = layers.map((layer, index) => ({
      x: gsap.quickTo(layer, "x", { duration: 0.7, ease: "power3" }),
      y: gsap.quickTo(layer, "y", { duration: 0.7, ease: "power3" }),
      rotateY: gsap.quickTo(layer, "rotateY", { duration: 0.8, ease: "power3" }),
      rotateX: gsap.quickTo(layer, "rotateX", { duration: 0.8, ease: "power3" }),
      depth: 11 + index * 7,
    }));

    const handleMove = (event) => {
      const bounds = stage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      setters.forEach((setter) => {
        setter.x(x * setter.depth);
        setter.y(y * setter.depth);
        setter.rotateY(x * 8);
        setter.rotateX(y * -7);
      });
    };
    const reset = () => {
      setters.forEach((setter) => {
        setter.x(0);
        setter.y(0);
        setter.rotateY(0);
        setter.rotateX(0);
      });
    };
    stage.addEventListener("pointermove", handleMove, { passive: true });
    stage.addEventListener("pointerleave", reset);
    return () => {
      stage.removeEventListener("pointermove", handleMove);
      stage.removeEventListener("pointerleave", reset);
    };
  }, [reducedMotion]);

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    setFormStatus("Opening your email application.");
    window.location.href = `mailto:johnlesterdematera0961@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="app" ref={appRef}>
      <div className="boot-screen" aria-hidden="true">
        <div className="boot-mark">JL</div>
        <p className="boot-label">
          {"SYSTEMS ONLINE".split("").map((character, index) => (
            <span key={`${character}-${index}`}>{character === " " ? "\u00a0" : character}</span>
          ))}
        </p>
        <div className="boot-line"><span className="boot-line-fill" /></div>
      </div>

      <div className="fixed-grain" aria-hidden="true" />

      <header className="site-nav">
        <a className="wordmark" href="#about" aria-label="John Lester home">
          <span>JL</span>
          <strong>John Lester</strong>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map(([label, id]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </nav>

        <a className="resume-link" href={assets.resumeUrl} target="_blank" rel="noreferrer">
          Resume <DownloadSimple aria-hidden="true" />
        </a>

        <button
          type="button"
          className="menu-button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
        </button>

        <nav
          id="mobile-navigation"
          className={`mobile-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Mobile navigation"
        >
          {navigation.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a href={assets.resumeUrl} target="_blank" rel="noreferrer">Resume</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="about">
          <img className="hero-backdrop" src={assets.systemsEngineImage} alt="" aria-hidden="true" />
          <div className="hero-scrim" aria-hidden="true" />
          <div className="systems-canvas-motion" aria-hidden="true">
            <Suspense fallback={null}>
              <SystemsCanvas reducedMotion={reducedMotion} />
            </Suspense>
          </div>

          <div className="hero-copy">
            <p className="hero-intro">Frontend developer and system builder</p>
            <h1>
              <span className="hero-line">
                {"I build systems".split(" ").map((word) => <span className="hero-word" key={word}>{word}</span>)}
              </span>
              <span className="hero-line hero-line-outline">
                {"people can use.".split(" ").map((word) => <span className="hero-word" key={word}>{word}</span>)}
              </span>
            </h1>
            <p className="hero-summary">
              Practical interfaces and connected products for schools, churches, and local communities.
            </p>
            <div className="hero-actions">
              <MagneticLink className="button button-primary" href="#projects">
                View work <ArrowRight aria-hidden="true" />
              </MagneticLink>
              <MagneticLink className="button button-ghost" href="#contact">Contact</MagneticLink>
            </div>
          </div>

          <div className="hero-stage" ref={heroStageRef} aria-label="Selected project previews">
            {featuredProjects.map((project, index) => (
              <div className={`hero-project-layer hero-layer-${index + 1}`} key={project.id} aria-hidden="true">
                <img src={project.image} alt="" />
              </div>
            ))}
            <div className="profile-chip">
              <img src={assets.profileImage} alt="John Lester Dematera" />
              <div><strong>John Lester Dematera</strong><span>Frontend developer</span></div>
            </div>
          </div>
        </section>

        <section className="metrics" aria-label="Portfolio statistics">
          <div><strong className="metric-value">{githubProfile.public_repos ?? 11}</strong><span>Public repositories</span></div>
          <div><strong className="metric-value">3</strong><span>Live applications</span></div>
          <div><strong className="metric-value">PLWM</strong><span>Current frontend role</span></div>
          <div><strong className="metric-value">4th yr</strong><span>Computer science</span></div>
        </section>

        <section className="projects" id="projects">
          <div className="section-intro projects-intro">
            <h2 className="split-heading">The work moves because the systems do.</h2>
            <p>Three deployed products lead the story. Each one opens into the real interface and the decisions behind it.</p>
          </div>

          <div className="project-stack-scenes">
            {featuredProjects.map((project) => (
              <ProjectScene project={project} key={project.id} onOpen={openProject} />
            ))}
          </div>

          <div className="secondary-projects">
            <h2 className="split-heading">More systems, different constraints.</h2>
            {secondaryProjects.map((project) => (
              <article className="secondary-project-row" key={project.id}>
                <div className="secondary-project-mark" aria-hidden="true">
                  {project.id === "plwm" ? <Buildings /> : project.id === "rmc" ? <GraduationCap /> : <MonitorPlay />}
                </div>
                <div>
                  <p>{project.type}</p>
                  <h3>{project.name}</h3>
                </div>
                <p>{project.description}</p>
                <div className="secondary-project-actions">
                  <button type="button" onClick={() => openProject(project, null)}>
                    Case study <CaretRight aria-hidden="true" />
                  </button>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`${project.name} repository`}>
                      <GithubLogo aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="skills" id="skills">
          <div className="section-intro">
            <h2 className="split-heading">A connected technical system.</h2>
            <p>Choose a capability group to reorganize the tools around the work they support.</p>
          </div>
          <SkillsConstellation />
        </section>

        <section className="experience" id="experience">
          <div className="experience-heading">
            <h2 className="split-heading">Design decisions that survive deployment.</h2>
          </div>
          <div className="experience-grid">
            <div className="experience-track" aria-hidden="true"><span className="experience-current" /></div>
            <div className="experience-roles">
              {experience.map((role) => (
                <article className="experience-role" key={`${role.title}-${role.period}`}>
                  <time>{role.period}</time>
                  <h3>{role.title}</h3>
                  <p className="experience-org">{role.organization}</p>
                  <p>{role.description}</p>
                  <ul>
                    {role.highlights.map((highlight) => (
                      <li key={highlight}><CheckCircle aria-hidden="true" />{highlight}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <a className="github-console" href={githubProfile.html_url} target="_blank" rel="noreferrer">
              <div><GithubLogo aria-hidden="true" /><strong>Lester0961</strong></div>
              <p>Public code, experiments, and project history.</p>
              <dl aria-live="polite">
                <div><dt>Repositories</dt><dd>{githubProfile.public_repos ?? 11}</dd></div>
                <div><dt>Followers</dt><dd>{githubProfile.followers ?? "Open profile"}</dd></div>
              </dl>
              <span>Explore GitHub <ArrowUpRight aria-hidden="true" /></span>
            </a>
          </div>
        </section>

        <section className="credentials" id="certifications">
          <div className="credential-media">
            <div className="certificate-scan" aria-hidden="true" />
            <img src={assets.certificateImage} alt="TESDA National Certificate II preview" loading="lazy" />
          </div>
          <div className="credential-copy">
            <Certificate aria-hidden="true" />
            <h2 className="split-heading">Certified foundations. Expanding systems knowledge.</h2>
            <h3>National Certificate II in Computer Systems Servicing</h3>
            <p>TESDA certification covering computer systems, networks, servers, diagnostics, and maintenance.</p>
            <button type="button" onClick={() => setCertificateOpen(true)}>View certificate</button>
            <div className="education-list">
              <article>
                <GraduationCap aria-hidden="true" />
                <div><strong>Bachelor of Computer Science</strong><span>Regis Marie College, expected October 2026</span></div>
              </article>
              <article>
                <TerminalWindow aria-hidden="true" />
                <div><strong>Bachelor of Computer Science</strong><span>STI College, finished 2025</span></div>
              </article>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-copy">
            <h2 className="split-heading">Let us build something useful.</h2>
            <a className="contact-email" href="mailto:johnlesterdematera0961@gmail.com">
              johnlesterdematera0961@gmail.com <ArrowUpRight aria-hidden="true" />
            </a>
            <p><MapPin aria-hidden="true" /> Parañaque City, Metro Manila, Philippines</p>
          </div>

          <div className="contact-orbit" aria-label="Social links">
            <div className="contact-orbit-core"><PaperPlaneTilt aria-hidden="true" /><span>Connect</span></div>
            {socialLinks.map((social, index) => {
              const Icon = socialIcons[social.id];
              return (
                <MagneticLink
                  className="contact-orbit-link"
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  key={social.id}
                  style={{ "--social-index": index }}
                  aria-label={social.label}
                >
                  <Icon aria-hidden="true" />
                  <span>{social.label}</span>
                </MagneticLink>
              );
            })}
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div>
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div>
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="contact-message-field">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows="4" required />
            </div>
            <button type="submit">Send message <EnvelopeSimple aria-hidden="true" /></button>
            <p className="form-status" aria-live="polite">{formStatus}</p>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div><span>JL</span><strong>John Lester Dematera</strong></div>
        <p>Frontend developer and system builder.</p>
        <p>© 2026 John Lester Dematera</p>
      </footer>

      <DetailDialog
        item={selectedProject}
        sourceElement={sourceElementRef.current}
        reducedMotion={reducedMotion}
        onClose={closeProject}
      />
      <CertificateDialog open={certificateOpen} onClose={closeCertificate} />
    </div>
  );
}
