import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Clock, BookOpen, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import articles, { categoryColors } from "../../data/articlesData";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
// cream: #FAF4E9 | hibiscus: #E23F73 | mango: #FF9736 | plum: #2B1330 | lime: #C8F03C

const PAGE_SIZE = 6; // cards shown per "page"

// ─── Placeholder image pattern (shown when article.image is null) ─────────────
function PlaceholderCover({ category }) {
  const { bg } = categoryColors[category] ?? { bg: "#E23F73" };
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ backgroundColor: bg + "18" }}
    >
      {/* subtle dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${bg}30 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />
      <Pencil
        size={40}
        style={{ color: bg, opacity: 0.35 }}
        className="relative z-10"
      />
    </div>
  );
}

// ─── Single article card ──────────────────────────────────────────────────────
function ArticleCard({ article, index, prefersReduced }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { bg, text } = categoryColors[article.category] ?? categoryColors.Zumba;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: prefersReduced ? 0 : (index % PAGE_SIZE) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-plum/8 flex flex-col hover:shadow-[0_20px_60px_rgba(43,19,48,0.12)] transition-all duration-400"
    >
      {/* ── Hover gradient border (top accent bar) ── */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 rounded-t-2xl"
        style={{ background: `linear-gradient(to right, ${bg}, #FF9736)` }}
        aria-hidden="true"
      />

      {/* ── Cover image / placeholder ── */}
      <div className="relative h-44 overflow-hidden bg-cream shrink-0">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <PlaceholderCover category={article.category} />
        )}

        {/* Category tag */}
        <span
          className="absolute top-3 left-3 text-[10px] font-mono font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full z-10"
          style={{ backgroundColor: bg, color: text }}
        >
          {article.category}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bricolage font-bold text-plum text-lg leading-snug group-hover:text-hibiscus transition-colors duration-200 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-plum/55 text-sm leading-relaxed mt-2.5 line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-plum/6">
          <div className="flex items-center gap-1.5 text-plum/35 text-xs font-mono">
            <Clock size={11} />
            {article.readTime}
          </div>
          <Link
            to={`/blog/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-hibiscus hover:text-plum transition-colors no-underline group/link"
            aria-label={`Read ${article.title}`}
          >
            Read article
            <ArrowRight size={13} className="transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Homepage section ─────────────────────────────────────────────────────────
export default function ArticlesSection() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = articles.slice(0, visible);
  const hasMore = visible < articles.length;

  return (
    <section
      id="articles"
      className="relative bg-cream overflow-hidden py-24 selection:bg-lime selection:text-plum"
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #2B1330 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-hibiscus/10 border border-hibiscus/20 rounded-full px-4 py-1.5 mb-4">
              <BookOpen size={12} className="text-hibiscus" />
              <span className="text-hibiscus text-[10px] font-mono font-bold tracking-[4px] uppercase">
                By Hanna
              </span>
            </div>

            <h2 className="font-bricolage font-extrabold text-plum text-4xl sm:text-5xl md:text-6xl leading-[0.95]">
              Move Better,{" "}
              <span className="text-hibiscus">Live Better</span>
            </h2>
            <p className="text-plum/50 mt-4 text-base leading-relaxed max-w-md">
              Tips, guides, and honest reflections on fitness, nutrition, and the joy of dancing — written straight from the studio floor.
            </p>
          </div>

          {/* View all link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold font-mono text-plum border border-plum/20 px-5 py-2.5 rounded-full hover:bg-plum hover:text-cream transition-all duration-200 no-underline shrink-0 self-start sm:self-auto"
          >
            All articles
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* ── Card grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((article, i) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={i}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>

        {/* ── Load more ── */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-12"
          >
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="group inline-flex items-center gap-3 bg-lime text-plum font-bold text-sm px-8 py-3.5 rounded-full shadow-[0_8px_30px_rgba(200,240,60,0.25)] hover:bg-[#d4f94e] hover:shadow-[0_12px_40px_rgba(200,240,60,0.35)] hover:scale-[1.03] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-2"
            >
              Load more articles
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}

        {/* End of articles message */}
        {!hasMore && articles.length > PAGE_SIZE && (
          <p className="text-center text-plum/30 text-xs font-mono mt-10 tracking-widest uppercase">
            — That's everything so far —
          </p>
        )}
      </div>
    </section>
  );
}