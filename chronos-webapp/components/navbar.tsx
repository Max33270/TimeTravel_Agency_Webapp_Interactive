"use client"

import { Clock, Menu, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const links = [
  { label: "Destinations", href: "#destinations" },
  { label: "Chronos Guide", href: "#guide" },
  { label: "Reservation", href: "#reservation" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="glass-strong fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-wider text-foreground">
            CHRONOS <span className="text-primary">HORIZONS</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#reservation"
            className="rounded-lg border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20 hover:shadow-[0_0_20px_hsl(185_100%_50%/0.2)]"
          >
            {"Réserver un saut"}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="text-foreground md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-strong overflow-hidden border-t border-border/50 md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#reservation"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg border border-primary/30 bg-primary/10 px-5 py-2 text-center text-sm font-medium text-primary transition-all hover:bg-primary/20"
              >
                {"Réserver un saut"}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
