import React, { useMemo, useState } from "react";

/* ====== Données ====== */
const portfolio = [
  {
    title: "Cedric Nuozzi vs SL Benfica – Highlights",
    type: "Sport",
    clients: ["Cedric Nuozzi", "FC Alverca", "SL Benfica"],
    production: ["Jonathan Weyssow"],
    year: 2025,
    date: "12 mars 2025",
    location: "Lisbonne, Portugal",
    cover: "media/Cover_Cedric.jpg",
    videoMp4: "media/Cedric_vs_Benfica.mp4",
    links: {
      instagram: "https://www.instagram.com/p/DOGsNeHCJhI/",
    },
  },
  {
    title: "Pedro Pinto vs FC Meux – Highlights",
    type: "Sport",
    clients: ["Pedro Pinto", " FC Meux", "Royale Union Saint-Gilloise"],
    production: ["Jonathan Weyssow"],
    year: 2025,
    date: "12 mars 2025",
    location: "Bruxelles, Belgique",
    cover: "media/Cover_Pedro.jpg",
    videoMp4: "media/Pinto_vs_Meux.mp4",
  },
  {
    title: "Bilal Bafdili vs KAA Gent – Highlights",
    type: "Sport",
    clients: ["Bilal Bafdili", "KV Mechelen", "KAA Gent"],
    production: ["Jonathan Weyssow"],
    year: 2025,
    date: "12 mars 2025",
    location: "Mechelen, Belgique",
    cover: "media/Cover_Bilal.jpg",
    videoMp4: "media/Bilal_vs_Gand.mp4",
  },
  {
    title: "Zaid Bafdili signature SCP",
    type: "Sport",
    clients: ["Zaid Bafdili", "Sporting Lisbonne"],
    production: ["Jonathan Weyssow"],
    year: 2025,
    date: "12 mars 2025",
    location: "Lisbonne, Portugal",
    cover: "media/Zaid_Signature.jpg",
    videoMp4: "media/Zaid_signature.mp4",
  },
  {
    title: "Zaid Bafdili Training",
    type: "Sport",
    clients: ["Zaid Bafdili", "Sporting Lisbonne"],
    production: ["Jonathan Weyssow"],
    year: 2025,
    date: "12 mars 2025",
    location: "Bruxelles, Belgique",
    cover: "media/ZaidTraining.jpg",
    videoMp4: "media/Zaid_Training.mp4",
  },
  {
    title: "Dalil Bafdili Training",
    type: "Sport",
    clients: ["Dalil Bafdili"],
    production: ["Jonathan Weyssow"],
    year: 2025,
    date: "12 mars 2025",
    location: "Bruxelles, Belgique",
    cover: "media/DalilTraining.jpg",
    videoMp4: "media/Dalil_entrainement.mp4",
  },
  {
    title: "Saijo - Patrick Bruel (Clip officiel)",
    type: "Musique",
    clients: ["Saijo"],
    production: ["Jonathan Weyssow, Saijo"],
    year: 2025,
    date: "12 mars 2025",
    location: "Bruxelles, Belgique",
    cover: "media/saijoPatrick.jpg",
    videoMp4: "media/Saijo_patrick_bruel.mp4",
  },
];

const clients = ["Saijo", "Bilal Bafdili", "Zaid Bafdili", "Anas Tahiri", "Cedric"];

/* ====== Icônes ====== */
const IconPlay = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M8 5v14l11-7-11-7Z" />
  </svg>
);
const IconMail = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

/* ====== UI Utils ====== */
const Chip = ({ active, children, ...props }) => (
  <button
    {...props}
    className={`uppercase tracking-wider text-[11px] px-3 py-1 border rounded-full transition ${active ? "bg-black text-white border-black" : "hover:bg-neutral-800 border-neutral-800"
      }`}
  >
    {children}
  </button>
);
const Divider = () => <hr className="border-neutral-800" />;

/* ====== Modale Projet (avec taille confortable) ====== */
const Modal = ({ open, onClose, project }) => {
  if (!open || !project) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">

      <div className="absolute inset-0 bg-black/70 opacity-0 animate-fadeIn" 
      onClick={onClose} 
      />

      <div className="absolute inset-0 p-4 sm:p-6 flex items-start sm:items-center justify-center overflow-auto">
        <div className="w-[92vw] max-w-xl sm:max-w-2xl bg-neutral-900 text-neutral-100 rounded-2xl border border-neutral-800 shadow-xl">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-800">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            
            <button
              className="uppercase tracking-wider text-[11px] px-3 py-1 border rounded-full hover:bg-neutral-800"
              onClick={onClose}
            >
              
              Close
            </button>
          </div>

          {/* Contenu : grille 7/5 */}
          <div className="p-4 sm:p-6 grid gap-6 md:grid-cols-12">
            {/* Colonne gauche : vidéo/image */}
            <div className="md:col-span-7">
              <div className="w-full overflow-hidden rounded-xl bg-black max-h-[70vh]">
                {project.videoMp4 ? (
                  <video
                    className="block w-full h-auto max-h-[70vh] object-contain"
                    poster={project.cover}
                    controls
                    playsInline
                    preload="metadata"
                  >
                    {project.videoWebm && <source src={project.videoWebm} type="video/webm" />}
                    <source src={project.videoMp4} type="video/mp4" />
                    Votre navigateur ne supporte pas la vidéo HTML5.
                  </video>
                ) : (
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="block w-full h-auto max-h-[70vh] object-contain"
                  />
                )}
              </div>
            </div>

            {/* Colonne droite : détails */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div>
                <h4 className="text-lg font-semibold">{project.title}</h4>
                <div className="text-xs uppercase tracking-wider text-neutral-400">
                  {project.type} • {project.year}
                </div>
              </div>

              <div className="grid gap-3 text-sm">
                <div className="flex gap-3">
                  <span className="shrink-0 w-20 text-neutral-500 uppercase tracking-wider text-xs">Date</span>
                  <span>{project.date || "—"}</span>
                </div>
                <div className="flex gap-3">
                  <span className="shrink-0 w-20 text-neutral-500 uppercase tracking-wider text-xs">Lieu</span>
                  <span>{project.location || "—"}</span>
                </div>
                <div className="flex gap-3">
                  <span className="shrink-0 w-20 text-neutral-500 uppercase tracking-wider text-xs">Production </span>
                  <span>
                    {(project.production && Array.isArray(project.production) && project.production.length > 0)
                      ? project.production.join(", ")
                      : (project.production && project.clients.length ? project.clients.join(", ") : "—")}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="shrink-0 w-20 text-neutral-500 uppercase tracking-wider text-xs">Clients</span>
                  <span>
                    {(project.clients && Array.isArray(project.team) && project.clients.length > 0)
                      ? project.clients.join(", ")
                      : (project.clients && project.clients.length ? project.clients.join(", ") : "—")}
                  </span>
                </div>
              </div>

              {project.credits && (
                <div className="pt-2 border-t border-neutral-800 text-sm text-neutral-300">
                  {project.credits}
                </div>
              )}

              {/* === Boutons réseaux en bas à droite === */}
              <div className="mt-auto flex justify-end gap-2 pt-4">
                {project.links?.instagram && (
                  <a
                    href={project.links.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-600 hover:border-white text-sm"
                  >
                    <img src="/media/instagram.png" alt="Instagram" className="w-4 h-4" />
                  </a>
                )}
                {project.links?.youtube && (
                  <a
                    href={project.links.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-600 hover:border-red-500 text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M23.5 6.2s-.2-1.7-.9-2.4c-.8-.9-1.7-.9-2.1-1C16.7 2.5 12 2.5 12 2.5h0s-4.7 0-8.5.3c-.5.1-1.4.1-2.1 1-.7.7-.9 2.4-.9 2.4S0 8.1 0 10v1.9c0 1.9.2 3.8.2 3.8s.2 1.7.9 2.4c.8.9 1.8.9 2.2 1 1.6.2 6.7.3 6.7.3s4.7 0 8.5-.3c.5-.1 1.4-.1 2.1-1 .7-.7.9-2.4.9-2.4s.2-1.9.2-3.8V10c0-1.9-.2-3.8-.2-3.8zM9.7 13.8V8.9l5.7 2.5-5.7 2.4z" />
                    </svg>
                    YouTube
                  </a>
                )}
              </div>


            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

/* ====== Page ====== */
export default function CameramanMonteurSite() {
  // Menu/états
  const [menuOpen, setMenuOpen] = useState(false);

  // Filtres & recherche
  const [typeFilter, setTypeFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [clientFilter, setClientFilter] = useState("All");
  const [q, setQ] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuClientsOpen, setMenuClientsOpen] = useState(false);
  const [menuYearsOpen, setMenuYearsOpen] = useState(false);

  // Données dérivées
  const years = useMemo(
    () => Array.from(new Set(portfolio.map((p) => p.year))).sort((a, b) => b - a),
    []
  );
  const normalizeClient = (s) =>
    (s || "")
      .normalize("NFKC")
      .replace(/\s+/g, " ")
      .trim();

  const uniqueClients = useMemo(() => {
    const set = new Set();
    portfolio.forEach((p) => (p.clients || []).forEach((c) => set.add(normalizeClient(c))));
    // tri FR insensible à la casse/accents
    return Array.from(set).sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }));
  }, []);


  const items = useMemo(() => {
    const qnorm = q.trim().toLowerCase();
    return portfolio.filter((p) => {
      const okType = typeFilter === "All" || p.type === typeFilter;
      const okYear = yearFilter === "All" || p.year === yearFilter;
      const okClient = clientFilter === "All" || (p.clients || []).includes(clientFilter);
      const okSearch =
        !qnorm ||
        p.title.toLowerCase().includes(qnorm) ||
        (p.credits || "").toLowerCase().includes(qnorm) ||
        (p.type || "").toLowerCase().includes(qnorm) ||
        String(p.year).includes(qnorm) ||
        (p.clients || []).some((c) => c.toLowerCase().includes(qnorm));
      return okType && okYear && okClient && okSearch;
    });
  }, [typeFilter, yearFilter, clientFilter, q]);

  const [active, setActive] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const subject = form.get("subject") || "Demande de devis";
    const message = form.get("message") || "";
    const mailto = `mailto:jonathan.weyssow@gmail.com?subject=${encodeURIComponent(
      `[Site] ${subject}`
    )}&body=${encodeURIComponent(`Bonjour,

Nom: ${name}
Email: ${email}

Message:
${message}

— envoyé depuis le site.`)}`;
    window.location.href = mailto;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <style>{`
      .hide-scrollbar { scrollbar-width: none; }
      .hide-scrollbar::-webkit-scrollbar { display: none; }
    `}</style>
      {/* ===== Header style NKF ===== */}
      <header className="sticky top-0 z-50 bg-neutral-950/85 backdrop-blur border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <img src="/media/logo.jpg" alt="Logo GZProduction" className="h-10 w-auto" />
            <div className="leading-tight">
              <div className="font-semibold tracking-wider uppercase text-xs">GzProduction</div>
              <div className="text-[11px] text-neutral-500 tracking-wide uppercase">Sport & Musique</div>
            </div>
          </a>

          {/* Nav desktop */}
          <nav className="hidden md:flex flex-1 items-center justify-between text-xs uppercase tracking-wider ml-8">

            {/* === BLOC GAUCHE : filtres collés au logo === */}
            <div className="flex items-center gap-5">
              {/* Collaborations (dropdown) */}
              <div className="relative">
                <button
                  onClick={() => { setMenuClientsOpen(v => !v); setMenuYearsOpen(false); }}
                  className={`pb-1 border-b ${clientFilter !== "All" ? "border-white" : "border-transparent"} hover:opacity-70 flex items-center gap-1 font-semibold tracking-wider uppercase text-xs`}
                >
                  Collaborations <span className="text-[10px]">▾</span>
                </button>
                {menuClientsOpen && (
                  <div className="absolute left-0 mt-2 w-44 rounded-md border border-neutral-800 bg-neutral-900 shadow-lg z-50">
                    <button
                      onClick={() => { setClientFilter("All"); setMenuClientsOpen(false); }}
                      className="w-full text-left px-3 py-2 hover:bg-neutral-800"
                    >
                      Tous
                    </button>
                    {uniqueClients.map(c => (
                      <button
                        key={c}
                        onClick={() => { setClientFilter(c); setTypeFilter("All"); setMenuClientsOpen(false); }}
                        className="w-full text-left px-3 py-2 hover:bg-neutral-800"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span className="text-neutral-600">/</span>

              {/* Année (dropdown) */}
              <div className="relative">
                <button
                  onClick={() => { setMenuYearsOpen(v => !v); setMenuClientsOpen(false); }}
                  className={`pb-1 border-b ${yearFilter !== "All" ? "border-white" : "border-transparent"} hover:opacity-70 flex items-center gap-1 font-semibold tracking-wider uppercase text-xs`}
                >
                  Année <span className="text-[10px]">▾</span>
                </button>
                {menuYearsOpen && (
                  <div className="absolute left-0 mt-2 w-36 rounded-md border border-neutral-800 bg-neutral-900 shadow-lg z-50">
                    <button
                      onClick={() => { setYearFilter("All"); setMenuYearsOpen(false); }}
                      className="w-full text-left px-3 py-2 hover:bg-neutral-800"
                    >
                      Toutes les années
                    </button>
                    {years.map(y => (
                      <button
                        key={y}
                        onClick={() => { setYearFilter(y); setMenuYearsOpen(false); }}
                        className="w-full text-left px-3 py-2 hover:bg-neutral-800"
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span className="text-neutral-600">/</span>

              {/* About + Recherche */}
              <div className="relative w-64 md:w-80">
                {/* Icône loupe */}
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
                  </svg>
                </span>

                {/* Champ relié à l'état q */}
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search posters..."
                  autoComplete="off"
                  className="w-full pl-10 pr-9 py-2 border border-neutral-700 rounded-md bg-neutral-900 text-sm text-neutral-100 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-white"
                />

                {/* Bouton effacer (optionnel) */}
                {q && (
                  <button
                    type="button"
                    onClick={() => setQ("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200"
                    aria-label="Effacer"
                    title="Effacer"
                  >
                    ×
                  </button>
                )}
              </div>


            </div>

            {/* === BLOC MILIEU : réseaux === */}
            <div className="flex items-center gap-3">
              {/* Instagram */}

            </div>

            {/* === BLOC DROITE : Réseaux + Contact === */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/gzproduction.be/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded border border-neutral-600 hover:border-white"
              >
                <img src="/media/instagram.png" alt="Instagram" className="w-6 h-6" />
              </a>

              {/* Contact */}
              <a
                href="#contact"
                className="inline-flex items-center border border-neutral-200 rounded-full px-3 py-1 hover:bg-neutral-100 hover:text-black text-sm"
              >
                Contact
              </a>
            </div>
          </nav>

          {/* Burger mobile */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            <span className="block w-6 h-0.5 bg-white mb-1" />
            <span className="block w-6 h-0.5 bg-white mb-1" />
            <span className="block w-6 h-0.5 bg-white" />
          </button>
        </div>

        {/* Menu mobile simple */}
        {menuOpen && (
          <div className="md:hidden border-t border-neutral-800 bg-neutral-900/95">
            <div className="px-4 py-3 grid gap-2 text-sm">
              <button
                onClick={() => {
                  setTypeFilter("All");
                  setClientFilter("All");
                  setYearFilter("All");
                  setMenuOpen(false);
                }}
              >
                All
              </button>
              <button
                onClick={() => {
                  setTypeFilter("Sport");
                  setClientFilter("All");
                  setMenuOpen(false);
                }}
              >
                Sport
              </button>
              <button
                onClick={() => {
                  setTypeFilter("Musique");
                  setClientFilter("All");
                  setMenuOpen(false);
                }}
              >
                Musique
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setSearchOpen((v) => !v);
                }}
              >
                Recherche
              </button>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-1 inline-flex items-center justify-center border rounded-full px-3 py-2"
              >
                Devis
              </a>
            </div>
          </div>
        )}
      </header>



      {/* ===== Portfolio (formats natifs, pas de stretch) ===== */}
      <section id="portfolio" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Ruban SPORT */}
          <div className="flex items-center gap-4 mb-3">
            <h2 className="text-xl font-semibold uppercase tracking-wider">Sport</h2>
            <div className="flex-1 border-t border-neutral-700"></div>
          </div>
          <div className="-mx-4 px-4"
            style={{ backgroundImage: "url('/media/exemple.jpg')" }}>
            <div className="hide-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-4">
              {items.filter(p => p.type === "Sport").map((p) => (
                <button
                  key={p.title}
                  onClick={() => setActive(p)}
                  className="group relative overflow-hidden rounded-xl border bg-neutral-900 text-left shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 lg:basis-1/6 xl:basis-1/8 snap-start"
                  aria-label={`Ouvrir ${p.title}`}
                >
                  <div className="relative w-full overflow-hidden rounded-xl bg-black">
                    {p.videoMp4 ? (
                      <video
                        className="block w-full h-auto object-contain transition duration-300"
                        poster={p.cover}
                        muted
                        playsInline
                        loop
                        preload="metadata"
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                      >
                        {p.videoWebm && <source src={p.videoWebm} type="video/webm" />}
                        <source src={p.videoMp4} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={p.cover}
                        alt={p.title}
                        className="block w-full h-auto object-contain transition duration-300"
                      />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-80" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="text-[11px] uppercase tracking-wider opacity-80">
                      {p.type} • {p.year}
                    </div>
                    <h3 className="mt-1 text-sm font-semibold">{p.title}</h3>
                  </div>
                </button>
              ))}
            </div>
          </div>


          <div className="flex items-center gap-4 mt-10 mb-3">
            <h2 className="text-xl font-semibold uppercase tracking-wider">Musique</h2>
            <div className="flex-1 border-t border-neutral-700"></div>
          </div>
          <div className="-mx-4 px-4">
            <div className="hide-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-4">
              {items.filter(p => p.type === "Musique").map((p) => (
                <button
                  key={p.title}
                  onClick={() => setActive(p)}
                  className="group relative overflow-hidden rounded-xl border bg-neutral-900 text-left shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 snap-start"
                  aria-label={`Ouvrir ${p.title}`}
                >
                  <div className="relative w-full overflow-hidden rounded-xl bg-black">
                    {p.videoMp4 ? (
                      <video
                        className="block w-full h-auto object-contain transition duration-300"
                        poster={p.cover}
                        muted
                        playsInline
                        loop
                        preload="metadata"
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                      >
                        {p.videoWebm && <source src={p.videoWebm} type="video/webm" />}
                        <source src={p.videoMp4} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={p.cover}
                        alt={p.title}
                        className="block w-full h-auto object-contain transition duration-300"
                      />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-80" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="text-[11px] uppercase tracking-wider opacity-80">
                      {p.type} • {p.year}
                    </div>
                    <h3 className="mt-1 text-base font-semibold">{p.title}</h3>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>




      {/* ===== About + Contact ===== */}
      <section id="about" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-semibold uppercase tracking-wider">À propos</h2>
            <p className="mt-4 text-neutral-300 max-w-2xl">
              Je suis <span className="font-medium">Jonathan Weyssow</span>, cameraman & monteur indépendant basé
              Bruxelles. Mon approche: préparation claire, tournage léger, montage rythmé et déclinaisons sociales rapides.
            </p>
          </div>
          <div className="lg:col-span-5">
            <h3 className="text-xs uppercase tracking-wider text-neutral-500">Contact</h3>
            <form onSubmit={handleSubmit} className="mt-3 grid gap-3">
              <input
                name="name"
                required
                placeholder="Nom"
                className="border border-neutral-700 rounded px-3 py-2 bg-transparent text-neutral-100 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-white"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="border border-neutral-700 rounded px-3 py-2 bg-transparent text-neutral-100 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-white"
              />
              <input
                name="subject"
                placeholder="Sujet (clip, aftermovie, highlights...)"
                className="border border-neutral-700 rounded px-3 py-2 bg-transparent text-neutral-100 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-white"
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Dates, lieu, livrables attendus, budget..."
                className="border border-neutral-700 rounded px-3 py-2 bg-transparent text-neutral-100 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-white"
              />
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 border border-neutral-800 rounded-full px-4 py-2 text-sm uppercase tracking-wider hover:bg-neutral-800"
                >
                  Envoyer
                </button>
                <a href="mailto:jonathan.weyssow@gmail.com" className="text-sm inline-flex items-center gap-2 hover:underline">
                  <IconMail className="w-4 h-4" /> jonathan.weyssow@gmail.com
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs uppercase tracking-wider text-neutral-500">
            © {new Date().getFullYear()} RushMotion
          </div>
          <div className="text-xs text-neutral-500">
            Site par vous • <a className="underline" href="#">Mentions</a>
          </div>
        </div>
      </footer>

      {/* Modale projet */}
      <Modal open={!!active} onClose={() => setActive(null)} project={active} />
    </div>
  );
}
