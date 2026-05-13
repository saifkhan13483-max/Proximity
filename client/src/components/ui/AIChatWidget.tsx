import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles, RotateCcw, ChevronDown } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  pending?: boolean
}

const SUGGESTED = [
  'How does credit repair work?',
  'How fast can you improve my score?',
  'What is a credit dispute?',
  'What score do I need for a mortgage?',
]

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-gold-primary/70"
          style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
          <Sparkles size={13} className="text-black" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 font-body text-sm leading-relaxed ${
          isUser
            ? 'bg-gold-primary text-black font-medium rounded-tr-sm'
            : 'bg-white/[0.07] border border-white/[0.08] text-white/90 rounded-tl-sm'
        }`}
      >
        {msg.pending ? <TypingDots /> : msg.content}
      </div>
    </motion.div>
  )
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm your Proximity AI Advisor. Ask me anything about credit repair, your credit score, or how we can help you.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [pulse, setPulse] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (open) {
      setPulse(false)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open])

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: trimmed }
    const pendingMsg: Message = { id: 'pending', role: 'assistant', content: '', pending: true }

    setMessages((prev) => [...prev, userMsg, pendingMsg])
    setInput('')
    setLoading(true)

    const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }))

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      if (!res.ok) throw new Error('Server error')

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let fullContent = ''
      const assistantId = crypto.randomUUID()

      setMessages((prev) => prev.map((m) =>
        m.id === 'pending' ? { ...m, id: assistantId, pending: false } : m
      ))

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          try {
            const parsed = JSON.parse(line.slice(6))
            if (parsed.content) {
              fullContent += parsed.content
              setMessages((prev) => prev.map((m) =>
                m.id === assistantId ? { ...m, content: fullContent } : m
              ))
            }
          } catch { /* skip malformed */ }
        }
      }
    } catch {
      setMessages((prev) => prev.map((m) =>
        m.id === 'pending'
          ? { ...m, id: crypto.randomUUID(), pending: false, content: "I'm having trouble connecting right now. Please call us at (800) 555-0192 or try again." }
          : m
      ))
    } finally {
      setLoading(false)
    }
  }, [loading, messages])

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const reset = () => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm your Proximity AI Advisor. Ask me anything about credit repair, your credit score, or how we can help you.",
    }])
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-5 z-50 w-[360px] max-w-[calc(100vw-2.5rem)] flex flex-col"
            style={{ height: 'min(520px, calc(100vh - 7rem))' }}
          >
            <div className="flex flex-col h-full bg-[#0e0e0e] border border-white/[0.09] rounded-2xl shadow-gold-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-gradient-to-r from-black to-[#1a1308] flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold-sm">
                    <Sparkles size={14} className="text-black" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white text-sm leading-none">Proximity AI Advisor</p>
                    <p className="font-body text-[10px] text-gold-primary/80 mt-0.5 leading-none">Credit repair expert · Always available</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={reset}
                    title="New conversation"
                    className="w-7 h-7 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 flex items-center justify-center transition-all"
                  >
                    <RotateCcw size={13} />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-7 h-7 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 flex items-center justify-center transition-all"
                  >
                    <ChevronDown size={15} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin space-y-0.5">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <MessageBubble key={msg.id} msg={msg} />
                  ))}
                </AnimatePresence>

                {messages.length === 1 && !loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-3 space-y-1.5"
                  >
                    <p className="font-body text-[11px] text-white/25 mb-2">Suggested questions</p>
                    {SUGGESTED.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="w-full text-left px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.07] font-body text-xs text-white/60 hover:text-white hover:border-gold-primary/30 hover:bg-gold-primary/5 transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="flex-shrink-0 px-3 pb-3 pt-2 border-t border-white/[0.06]">
                <div className="flex items-end gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 focus-within:border-gold-primary/40 transition-all">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Ask about your credit..."
                    rows={1}
                    disabled={loading}
                    className="flex-1 bg-transparent font-body text-sm text-white placeholder-white/25 resize-none outline-none leading-relaxed max-h-24 disabled:opacity-50"
                    style={{ minHeight: '1.5rem' }}
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={loading || !input.trim()}
                    className="w-7 h-7 rounded-lg bg-gold-primary flex items-center justify-center flex-shrink-0 mb-0.5 hover:bg-gold-light transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Send size={12} className="text-black" />
                  </button>
                </div>
                <p className="text-center font-body text-[10px] text-white/20 mt-1.5">
                  AI-powered · Not financial advice
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-gold-gradient shadow-gold-md flex items-center justify-center"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={pulse ? { boxShadow: ['0 4px 24px rgba(184,146,74,0.35)', '0 4px 32px rgba(184,146,74,0.7)', '0 4px 24px rgba(184,146,74,0.35)'] } : {}}
        transition={pulse ? { duration: 2, repeat: Infinity } : {}}
        title="Chat with AI Advisor"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} className="text-black" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Sparkles size={22} className="text-black" />
            </motion.div>
          )}
        </AnimatePresence>

        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-[#0A0A0A]" />
        )}
      </motion.button>
    </>
  )
}
