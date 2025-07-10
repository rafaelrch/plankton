import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User } from "lucide-react";

const AI_AVATAR = "https://ui-avatars.com/api/?name=AI&background=888&color=fff";
const USER_AVATAR = "https://ui-avatars.com/api/?name=Ol%C3%A1+chat&background=888&color=fff";

type ChatWithAIProps = {
  initialMessage: string;
  systemPrompt?: string;
};

const INPUT_HEIGHT = 72; // altura do input em px (12 * 4 + padding)

export default function ChatWithAI({ initialMessage, systemPrompt }: ChatWithAIProps) {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      setMessages([{ sender: "user", text: initialMessage }]);
      sendToOpenAI(initialMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendToOpenAI(message: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      const aiText = data.choices?.[0]?.message?.content || "Desculpe, não entendi.";
      setMessages((msgs) => [...msgs, { sender: "ai", text: aiText }]);
    } catch (e) {
      setMessages((msgs) => [...msgs, { sender: "ai", text: "Erro ao conectar com a IA." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { sender: "user", text: input }]);
    sendToOpenAI(input);
    setInput("");
  }

  return (
    <div className="fixed inset-0 z-30 w-full h-screen flex flex-col items-center justify-center bg-background" style={{ minHeight: '100vh' }}>
      <div
        ref={chatRef}
        className="w-full max-w-4xl md:max-w-2xl sm:max-w-full flex flex-col gap-8 sm:gap-4 items-center justify-start pt-12 sm:pt-6 pb-8 sm:pb-4 px-4 sm:px-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
        style={{ minHeight: `0`, maxHeight: `calc(100dvh - ${INPUT_HEIGHT}px)`, height: 'auto', paddingBottom: 88 }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`w-full flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "ai" && (
                <div className="flex flex-row items-start gap-4 sm:gap-2">
                  <img src={AI_AVATAR} alt="AI" className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-zinc-700" />
                  <div className="flex flex-col items-start">
                    <span className="text-base sm:text-sm text-zinc-400 font-normal mb-1">AI</span>
                    <div className="bg-zinc-700 text-zinc-100 rounded-2xl rounded-bl-none px-6 py-4 sm:px-3 sm:py-2 text-base sm:text-sm font-normal max-w-[90vw] md:max-w-[420px] whitespace-pre-line break-words">
                      {msg.text}
                    </div>
                  </div>
                </div>
              )}
              {msg.sender === "user" && (
                <div className="flex flex-row items-start gap-4 sm:gap-2 flex-row-reverse">
                  <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                    <User className="w-6 h-6 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-base sm:text-sm text-zinc-400 font-normal mb-1">Você</span>
                    <div className="bg-zinc-800 text-zinc-100 rounded-2xl rounded-br-none px-6 py-4 sm:px-3 sm:py-2 text-base sm:text-sm font-normal max-w-[90vw] md:max-w-[420px] whitespace-pre-line break-words">
                      {msg.text}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex justify-start"
            >
              <div className="flex flex-row items-start gap-4 sm:gap-2">
                <img src={AI_AVATAR} alt="AI" className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-zinc-700" />
                <div className="flex flex-col items-start">
                  <span className="text-base sm:text-sm text-zinc-400 font-normal mb-1">Plankton Wolf</span>
                  <div className="bg-zinc-700 text-zinc-100 rounded-2xl rounded-bl-none px-6 py-4 sm:px-3 sm:py-2 text-base sm:text-sm font-normal max-w-[90vw] md:max-w-[420px] animate-pulse break-words">
                    Digitando...
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Input fixo no rodapé da página, flutuante */}
      <form
        onSubmit={handleSend}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl md:max-w-2xl sm:max-w-full px-4 sm:px-2 mx-auto z-50"
        style={{ paddingBottom: 16 }}
      >
         <div className="w-full relative max-w-xl md:max-w-2xl sm:max-w-full mx-auto bg-zinc-900/70 h-12 sm:h-11 rounded-full backdrop-blur-md overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 flex items-center">
            <input
              type="text"
              className="w-full relative text-base sm:text-sm z-50 border-none text-zinc-100 bg-transparent h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-3 pr-16 placeholder:text-zinc-400"
              placeholder="Pergunte alguma coisa"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-7 sm:w-7 rounded-full transition duration-200 flex items-center justify-center ${input ? 'bg-black text-white' : 'bg-zinc-800 text-zinc-400'} disabled:bg-zinc-800`}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 sm:h-3.5 sm:w-3.5"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <motion.path
                  d="M5 12l14 0"
                  initial={{
                    strokeDasharray: "50%",
                    strokeDashoffset: "50%",
                  }}
                  animate={{
                    strokeDashoffset: input ? 0 : "50%",
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "linear",
                  }}
                />
                <path d="M13 18l6 -6" />
                <path d="M13 6l6 6" />
              </motion.svg>
            </button>
          </div>
        </form>
    </div>
  );
}
