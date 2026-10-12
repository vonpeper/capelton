"use client";

import React, { useState, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Radio,
  CheckCircle2,
  Maximize2
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import FadeIn from "@/components/FadeIn";
import SciFiHeading from "@/components/SciFiHeading";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface ReelItem {
  id: number;
  channel: string;
  code: string;
  title: string;
  titleEn: string;
  tagline: string;
  taglineEn: string;
  quote: string;
  quoteEn: string;
  specs: string[];
  specsEn: string[];
  videoSrc: string;
  posterSrc: string;
  instagramUrl: string;
  duration: string;
}

const REELS_DATA: ReelItem[] = [
  {
    id: 1,
    channel: "Planta de Fabricación",
    code: "ESTRUCTURA & MATERIALES",
    title: "Ingeniería de Fabricación y Rigidez",
    titleEn: "Manufacturing & Structural Rigidity",
    tagline: "Lo barato se nota. Y se termina pagando.",
    taglineEn: "Cheap materials show. Quality pays off.",
    quote:
      "Sí, hay opciones más baratas. ¿La pregunta? Qué sacrificas en piso, muros y rigidez. Fabricamos unidades hechas para durar y responder a tu empresa.",
    quoteEn:
      "Yes, there are cheaper alternatives. The question is what gets sacrificed in floors, walls, and rigidity. We build workspaces made to last.",
    specs: ["Acero Reforzado", "Piso SPC de Alto Tráfico", "Muros Aislados"],
    specsEn: ["Reinforced Steel", "High-Traffic SPC Floor", "Insulated Walls"],
    videoSrc: "/videos/reel-1.mp4",
    posterSrc: "/videos/reel-1.jpg",
    instagramUrl: "https://www.instagram.com/p/DdmVHWHBuyK/",
    duration: "0:41",
  },
  {
    id: 2,
    channel: "Filosofía Capelton",
    code: "CALIDAD & ESTÁNDARES",
    title: "Construir y Servir Mejor",
    titleEn: "Build & Serve Better",
    tagline: "Crecer no es llegar. Es seguir mejorando.",
    taglineEn: "Growing is not the finish line. It is continuous improvement.",
    quote:
      "La calidad es el punto de partida. La confianza se gana escuchando, cumpliendo y respondiendo con estándares más altos en cada entrega.",
    quoteEn:
      "Quality is our baseline. Trust is earned by listening, delivering, and setting higher manufacturing standards with every deployment.",
    specs: ["Procesos Homologados", "Acabados de Uso Rudo", "Supervisión en Planta"],
    specsEn: ["Standardized Process", "Heavy-Duty Finishes", "Plant QA Oversight"],
    videoSrc: "/videos/reel-2.mp4",
    posterSrc: "/videos/reel-2.jpg",
    instagramUrl: "https://www.instagram.com/p/Dd4Oc68xq9e/",
    duration: "0:38",
  },
  {
    id: 3,
    channel: "Maniobra y Entrega",
    code: "ENTREGA EN SITIO",
    title: "Maniobra de Módulo de 14M",
    titleEn: "14M Workspace Delivery & Rigging",
    tagline: "14m de largo. Más de 5 toneladas. Maniobra milimétrica.",
    taglineEn: "14m length. Over 5 tons. Precision rigging.",
    quote:
      "Dos privados ejecutivos, medio baño y configuración a la medida para proyectos de gran escala. Maniobra y traslado completados con éxito.",
    quoteEn:
      "Dual executive offices, half bath, and custom floorplan for large-scale projects. Heavy rigging and delivery successfully accomplished.",
    specs: ["14 Metros de Largo", "+5 Toneladas", "Maniobra Segura con Grúa"],
    specsEn: ["14 Meters Length", "+5 Tons Payload", "Safe Crane Rigging"],
    videoSrc: "/videos/reel-3.mp4",
    posterSrc: "/videos/reel-3.jpg",
    instagramUrl: "https://www.instagram.com/p/DcwQZTRBlhu/",
    duration: "0:35",
  },
];

export default function InstagramCommsConsole() {
  const { t } = useLanguage();
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progresses, setProgresses] = useState<{ [key: number]: number }>({});
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const handleTogglePlay = (id: number) => {
    const currentVideo = videoRefs.current[id];
    if (!currentVideo) return;

    if (playingId === id) {
      currentVideo.pause();
      setPlayingId(null);
    } else {
      // Pause any previously playing video
      if (playingId !== null && videoRefs.current[playingId]) {
        videoRefs.current[playingId]?.pause();
      }
      currentVideo.play().then(() => {
        setPlayingId(id);
      }).catch(() => {});
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    Object.values(videoRefs.current).forEach((v) => {
      if (v) v.muted = newMuted;
    });
  };

  const handleTimeUpdate = (id: number) => {
    const video = videoRefs.current[id];
    if (!video || !video.duration) return;
    const progress = (video.currentTime / video.duration) * 100;
    setProgresses((prev) => ({ ...prev, [id]: progress }));
  };

  const handleFullscreen = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen().catch(() => {});
    }
  };

  return (
    <section
      id="en-accion"
      className="relative py-20 sm:py-24 bg-white text-[#1d1d1f] overflow-hidden border-t border-black/6"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimalist Light Header */}
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            {/* Project Stories Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] border border-capelton-green/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-capelton-green inline-block" />
              <span className="text-[11px] font-semibold tracking-wider text-capelton-green uppercase">
                {t("VIDEOS DE NUESTROS PROYECTOS", "PROJECT STORIES & VIDEOS")}
              </span>
            </div>

            <SciFiHeading
              text={t("Espacios móviles en fabricación y campo.", "Mobile Workspaces in Production & Field.")}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-3"
              showLaser={false}
              showHudTag={false}
              duration={650}
            />

            <p className="text-sm sm:text-base text-[#6e6e73] font-normal leading-relaxed">
              {t(
                "Conoce cómo construimos en planta, los estándares de materiales y las maniobras de entrega en sitio.",
                "Take a look at our in-house manufacturing, material standards, and real jobsite delivery maneuvers."
              )}
            </p>
          </div>
        </FadeIn>

        {/* 3 Standalone Reel Cards Grid (Direct Playback right in place) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {REELS_DATA.map((reel, idx) => {
            const isThisPlaying = playingId === reel.id;
            const progress = progresses[reel.id] || 0;

            return (
              <FadeIn key={reel.id} direction="up" delay={idx * 0.1}>
                <div className="group flex flex-col h-full bg-[#fbfbfd] rounded-2xl sm:rounded-3xl border border-black/8 hover:border-capelton-green/40 transition-all duration-300 p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
                  {/* Top Card Badge Row */}
                  <div className="flex items-center justify-between text-xs mb-3 px-1 text-neutral-500">
                    <span className="font-semibold text-capelton-green text-xs">
                      {reel.channel} · {t(reel.code, reel.code)}
                    </span>
                    <span className="text-[11px] text-[#86868b]">{reel.duration}</span>
                  </div>

                  {/* 9:16 Video Player Container */}
                  <div
                    onClick={() => handleTogglePlay(reel.id)}
                    className="relative w-full aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden bg-black cursor-pointer shadow-sm select-none"
                  >
                    <video
                      ref={(el) => {
                        videoRefs.current[reel.id] = el;
                      }}
                      src={reel.videoSrc}
                      poster={reel.posterSrc}
                      playsInline
                      loop
                      muted={isMuted}
                      onTimeUpdate={() => handleTimeUpdate(reel.id)}
                      className="w-full h-full object-cover"
                    />

                    {/* Top Right Controls (Mute / Fullscreen) */}
                    <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5">
                      <button
                        onClick={handleToggleMute}
                        title={isMuted ? "Activar audio" : "Silenciar"}
                        className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-capelton-green" />}
                      </button>
                      <button
                        onClick={(e) => handleFullscreen(e, reel.id)}
                        title="Pantalla completa"
                        className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white transition-colors hidden sm:block"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Center Play / Pause Icon Button */}
                    <div
                      className={`absolute inset-0 z-10 flex items-center justify-center bg-black/25 transition-opacity duration-200 ${
                        isThisPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                      }`}
                    >
                      <div className="w-14 h-14 rounded-full bg-white/95 text-black flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                        {isThisPlaying ? (
                          <Pause className="w-6 h-6 text-black fill-black" />
                        ) : (
                          <Play className="w-6 h-6 text-black fill-black ml-0.5" />
                        )}
                      </div>
                    </div>

                    {/* Bottom Progress Line */}
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-white/30 z-10">
                      <div
                        className="h-full bg-capelton-green transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Card Content underneath Video */}
                  <div className="pt-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#1d1d1f] mb-1.5 leading-snug">
                        {t(reel.title, reel.titleEn)}
                      </h3>
                      <p className="text-xs font-mono text-capelton-green mb-2">
                        &gt; {t(reel.tagline, reel.taglineEn)}
                      </p>
                      <p className="text-xs text-[#515154] leading-relaxed line-clamp-3 mb-3">
                        {t(reel.quote, reel.quoteEn)}
                      </p>
                    </div>

                    {/* Tags & Instagram Link */}
                    <div className="pt-2 border-t border-black/5">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {(t("es", "en") === "es" ? reel.specs : reel.specsEn).map((spec, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-black/6 text-[10px] font-mono text-[#515154]"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 text-capelton-green" />
                            {spec}
                          </span>
                        ))}
                      </div>

                      <a
                        href={reel.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0066cc] hover:text-capelton-green transition-colors"
                      >
                        <InstagramIcon className="w-3.5 h-3.5" />
                        <span>{t("Ver Reel original en Instagram", "Watch original Reel on Instagram")}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Minimalist Bottom Bar with Instagram Link */}
        <FadeIn direction="up" delay={0.3}>
          <div className="mt-12 text-center">
            <a
              href="https://www.instagram.com/capeltonmexico"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#fbfbfd] hover:bg-white border border-black/10 hover:border-capelton-green/40 shadow-xs hover:shadow-md transition-all text-xs font-semibold text-[#1d1d1f] group"
            >
              <InstagramIcon className="w-4 h-4 text-capelton-green group-hover:scale-110 transition-transform" />
              <span>{t("Ver más videos de proyectos en @capeltonmexico", "Watch more project videos on @capeltonmexico")}</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-colors" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
