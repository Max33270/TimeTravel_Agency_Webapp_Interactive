"use client"

import { motion } from "framer-motion"
import { Rocket, Shield } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      {/* Perspective grid */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[60%] w-[200%] -translate-x-1/2 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(hsl(185 100% 50% / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(185 100% 50% / 0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: "perspective(500px) rotateX(55deg)",
            transformOrigin: "center bottom",
          }}
        />
      </div>

      {/* Radial glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]" style={{ background: "radial-gradient(circle, hsl(185 100% 50%), transparent 70%)" }} />
      <div className="pointer-events-none absolute top-1/4 right-1/4 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]" style={{ background: "radial-gradient(circle, hsl(263 70% 58%), transparent 70%)" }} />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium tracking-widest text-primary uppercase">
              Agence de Voyage Temporel
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-6 text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl"
        >
          <span className="text-balance">Le passé est</span>
          <br />
          <span className="neon-cyan text-primary">votre futur</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {"Explorez les époques les plus fascinantes de l'histoire humaine. Voyagez en toute sécurité avec la technologie temporelle la plus avancée."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#destinations"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_hsl(185_100%_50%/0.4)]"
          >
            <Rocket className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            {"Explorer les Époques"}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          <a
            href="#reservation"
            className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-8 py-3.5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/20 hover:shadow-[0_0_20px_hsl(263_70%_58%/0.2)]"
          >
            {"Réserver un saut"}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass mt-16 mx-auto grid max-w-2xl grid-cols-3 gap-6 rounded-2xl p-6"
        >
          {[
            { value: "2 847", label: "Voyages effectués" },
            { value: "100%", label: "Retours sécurisés" },
            { value: "∞", label: "Époques accessibles" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-primary md:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs text-muted-foreground md:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
