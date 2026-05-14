import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Loader2, Brain, ChevronDown, RotateCcw } from 'lucide-react'
import { sendChatMessage } from '@services/geminiService'
import type { ChatMessage } from '@services/geminiService'
import { cn } from '@lib/utils'

const SUGGESTED = [
  'What services do you offer?',
  'How much does it cost?',
  'How do I get started?',
  'What free AI tools are available?',
  'How do I remove a collection?',
  'How fast can I raise my score?',
]

const WELCOME: ChatMessage = {
  role: 'model',
  text: "Hi! I'm your AI Credit Advisor for Proximity Credit Repair. I know everything about our services, pricing, team, and free AI tools — and I can answer any credit repair question you have. What can I help you with?",
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasNew, setHasNew] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setHasNew(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend(text?: string) {
    const msg = (text ?? input).trim()
    if (!msg || loading) return
    setInput('')

    const userMsg: ChatMessage = { role: 'user', text: msg }
    const newHistory = [...messages, userMsg]
    setMessages(newHistory)
    setLoading(true)

    try {
      const reply = await sendChatMessage(newHistory.filter(m => m.role === 'user' || m !== WELCOME))
      setMessages(prev => [...prev, { role: 'model', text: reply }])
      if (!open) setHasNew(true)
    } catch {
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I ran into an issue. Please try again in a moment.' }])
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setMessages([WELCOME])
    setInput('')
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-[360px] flex flex-col bg-[#111111] border border-gold-primary/25 rounded-2xl shadow-[0_8px_48px_rgba(0,0,0,0.6)] overflow-hidden"
            style={{ height: 'min(520px, calc(100vh - 120px))' }}
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-gold-primary/15 to-transparent border-b border-white/8 flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gold-gradient flex items-center justify-center flex-shrink-0">
                <Brain size={15} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-white text-sm leading-none">AI Credit Advisor</p>
                <p className="font-body text-white/40 text-[11px] mt-0.5">Powered by Google Gemini</p>
              </div>
              <button
                onClick={reset}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/8 transition-all"
                aria-label="Reset conversation"
                title="New conversation"
              >
                <RotateCcw size={13} />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/8 transition-all"
                aria-label="Close chat"
              >
                <ChevronDown size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn('flex gap-2', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  {msg.role === 'model' && (
                    <div className="w-6 h-6 rounded-full bg-gold-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Brain size={12} className="text-gold-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-3.5 py-2.5 font-body text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-gold-primary text-white rounded-tr-sm'
                        : 'bg-white/8 text-white/85 rounded-tl-sm border border-white/8'
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-gold-primary/20 flex items-center justify-center flex-shrink-0">
                    <Brain size={12} className="text-gold-primary" />
                  </div>
                  <div className="bg-white/8 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-primary/60 animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-primary/60 animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-primary/60 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && !loading && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                {SUGGESTED.map(q => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-[11px] font-body text-gold-primary/80 bg-gold-primary/8 border border-gold-primary/20 rounded-full px-3 py-1 hover:bg-gold-primary/15 hover:text-gold-primary transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="px-3 pb-3 pt-2 border-t border-white/8 flex-shrink-0">
              <div className="flex items-center gap-2 bg-white/6 border border-white/12 rounded-xl px-3 py-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                  placeholder="Ask about your credit…"
                  disabled={loading}
                  className="flex-1 bg-transparent text-white placeholder-white/25 font-body text-sm focus:outline-none disabled:opacity-50"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="w-7 h-7 rounded-lg bg-gold-gradient flex items-center justify-center flex-shrink-0 disabled:opacity-30 hover:opacity-90 transition-opacity"
                >
                  {loading ? <Loader2 size={13} className="text-white animate-spin" /> : <Send size={13} className="text-white" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close AI chat' : 'Open AI Credit Advisor'}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 pl-4 pr-5 py-3 bg-[#1a1400] border border-gold-primary/50 rounded-full shadow-gold-md hover:shadow-gold-lg transition-shadow"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={17} className="text-gold-primary" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageSquare size={17} className="text-gold-primary" />
            </motion.span>
          )}
        </AnimatePresence>
        <span className="font-heading font-bold text-sm text-gold-primary whitespace-nowrap">
          {open ? 'Close' : 'AI Advisor'}
        </span>
        {hasNew && !open && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-[#0a0a0a]" />
        )}
      </motion.button>
    </>
  )
}
