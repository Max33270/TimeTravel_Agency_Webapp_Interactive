"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import Image from "next/image"

const destinations = [
  {
    id: "prehistoire",
    era: "Prehistoire",
    title: "L'Ere des Dinosaures",
    description:
      "Marchez parmi les geants du Cretace. Forets de fougeres, brume primitive et rencontres face-a-face avec les Triceratops.",
    image: "/images/prehistoric.png",
    year: "68 M av. J.-C.",
    borderColor: "hover:border-emerald-500/50",
    glowColor: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    accentColor: "text-emerald-400",
    bgAccent: "bg-emerald-500/10",
    tag: "Fougeres & Titans",
  },
  {
    id: "belle-epoque",
    era: "Belle Epoque",
    title: "Paris 1900",
    description:
      "Flanez dans le Paris de la Belle Epoque : locomotives a vapeur, Tour Eiffel naissante et elegance d'un siecle revolu.",
    image: "/images/paris-1900.png",
    year: "1900 ap. J.-C.",
    borderColor: "hover:border-amber-500/50",
    glowColor: "hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    accentColor: "text-amber-400",
    bgAccent: "bg-amber-500/10",
    tag: "Vapeur & Elegance",
  },
  {
    id: "renaissance",
    era: "Renaissance",
    title: "Florence des Medicis",
    description:
      "Contemplez le Duomo au coucher du soleil, croisez les artistes de la Renaissance et vivez l'age d'or de Florence.",
    image: "/images/florence-renaissance.png",
    year: "1490 ap. J.-C.",
    borderColor: "hover:border-red-500/50",
    glowColor: "hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]",
    accentColor: "text-red-400",
    bgAccent: "bg-red-500/10",
    tag: "Art & Splendeur",
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
}

export function DestinationsSection() {
  return (
    <section id="destinations" className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium tracking-widest text-primary uppercase">
              Le Catalogue
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl text-balance">
            {"Choisissez votre époque"}
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            {"Trois destinations emblématiques pour votre premier saut temporel. Des milliers d'autres vous attendent."}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {destinations.map((dest, i) => (
            <motion.article
              key={dest.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className={`group glass relative overflow-hidden rounded-2xl border border-border/50 transition-all duration-500 ${dest.borderColor} ${dest.glowColor}`}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                {/* Year badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`rounded-full ${dest.bgAccent} border border-white/10 px-3 py-1 text-xs font-mono font-bold ${dest.accentColor}`}
                  >
                    {dest.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className={`text-xs font-medium uppercase tracking-wider ${dest.accentColor}`}>
                    {dest.era}
                  </span>
                  <span className="text-muted-foreground/30">{"/"}</span>
                  <span className="text-xs text-muted-foreground">{dest.tag}</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">{dest.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  {dest.description}
                </p>
                <button
                  className={`w-full rounded-lg ${dest.bgAccent} py-2.5 text-sm font-medium ${dest.accentColor} border border-white/5 transition-all hover:brightness-125`}
                >
                  {"Découvrir"}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
