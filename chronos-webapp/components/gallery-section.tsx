"use client"

import { motion } from "framer-motion"
import { Film, Play, Pause, Maximize2, Volume2, VolumeX } from "lucide-react"
import { useRef, useState } from "react"

const videos = [
  {
    id: "cretace",
    src: "/videos/cretace.mov",
    title: "Safari au Cretace",
    subtitle: "68 millions d'annees avant notre ere",
    description:
      "Plongez au coeur des forets primitives et observez les geants du Cretace dans leur habitat naturel.",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    glowColor: "shadow-[0_0_40px_rgba(16,185,129,0.12)]",
    bgAccent: "bg-emerald-500/10",
  },
  {
    id: "florence",
    src: "/videos/florence.mov",
    title: "Florence Renaissance",
    subtitle: "Italie, XVe siecle",
    description:
      "Deambulez dans les rues de Florence a l'epoque des Medicis, entre chefs-d'oeuvre et splendeur architecturale.",
    accentColor: "text-red-400",
    borderColor: "border-red-500/30",
    glowColor: "shadow-[0_0_40px_rgba(239,68,68,0.12)]",
    bgAccent: "bg-red-500/10",
  },
]

function VideoCard({
  video,
  index,
}: {
  video: (typeof videos)[0]
  index: number
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    if (!videoRef.current) return
    if (!isFullscreen) {
      videoRef.current.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    setIsFullscreen(!isFullscreen)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
      className={`group glass relative overflow-hidden rounded-2xl border ${video.borderColor} transition-all duration-500 hover:${video.glowColor}`}
    >
      {/* Video container */}
      <div className="relative aspect-video overflow-hidden">
        <video
          ref={videoRef}
          src={video.src}
          muted={isMuted}
          loop
          playsInline
          className="h-full w-full object-cover"
          onEnded={() => setIsPlaying(false)}
        />

        {/* Overlay gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

        {/* Play button overlay */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px] transition-all duration-300 hover:bg-background/10"
            aria-label="Lancer la video"
          >
            <div className={`flex h-20 w-20 items-center justify-center rounded-full ${video.bgAccent} border border-white/10 backdrop-blur-sm transition-transform duration-300 hover:scale-110`}>
              <Play className={`h-8 w-8 ${video.accentColor} ml-1`} />
            </div>
          </button>
        )}

        {/* Controls bar */}
        {isPlaying && (
          <div className="absolute right-0 bottom-0 left-0 flex items-center justify-between bg-gradient-to-t from-background/80 to-transparent px-4 pb-4 pt-8">
            <button
              onClick={togglePlay}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Pause"
            >
              <Pause className="h-4 w-4 text-foreground" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label={isMuted ? "Activer le son" : "Couper le son"}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-foreground" />
                ) : (
                  <Volume2 className="h-4 w-4 text-foreground" />
                )}
              </button>
              <button
                onClick={toggleFullscreen}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Plein ecran"
              >
                <Maximize2 className="h-4 w-4 text-foreground" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-2 flex items-center gap-2">
          <span className={`text-xs font-medium uppercase tracking-wider ${video.accentColor}`}>
            {video.subtitle}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold text-foreground">{video.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {video.description}
        </p>
      </div>
    </motion.div>
  )
}

export function GallerySection() {
  return (
    <section id="galerie" className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <Film className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium tracking-widest text-primary uppercase">
              Galerie
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl text-balance">
            {"Apercu de vos voyages"}
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            {"Des extraits exclusifs filmes par nos chrono-reporters sur le terrain. Vivez l'immersion avant le depart."}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {videos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
