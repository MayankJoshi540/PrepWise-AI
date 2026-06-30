"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { CATEGORY_LABEL } from "@/lib/data";
import { generateInterviewQuestions } from "@/actions/aiQuestions";
import useFetch from "@/hooks/use-fetch";

export default function AIQuestionsPanel({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(
    categories?.[0] ?? null
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState("Medium");

  const {
    data,
    loading,
    error,
    fn: generateFn,
  } = useFetch(generateInterviewQuestions);

  const questions = data?.questions ?? [];

  return (
    <div className="flex flex-col gap-4 h-full overflow-hidden">
      {/* Category selector */}
      <div className="flex flex-col gap-1.5 text-left">
        <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">Category</span>
        <div className="flex flex-wrap gap-1.5">
          {categories?.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "border-amber-400/40 bg-amber-400/10 text-amber-400"
                  : "border-white/10 text-stone-500 hover:border-white/20 hover:text-stone-400"
              }`}
            >
              {CATEGORY_LABEL[cat] ?? cat}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty selector */}
      <div className="flex flex-col gap-1.5 text-left">
        <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">Difficulty</span>
        <div className="flex gap-1.5">
          {["Easy", "Medium", "Hard"].map((diff) => (
            <button
              key={diff}
              type="button"
              onClick={() => setSelectedDifficulty(diff)}
              className={`flex-1 text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                selectedDifficulty === diff
                  ? "border-amber-400/40 bg-amber-400/10 text-amber-400"
                  : "border-white/10 text-stone-500 hover:border-white/20 hover:text-stone-400"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      <Button
        variant="gold"
        size="sm"
        disabled={loading || !selectedCategory}
        onClick={() => generateFn({ category: selectedCategory, difficulty: selectedDifficulty })}
        className="w-full gap-2 py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer shrink-0"
      >
        {loading ? (
          <>
            <Loader2 size={13} className="animate-spin" />
            Generating {selectedDifficulty} Questions…
          </>
        ) : (
          <>
            <Sparkles size={13} />
            Generate {selectedDifficulty} questions
          </>
        )}
      </Button>

      {error && (
        <p className="text-xs text-red-400 text-left">{error?.message || error}</p>
      )}

      {/* Questions list container */}
      {questions.length > 0 ? (
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-amber-400/30">
          {questions.map((q, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-amber-400/10 p-5 flex flex-col gap-3.5 shrink-0 text-left transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/[0.02] blur-xl rounded-full group-hover:bg-amber-500/[0.04] transition-all pointer-events-none" />
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-amber-400/80 uppercase tracking-widest font-mono bg-amber-400/5 px-2 py-0.5 rounded-md border border-amber-400/10">Question {i + 1}</span>
                <span className="text-[9px] font-bold text-zinc-500 border border-white/5 bg-white/[0.01] px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {q.difficulty ?? selectedDifficulty}
                </span>
              </div>
              <p className="text-sm text-stone-200 font-bold leading-snug">
                {q.question}
              </p>
              <div className="h-px bg-white/5" />
              <div className="text-xs text-stone-400 font-medium leading-relaxed bg-black/30 p-3 rounded-xl border border-white/[0.02]">
                <span className="text-amber-400 font-black uppercase tracking-wider text-[9px] block mb-1">Ideal Response Criteria:</span>
                {q.answer}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center py-8">
          <span className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
            <Sparkles size={16} className="text-amber-400" />
          </span>
          <p className="text-xs text-stone-600 max-w-[200px]">
            Select category & difficulty to generate custom questions for this session.
          </p>
        </div>
      )}
    </div>
  );
}
