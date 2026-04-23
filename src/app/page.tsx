import Link from "next/link";
import { Scene } from "@/components/Scene";
import { Reveal } from "@/components/Motion";
import { CopyEmailButton } from "@/components/CopyEmailButton";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Scene />

      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/25 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link
            href="#accueil"
            className="group inline-flex items-center gap-3"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.35)]" />
            <span className="text-sm tracking-[0.22em] text-white/80 group-hover:text-white">
              NICOLAS KADIR CIFTCI
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#parcours">
              Parcours
            </a>
            <a className="hover:text-white" href="#competences">
              Compétences
            </a>
            <a className="hover:text-white" href="#projets">
              Projets
            </a>
            <a className="hover:text-white" href="#contact">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-5">
        <section id="accueil" className="pb-14 pt-18 md:pb-24 md:pt-28">
          <Reveal>
            <div className="max-w-3xl">
              <h1 className="text-balance text-5xl font-semibold leading-[0.98] tracking-tight text-white md:text-6xl">
                Bienvenu sur le portfolio de{" "}
                <span className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-200 bg-clip-text text-transparent">
                  Nicolas Kadir CIFTCI
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-white/70 md:text-lg">
                En <span className="text-white">Bachelor 3 — Développeur Web, Applications & IA</span>,
                je conçois des interfaces et des produits orientés performance,
                motion et détail. Je recherche une alternance pour mon{" "}
                <span className="text-white">Mastère Data Engineering & IA (Efrei)</span>.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#projets"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
                >
                  Voir mes projets
                </a>
                <a
                  href="mailto:kadirciftci.pro@gmail.com"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/10"
                >
                  Me contacter
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="parcours" className="py-14 md:py-20">
          <Reveal>
            <h2 className="text-sm tracking-[0.28em] text-white/60">PARCOURS</h2>
            <p className="mt-5 text-2xl font-semibold tracking-tight text-white">
              Formation & expériences
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
                <p className="text-xs tracking-[0.28em] text-white/60">
                  FORMATION
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  BTS SIO — option SLAM
                </p>
                <p className="mt-1 text-xs tracking-[0.22em] text-white/50">
                  2023 — 2025
                </p>
                <p className="mt-2 text-white/70 leading-7">
                  Services Informatiques aux Organisations — développement
                  d’applications, bases de données, intégration web/mobile,
                  méthodes agiles.
                </p>
                <a
                  className="mt-4 inline-flex text-sm font-medium text-cyan-200 hover:text-cyan-100"
                  href="https://www.efrei.fr/formation/bts-sio/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Voir la formation BTS SIO →
                </a>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
                <p className="text-xs tracking-[0.28em] text-white/60">
                  FORMATION
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  Bachelor — Développeur Web & Applicatif (Efrei)
                </p>
                <p className="mt-1 text-xs tracking-[0.22em] text-white/50">
                  2025 — 2026
                </p>
                <p className="mt-2 text-white/70 leading-7">
                  Développement full stack, industrialisation, tests & qualité, et
                  maîtrise d’outils IA appliqués au dev.
                </p>
                <a
                  className="mt-4 inline-flex text-sm font-medium text-cyan-200 hover:text-cyan-100"
                  href="https://www.efrei.fr/formation/bachelor-developpeur-web-ia/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Voir la formation Efrei →
                </a>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
                <p className="text-xs tracking-[0.28em] text-white/60">
                  EXPÉRIENCE (ALTERNANCE)
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  Analyste Junior — Digital Data Performance
                </p>
                <p className="mt-1 text-xs tracking-[0.22em] text-white/50">
                  Oct. 2024 — Juin 2025
                </p>
                <p className="mt-2 text-white/70 leading-7">
                  Développement et personnalisation ServiceNow (workflows, scripts,
                  formulaires). Participation à des projets ITSM (incidents,
                  demandes, changements, CMDB). Création de dashboards Power BI
                  pour le suivi des KPIs et l’optimisation des processus.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "ServiceNow",
                    "Power BI",
                    "ITSM / CMDB",
                    "JavaScript",
                    "Scrum",
                  ].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
                <p className="text-xs tracking-[0.28em] text-white/60">
                  EXPÉRIENCE (STAGE)
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  Développeur Web — Les Mousquetaires
                </p>
                <p className="mt-1 text-xs tracking-[0.22em] text-white/50">
                  Mai 2024 — Juin 2024
                </p>
                <p className="mt-2 text-white/70 leading-7">
                  Analyse des besoins métiers, maquettage et développement front
                  (HTML/CSS/JavaScript). Utilisation de l’API SAP pour extraire et
                  exploiter les données, et collaboration avec des profils métier
                  (contrôle de gestion).
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["HTML", "CSS", "JavaScript", "SAP"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <a
                className="inline-flex text-sm font-medium text-cyan-200 hover:text-cyan-100"
                href="https://www.efrei.fr/formation/mastere-data-engineering-ia/"
                target="_blank"
                rel="noreferrer"
              >
                Mastère Data Engineering & IA (Efrei) →
              </a>
            </div>
          </Reveal>
        </section>

        <section id="competences" className="py-14 md:py-20">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <h2 className="text-sm tracking-[0.28em] text-white/60">
                  COMPÉTENCES
                </h2>
                <p className="mt-5 text-2xl font-semibold tracking-tight text-white">
                  Stack web & data.
                </p>
                <p className="mt-4 text-white/70 leading-7">
                  Mon focus: construire des expériences web modernes, et monter en
                  puissance sur la data (pipelines, modélisation, visualisation),
                  avec une attention particulière au détail et à l’UX.
                </p>
              </div>

              <div className="md:col-span-7">
                <div className="rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs tracking-[0.28em] text-white/60">
                        DEV
                      </p>
                      <div className="mt-3 space-y-3 text-white/80">
                        <div>
                          <p className="text-xs tracking-[0.22em] text-white/55">
                            FRONT
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {["React", "Next.js", "TypeScript", "Tailwind CSS"].map(
                              (t) => (
                                <span
                                  key={t}
                                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/85"
                                >
                                  {t}
                                </span>
                              )
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs tracking-[0.22em] text-white/55">
                            BACK / DB
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {[
                              "Node.js",
                              "API REST",
                              "PostgreSQL",
                              "MySQL",
                              "Prisma",
                              "Supabase",
                            ].map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/85"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs tracking-[0.22em] text-white/55">
                            DATA
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {["Python", "pandas", "ETL (notions)", "Power BI"].map(
                              (t) => (
                                <span
                                  key={t}
                                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/85"
                                >
                                  {t}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.28em] text-white/60">
                        OUTILS
                      </p>
                      <div className="mt-3 space-y-3 text-white/80">
                        <div>
                          <p className="text-xs tracking-[0.22em] text-white/55">
                            ENV / TOOLING
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {["Git/GitHub", "Docker", "Linux", "VS Code"].map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/85"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs tracking-[0.22em] text-white/55">
                            QUALITÉ
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {["ESLint", "Tests unitaires"].map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/85"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs tracking-[0.22em] text-white/55">
                            MÉTHODES
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {["Agile", "Scrum", "Kanban"].map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/85"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="projets" className="py-14 md:py-20">
          <Reveal>
            <h2 className="text-sm tracking-[0.28em] text-white/60">PROJETS</h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "CyberHack",
                  date: "11/09/2025",
                  desc: "Jeu de hacking interactif (UI cyberpunk, puzzles, mini-jeu).",
                  tech: "HTML · CSS · JavaScript",
                  demo: "https://cyberhack-game-three.vercel.app/",
                  code: "https://github.com/Nicolas-Kadir-Efrei/cyberhack-game",
                },
                {
                  title: "StreamFlix",
                  date: "2024",
                  desc: "Interface de streaming (navigation, pages Films/Séries/Anime, liste).",
                  tech: "Web app · UI",
                  demo: "https://stream-flix-alpha.vercel.app/",
                  code: "https://vercel.com/kadirs-projects-520eff88/stream-flix",
                },
                {
                  title: "Meteo",
                  date: "23/09/2024",
                  desc: "App météo avec recherche et affichage dynamique.",
                  tech: "Next.js · JavaScript",
                  demo: "https://nicolas-kadir-ciftci.vercel.app/",
                  code: "https://github.com/Nicolas-Kadir-Efrei/Meteonv",
                },
                {
                  title: "Plateforme de tournois (BTS E6)",
                  date: "24/06/2025",
                  desc: "Création/gestion de tournois. Projet en cours: non fini, bugs à corriger.",
                  tech: "Next.js · Prisma",
                  demo: "https://projet-bts-e6-fi5q.vercel.app/",
                  code: "https://github.com/Nicolas-Kadir-Efrei/Projet-BTS-E6/tree/main/client-leger",
                },
                {
                  title: "VSG PNEUS",
                  date: "2024",
                  desc: "Site vitrine avec services, tarifs, avis et prise de contact.",
                  tech: "Web · UI",
                  demo: "https://vsg-pneu-kadir.vercel.app/",
                },
              ].map((p) => (
                <article
                  key={p.title}
                  className="group rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur-xl transition hover:border-white/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-lg font-semibold text-white">{p.title}</p>
                    <p className="shrink-0 text-xs tracking-[0.22em] text-white/45">
                      {p.date}
                    </p>
                  </div>

                  <p className="mt-2 text-white/70 leading-7">{p.desc}</p>
                  <p className="mt-4 text-xs tracking-[0.22em] text-white/50">
                    {p.tech}
                  </p>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-60" />
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition hover:bg-white/90"
                    >
                      Ouvrir
                    </a>
                    {"code" in p ? (
                      <a
                        href={p.code}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur transition hover:bg-white/10"
                      >
                        Voir le repo →
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="contact" className="py-16 md:py-24">
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-black/25 p-8 backdrop-blur-xl md:p-10">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Contacter moi par mail / Linkedin
              </h2>
              <p className="mt-3 text-white/70 leading-7">
                Mail:{" "}
                <a
                  className="text-cyan-200 hover:text-cyan-100"
                  href="mailto:kadirciftci.pro@gmail.com"
                >
                  kadirciftci.pro@gmail.com
                </a>
              </p>
              <p className="mt-2 text-white/70 leading-7">
                Linkedin:{" "}
                <a
                  className="text-cyan-200 hover:text-cyan-100"
                  href="https://www.linkedin.com/in/nicolas-kadir-ciftci/"
                  target="_blank"
                  rel="noreferrer"
                >
                  @nicolas-kadir-ciftci
                </a>
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CopyEmailButton email="kadirciftci.pro@gmail.com" />
                <a
                  href="https://www.linkedin.com/in/nicolas-kadir-ciftci/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/10"
                >
                  Ouvrir Linkedin →
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <footer className="pb-10 text-xs text-white/40">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} — Nicolas Kadir</p>
            <p className="text-white/35">
              Expérimental, mais accessible: contrastes, focus, perf.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
