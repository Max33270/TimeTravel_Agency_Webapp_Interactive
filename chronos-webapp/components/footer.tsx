"use client"

import { Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/30 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <span className="text-sm font-bold tracking-wider text-foreground">
            CHRONOS <span className="text-primary">HORIZONS</span>
          </span>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
          {"Agence agréée par le Consortium Temporel Interplanétaire. Licence CT-7742. Tous les sauts temporels sont couverts par la garantie de paradoxe nul."}
        </p>
        <div className="flex items-center gap-6">
          {["Conditions Temporelles", "Politique de Paradoxe", "Contact"].map(
            (label) => (
              <a
                key={label}
                href="#"
                className="text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {label}
              </a>
            )
          )}
        </div>
        <p className="text-[10px] text-muted-foreground/40">
          {"© 2026 Chronos Horizons. Tous droits réservés à travers le continuum espace-temps."}
        </p>
      </div>
    </footer>
  )
}
