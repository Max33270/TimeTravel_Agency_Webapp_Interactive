"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Clock, Loader2 } from "lucide-react"

function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts || !Array.isArray(message.parts)) return ""
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

const QUICK_QUESTIONS = [
  "Quelles destinations proposez-vous ?",
  "Quels sont vos tarifs ?",
  "Est-ce dangereux ?",
]

export function ChronosGuide() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const handleQuickQuestion = (q: string) => {
    if (isLoading) return
    sendMessage({ text: q })
  }

  return (
    <div id="guide" className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setOpen(true)}
            className="animate-pulse-glow group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
            aria-label="Ouvrir Chronos Guide"
          >
            <MessageSquare className="h-6 w-6" />
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-green-500" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass-strong flex h-[480px] w-[340px] flex-col overflow-hidden rounded-2xl shadow-2xl sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/30 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary/15">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    Chronos Guide
                  </div>
                  <div className="text-xs text-primary">
                    {isLoading ? "En train de penser..." : "IA Temporelle Active"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Fermer le chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5">
              {messages.length === 0 && (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="rounded-xl rounded-tl-sm bg-secondary/60 px-4 py-2.5">
                      <p className="text-sm leading-relaxed text-foreground">
                        {"Bienvenue voyageur ! Je suis Chronos, votre guide temporel. Posez-moi vos questions sur nos destinations."}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-10">
                    {QUICK_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleQuickQuestion(q)}
                        className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary/10"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => {
                const text = getMessageText(msg)
                if (!text) return null

                return msg.role === "assistant" ? (
                  <div key={msg.id} className="mb-4 flex gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="rounded-xl rounded-tl-sm bg-secondary/60 px-4 py-2.5">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                        {text}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="mb-4 flex justify-end">
                    <div className="rounded-xl rounded-tr-sm bg-primary/20 px-4 py-2.5">
                      <p className="text-sm leading-relaxed text-foreground">
                        {text}
                      </p>
                    </div>
                  </div>
                )
              })}

              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="mb-4 flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="rounded-xl rounded-tl-sm bg-secondary/60 px-4 py-2.5">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-border/30 p-3">
              <div className="flex items-center gap-2 rounded-xl bg-secondary/40 px-3 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question sur les voyages temporels..."
                  className="flex-1 border-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/80 disabled:opacity-50"
                  aria-label="Envoyer"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted-foreground/50">
                {"Propulse par l'IA Chronos v4.2"}
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
