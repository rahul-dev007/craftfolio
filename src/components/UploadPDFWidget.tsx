"use client";
import React, { useState } from "react";

export default function UploadPDFWidget() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    const form = e.currentTarget;
    const input = form.querySelector<HTMLInputElement>('input[type="file"]');
    if (!input?.files?.[0]) return setMsg("Pleas+e choose a PDF file.");
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("file", input.files[0]);
      const res = await fetch("/api/ingest-pdf", { method: "POST", body: fd });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || "Upload failed");
      setMsg(`✅ Ingested: ${j.inserted} chunks from ${j.source}`);
      form.reset();
    } catch (e: any) {
      setMsg(`⚠️ ${e.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-3xl space-y-5">
      {/* Clean heading */}
      <header className="flex items-end justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Knowledge • <span className="text-[#8fb1ff]">Upload PDF</span>
        </h2>
        <p className="hidden sm:block text-xs text-zinc-400">
          Ingest your CV / project docs (PDF)
        </p>
      </header>

      <form
        onSubmit={handleUpload}
        className="rounded-3xl border border-zinc-800/60 bg-[#0b1220] p-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
      >
        <div className="text-sm font-medium text-zinc-100">Choose a PDF file</div>

        <div className="mt-3 flex items-center gap-2">
          <input
            type="file"
            accept="application/pdf"
            className="block w-full text-sm text-[#cfe0ff]
            file:mr-3 file:rounded-xl file:border file:border-[#214176]/50
            file:bg-[#0e1a30] file:px-3 file:py-2 file:text-sm file:font-medium
            file:text-[#cfe0ff] hover:file:bg-[#132545] transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-gradient-to-tr from-[#214176] to-[#4b6fae]
            px-4 py-2 text-sm font-medium text-white shadow-md transition
            hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#214176]/40 disabled:opacity-50"
          >
            {loading ? "Uploading…" : "Upload"}
          </button>
        </div>

        {msg && (
          <div className="mt-3 rounded-xl border border-zinc-800/60 bg-[#0f172a] px-3 py-2 text-sm text-zinc-200">
            {msg}
          </div>
        )}
      </form>
    </section>
  );
}
