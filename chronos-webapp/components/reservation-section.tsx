"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Rocket, Clock, Loader2, CheckCircle2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const destinations = [
  { value: "babylon", label: "Les Jardins Suspendus de Babylone" },
  { value: "chevalerie", label: "Tournois de Chevalerie" },
  { value: "mars", label: "Colonies Martiennes" },
  { value: "egypt", label: "Construction des Pyramides" },
  { value: "renaissance", label: "Florence de la Renaissance" },
  { value: "future-city", label: "Neo Tokyo 2300" },
]

const centuries = [
  { value: "vii-bc", label: "VIIe siècle av. J.-C." },
  { value: "iii-bc", label: "IIIe siècle av. J.-C." },
  { value: "v", label: "Ve siècle" },
  { value: "xii", label: "XIIe siècle" },
  { value: "xv", label: "XVe siècle" },
  { value: "xxii", label: "XXIIe siècle" },
  { value: "xxiii", label: "XXIIIe siècle" },
]

export function ReservationSection() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }, 2000)
  }

  return (
    <section id="reservation" className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <Clock className="h-4 w-4 text-accent" />
            <span className="text-xs font-medium tracking-widest text-accent uppercase">
              The Check-in
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl text-balance">
            {"Réservez votre saut"}
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            {"Remplissez les coordonnées temporelles. Notre équipe de chrono-ingénieurs préparera votre voyage."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <form
            onSubmit={handleSubmit}
            className="glass-strong space-y-6 rounded-2xl p-8 md:p-10"
          >
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                {"Nom du voyageur"}
              </Label>
              <Input
                id="name"
                placeholder="Entrez votre nom complet"
                required
                className="border-border/50 bg-secondary/40 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              />
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <Label htmlFor="destination" className="text-sm font-medium text-foreground">
                Destination
              </Label>
              <Select required>
                <SelectTrigger
                  id="destination"
                  className="border-border/50 bg-secondary/40 text-foreground focus:ring-primary"
                >
                  <SelectValue placeholder="Choisissez une destination" />
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-card-foreground">
                  {destinations.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Temporal Calendar */}
            <div className="space-y-2">
              <Label htmlFor="century" className="text-sm font-medium text-foreground">
                {"Calendrier Temporel"}
              </Label>
              <Select required>
                <SelectTrigger
                  id="century"
                  className="border-border/50 bg-secondary/40 text-foreground focus:ring-primary"
                >
                  <SelectValue placeholder="Sélectionnez un siècle" />
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-card-foreground">
                  {centuries.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Travelers count */}
            <div className="space-y-2">
              <Label htmlFor="travelers" className="text-sm font-medium text-foreground">
                {"Nombre de voyageurs"}
              </Label>
              <Input
                id="travelers"
                type="number"
                min={1}
                max={6}
                defaultValue={1}
                className="border-border/50 bg-secondary/40 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || submitted}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_hsl(185_100%_50%/0.4)] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {"Calibration en cours..."}
                </>
              ) : submitted ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  {"Saut confirmé !"}
                </>
              ) : (
                <>
                  <Rocket className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                  {"Initier le saut temporel"}
                </>
              )}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
