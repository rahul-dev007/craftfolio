"use client";
import React, { useEffect, useRef, useState } from "react";

type Hit = { source: string; score: number };
type ChatResp = { answer: string; meta?: { hits?: Hit[] } };

export default function ChatWidget() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string; hits?: Hit[] }[]
  >([]);

  // container-level scroll (no window jump)
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    if (!nearBottom) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function ask() {
    const q = question.trim();
    if (!q) return;
    setError(null);
    setLoading(true);
    setMessages((m) => [...m, { role: "user", text: q }]);
    setQuestion("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data: ChatResp = await res.json().catch(() => ({} as any));
      if (!res.ok) throw new Error((data as any)?.error || "Failed to get answer");

      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: data?.answer ?? "Sorry, I couldn't find that.",
          hits: data?.meta?.hits?.slice(0, 5) ?? [],
        },
      ]);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text:
            "⚠️ Sorry—vector search returned no useful context or the server had an issue.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading) ask();
    }
  }

  return (
    <section className="mx-auto w-full max-w-3xl space-y-5 mb-10 ">
      {/* Clean heading */}
      <header className="flex items-end justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Chat • <span className="text-[#8fb1ff]">Ask Rahul’s Portfolio</span>
        </h2>
        <div className="hidden sm:flex items-center gap-2 text-xs">
          <Badge label="Vector Search" className="text-emerald-300 ring-emerald-800/50 bg-emerald-900/30" />
          <Badge label="AI" className="text-indigo-300 ring-indigo-800/50 bg-indigo-900/30" />
        </div>
      </header>

      <div className="rounded-3xl border border-zinc-800/60 bg-[#0b1220] p-5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]">
        {/* Messages */}
        <div
          ref={wrapRef}
          className="mt-1 grid gap-3 max-h-[60vh] overflow-y-auto pr-1 overscroll-contain"
        >
          {messages.length === 0 && <EmptyState />}

          {messages.map((m, i) => (
            <Bubble key={i} role={m.role} text={m.text} hits={m.hits} />
          ))}

          {loading && <TypingBubble />}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-3 rounded-xl border border-red-900 bg-red-950/70 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Composer */}
        <div className="mt-3 flex items-end gap-2">
          <textarea
            placeholder="Type your question…"
            className="min-h-[56px] max-h-40 flex-1 resize-none rounded-2xl
            border border-[#214176]/50 bg-[#0e1a30] px-3 py-3 text-sm leading-6
            text-[#cfe0ff] placeholder:text-[#cfe0ff]/50
            shadow-inner outline-none transition
            focus:border-[#3b6ab5] focus:ring-2 focus:ring-[#214176]/30"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button
            type="button"
            onClick={() => !loading && ask()}
            className="rounded-2xl bg-gradient-to-tr from-[#214176] to-[#4b6fae]
            px-4 py-3 text-sm font-medium text-white shadow-md transition
            hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#214176]/40
            active:scale-[0.98]"
          >
            {loading ? "Thinking…" : "Send"}
          </button>
        </div>

        <div className="mt-2 text-[11px] text-zinc-400">
          Tip: Try “Summarize Rahul’s e-commerce project in 3 bullets”.
        </div>
      </div>
    </section>
  );
}

/* ========== sub components ========== */

function Badge({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] ring-1",
        className,
      ].join(" ")}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current/70" />
      {label}
    </span>
  );
}

function Bubble({
  role,
  text,
  hits,
}: {
  role: "user" | "assistant";
  text: string;
  hits?: Hit[];
}) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[90%] rounded-3xl px-4 py-3 text-sm leading-6 shadow transition",
          isUser
            ? "bg-gradient-to-tr from-[#214176] to-[#4b6fae] text-white rounded-br-md"
            : "bg-[#0f172a] border border-zinc-800/60 text-zinc-100 rounded-bl-md",
        ].join(" ")}
      >
        <div className="whitespace-pre-wrap">{text}</div>

        {!isUser && hits && hits.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {hits.map((h, idx) => {
              const color = colorForSource(h.source);
              return (
                <span
                  key={idx}
                  title={`score: ${h.score.toFixed(3)}`}
                  className={[
                    "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] transition hover:scale-[1.02]",
                    color.bg,
                    color.border,
                    color.text,
                  ].join(" ")}
                >
                  <span className={["h-2 w-2 rounded-full", color.dot].join(" ")} />
                  {shorten(h.source)} <span className="opacity-50">·</span>{" "}
                  {h.score.toFixed(2)}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// animated "typing…" bubble (uses CSS in globals.css)
function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] rounded-3xl border border-zinc-800/60 bg-[#0f172a] p-3 shadow">
        <div className="flex items-center gap-1">
          <span className="dot dot1" />
          <span className="dot dot2" />
          <span className="dot dot3" />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  const pills = ["Skills", "Experience", "Projects", "AI / RAG", "Links"];
  return (
    <div className="rounded-3xl border border-dashed border-zinc-800/60 bg-[#0f172a] p-6 text-sm text-zinc-300">
      <div className="font-medium text-zinc-100">Try one of these:</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {pills.map((p) => (
          <span
            key={p}
            className="rounded-full border border-zinc-700 bg-[#0e1a30] px-2 py-1 text-[11px] text-zinc-300"
          >
            {p}
          </span>
        ))}
      </div>
      <div className="mt-3 text-[11px] text-zinc-500">
        Example: “Share Rahul’s portfolio and GitHub links.”
      </div>
    </div>
  );
}

function shorten(s: string) {
  try {
    const parts = s.split("/");
    const file = parts[parts.length - 1];
    return file.length > 24 ? file.slice(0, 21) + "…" : file;
  } catch {
    return s;
  }
}

function colorForSource(source: string) {
  const lower = source.toLowerCase();
  if (lower.endsWith(".pdf")) {
    return {
      bg: "bg-rose-900/30",
      border: "border-rose-800/60",
      text: "text-rose-300",
      dot: "bg-rose-400",
    };
  }
  if (lower.endsWith(".md")) {
    return {
      bg: "bg-sky-900/30",
      border: "border-sky-800/60",
      text: "text-sky-300",
      dot: "bg-sky-400",
    };
  }
  return {
    bg: "bg-amber-900/30",
    border: "border-amber-800/60",
    text: "text-amber-300",
    dot: "bg-amber-400",
  };
}
