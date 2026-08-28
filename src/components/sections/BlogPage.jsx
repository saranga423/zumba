import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, ArrowLeft, Clock, BookOpen, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import articles, { categoryColors } from "../../data/articlesData";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
// cream: #FAF4E9 | hibiscus: #E23F73 | mango: #FF9736 | plum: #2B1330 | lime: #C8F03C

const PAGE_SIZE = 6;
const ALL_CATS  = ["All", ...Object.keys(categoryColors)];

const CATEGORY_FALLBACK_IMAGES = {
  Zumba:     "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000",
  Fitness:   "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000",
  Nutrition: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1000",
  Lifestyle: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000",
  Wellness:  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000",
};
const DEFAULT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000";

function getArticleImage(article) {
  if (article.image) return article.image;
  return CATEGORY_FALLBACK_IMAGES[article.category] || DEFAULT_FALLBACK_IMAGE;
}

// ─── Shared tag pill ──────────────────────────────────────────────────────────
function TagPill({ tag, activeTag, onTagClick }) {
  const isActive = activeTag === tag;
  return (
    <button
      type="button"
      onClick={() => onTagClick(tag)}
      className="shrink-0 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer"
      style={
        isActive
          ? { backgroundColor: "#E23F73", color: "#FAF4E9" }
          : { backgroundColor: "rgba(43,19,48,0.07)", color: "rgba(43,19,48,0.45)" }
      }
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "rgba(226,63,115,0.12)";
          e.currentTarget.style.color = "#E23F73";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = "rgba(43,19,48,0.07)";
          e.currentTarget.style.color = "rgba(43,19,48,0.45)";
        }
      }}
    >
      #{tag}
    </button>
  );
}

// ─── Featured hero card ───────────────────────────────────────────────────────
function FeaturedCard({ article, prefersReduced, activeTag, onTagClick }) {
  const { bg, text } = categoryColors[article.category] ?? categoryColors.Zumba;
  const { ref, inView } = useInView({ triggerOnce: true });
  const imageUrl = getArticleImage(article);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-plum/8 hover:shadow-[0_30px_80px_rgba(43,19,48,0.14)] transition-all duration-400"
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-3xl z-20"
        style={{ background: `linear-gradient(to right, ${bg}, #FF9736)` }}
        aria-hidden="true"
      />

      <div className="grid lg:grid-cols-[1.2fr_1fr] min-h-100">
        {/* Cover */}
        <div className="relative h-64 lg:h-auto overflow-hidden bg-cream">
          <img
            src={imageUrl}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_FALLBACK_IMAGE; }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-plum/40 via-transparent to-transparent lg:hidden" />
          <span
            className="absolute top-4 left-4 text-[10px] font-mono font-bold tracking-[3px] uppercase px-3 py-1.5 rounded-full z-10 shadow-sm"
            style={{ backgroundColor: bg, color: text }}
          >
            ★ Featured
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-col justify-between p-8 lg:p-10 bg-white">
          <div>
            <span
              className="inline-block text-[10px] font-mono font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full mb-4"
              style={{ backgroundColor: bg + "20", color: bg }}
            >
              {article.category}
            </span>
            <h2 className="font-bricolage font-extrabold text-plum text-2xl sm:text-3xl lg:text-4xl leading-snug group-hover:text-hibiscus transition-colors duration-200">
              {article.title}
            </h2>
            <p className="text-plum/65 text-sm sm:text-base leading-relaxed mt-4 line-clamp-3">
              {article.excerpt}
            </p>

            {/* Tags */}
            {article.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {article.tags.map((tag) => (
                  <TagPill key={tag} tag={tag} activeTag={activeTag} onTagClick={onTagClick} />
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-8 pt-5 border-t border-plum/6">
            <div className="flex items-center gap-1.5 text-plum/40 text-xs font-mono font-semibold">
              <Clock size={12} />
              {article.readTime}
            </div>
            <Link
              to={`/blog/${article.slug}`}
              className="inline-flex items-center gap-2 bg-lime text-plum font-bold text-xs px-5 py-2.5 rounded-full hover:bg-[#d4f94e] hover:scale-105 transition-all duration-200 no-underline shadow-sm"
            >
              Read article
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Regular article card ─────────────────────────────────────────────────────
function ArticleCard({ article, index, prefersReduced, activeTag, onTagClick }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const { bg, text } = categoryColors[article.category] ?? categoryColors.Zumba;
  const imageUrl = getArticleImage(article);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: prefersReduced ? 0 : (index % PAGE_SIZE) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-plum/8 flex flex-col hover:shadow-[0_20px_55px_rgba(43,19,48,0.11)] transition-all duration-400"
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 rounded-t-2xl z-20"
        style={{ background: `linear-gradient(to right, ${bg}, #FF9736)` }}
        aria-hidden="true"
      />

      {/* Cover */}
      <div className="relative h-52 overflow-hidden bg-cream shrink-0">
        <img
          src={imageUrl}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_FALLBACK_IMAGE; }}
        />
        <span
          className="absolute top-3 left-3 text-[10px] font-mono font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full z-10 shadow-sm"
          style={{ backgroundColor: bg, color: text }}
        >
          {article.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-bricolage font-bold text-plum text-xl leading-snug group-hover:text-hibiscus transition-colors duration-200 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-plum/60 text-sm leading-relaxed mt-3 line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        {/* Tags */}
        {article.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {article.tags.slice(0, 3).map((tag) => (
              <TagPill key={tag} tag={tag} activeTag={activeTag} onTagClick={onTagClick} />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-plum/6">
          <div className="flex items-center gap-1.5 text-plum/40 text-xs font-mono font-medium">
            <Clock size={12} />
            {article.readTime}
          </div>
          <Link
            to={`/blog/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-hibiscus hover:text-plum transition-colors no-underline group/link"
          >
            Read article
            <ArrowRight size={13} className="transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main Blog Page ───────────────────────────────────────────────────────────
export default function BlogPage() {
  const prefersReduced = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag]           = useState(null);
  const [searchQuery, setSearchQuery]       = useState("");
  const [visible, setVisible]               = useState(PAGE_SIZE);

  // Stable derived slices (articles is a static import, deps = [])
  const featured    = useMemo(() => articles.find((a) => a.featured),  []);
  const nonFeatured = useMemo(() => articles.filter((a) => !a.featured), []);

  // Featured card is shown only when no active filters and on "All" tab
  const hasActiveFilter = !!searchQuery.trim() || !!activeTag;
  const showFeatured    = activeCategory === "All" && !hasActiveFilter && !!featured;

  const filtered = useMemo(() => {
    // When featured card shows separately, exclude it from the grid pool
    const pool = showFeatured ? nonFeatured : articles;

    let result = activeCategory !== "All"
      ? pool.filter((a) => a.category === activeCategory)
      : pool;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (activeTag) {
      result = result.filter((a) => a.tags?.includes(activeTag));
    }

    return result;
  }, [activeCategory, searchQuery, activeTag, showFeatured, nonFeatured]);

  const shown   = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActiveTag(null);
    setVisible(PAGE_SIZE);
    // intentionally keep searchQuery so search persists across category tabs
  };

  const handleTagClick = (tag) => {
    setActiveTag((prev) => (prev === tag ? null : tag)); // toggle
    setVisible(PAGE_SIZE);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveTag(null);
    setVisible(PAGE_SIZE);
  };

  return (
    <div className="min-h-screen bg-cream selection:bg-lime selection:text-plum">

      {/* ── PAGE HERO ─────────────────────────────────────────────────────────── */}
      <header className="relative bg-plum overflow-hidden pt-32 pb-24 px-6">
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=2000')` }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #FAF4E9 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
          aria-hidden="true"
        />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-100 bg-hibiscus/15 rounded-full blur-[130px] pointer-events-none" />

        {/* Back button */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            to="/#about"
            className="group inline-flex items-center gap-2 no-underline transition-all duration-200"
            style={{
              background: "rgba(250,244,233,0.08)",
              border: "1px solid rgba(250,244,233,0.14)",
              color: "rgba(250,244,233,0.60)",
              padding: "8px 16px",
              borderRadius: "9999px",
              fontSize: "11px",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#C8F03C";
              e.currentTarget.style.borderColor = "#C8F03C";
              e.currentTarget.style.color = "#2B1330";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(250,244,233,0.08)";
              e.currentTarget.style.borderColor = "rgba(250,244,233,0.14)";
              e.currentTarget.style.color = "rgba(250,244,233,0.60)";
            }}
          >
            <ArrowLeft size={13} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to Home
          </Link>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-hibiscus/15 border border-hibiscus/30 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <BookOpen size={12} className="text-hibiscus" />
            <span className="text-hibiscus text-[10px] font-mono font-bold tracking-[4px] uppercase">
              Hanna's Articles
            </span>
          </div>
          <h1 className="font-bricolage font-extrabold text-cream text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight">
            Move Better,{" "}
            <span style={{ WebkitTextStroke: "2px #E23F73", color: "transparent" }}>
              Live Better
            </span>
          </h1>
          <p className="text-cream/60 mt-6 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Tips, guides, and honest reflections on fitness, nutrition, and the joy of dancing — written straight from the studio floor.
          </p>
        </div>
      </header>

      {/* ── STICKY FILTER BAR ─────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-cream/90 backdrop-blur-md border-b border-plum/8 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">

          {/* Search row */}
          <div className="py-3 border-b border-plum/6 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search
                size={13}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-plum/30 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search articles, topics, tags…"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisible(PAGE_SIZE); }}
                className="w-full pl-9 pr-8 py-2 text-[12px] font-mono bg-white/70 border border-plum/12 rounded-full text-plum placeholder:text-plum/30 focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(""); setVisible(PAGE_SIZE); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-plum/30 hover:text-plum/70 transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Live result count */}
            {searchQuery.trim() && (
              <p className="text-[11px] font-mono text-plum/40 shrink-0 hidden sm:block">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Category pills row */}
          <div className="py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {ALL_CATS.map((cat) => {
              const isActive = cat === activeCategory;
              const { bg, text } =
                cat !== "All" ? categoryColors[cat] : { bg: "#2B1330", text: "#FAF4E9" };
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className="shrink-0 text-[11px] font-mono font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-2 cursor-pointer"
                  style={
                    isActive
                      ? { backgroundColor: bg, color: text }
                      : { backgroundColor: "transparent", color: "#2B133080", border: "1px solid #2B133018" }
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 py-16">

        {/* Featured card */}
        {showFeatured && (
          <div className="mb-14">
            <FeaturedCard
              article={featured}
              prefersReduced={prefersReduced}
              activeTag={activeTag}
              onTagClick={handleTagClick}
            />
          </div>
        )}

        {/* Metadata + active filter chips */}
        <div className="flex items-center justify-between mb-8 gap-3 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-plum/40 text-xs font-mono uppercase tracking-widest font-semibold">
              {activeCategory === "All" ? "All articles" : activeCategory}
              {" · "}
              <span className="text-plum/60">
                {filtered.length} post{filtered.length !== 1 ? "s" : ""}
              </span>
            </p>

            {/* Active tag chip (dismissible) */}
            {activeTag && (
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200"
                style={{ backgroundColor: "rgba(226,63,115,0.12)", color: "#E23F73" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#E23F73";
                  e.currentTarget.style.color = "#FAF4E9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(226,63,115,0.12)";
                  e.currentTarget.style.color = "#E23F73";
                }}
              >
                #{activeTag}
                <X size={10} />
              </button>
            )}

            {/* Search label */}
            {searchQuery.trim() && (
              <span className="text-plum/30 text-[11px] font-mono hidden sm:inline">
                matching "{searchQuery.trim()}"
              </span>
            )}
          </div>

          {/* Clear all */}
          {hasActiveFilter && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-[10px] font-mono text-plum/35 hover:text-hibiscus transition-colors cursor-pointer underline-offset-2 hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Articles grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${activeTag ?? ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {shown.map((article, i) => (
              <ArticleCard
                key={article.id || article.slug || i}
                article={article}
                index={i}
                prefersReduced={prefersReduced}
                activeTag={activeTag}
                onTagClick={handleTagClick}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-plum/5">
            <Search size={32} className="text-plum/20 mx-auto mb-4" />
            <p className="text-plum/40 font-mono text-sm mb-3">
              {searchQuery.trim()
                ? `No articles found for "${searchQuery.trim()}"`
                : activeTag
                ? `No articles tagged #${activeTag}`
                : "No articles in this category yet."}
            </p>
            {hasActiveFilter && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-mono font-bold text-hibiscus hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="flex justify-center mt-14">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="group inline-flex items-center gap-3 bg-lime text-plum font-bold text-sm px-8 py-3.5 rounded-full shadow-[0_8px_30px_rgba(200,240,60,0.25)] hover:bg-[#d4f94e] hover:shadow-[0_12px_40px_rgba(200,240,60,0.35)] hover:scale-[1.03] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-2 cursor-pointer"
            >
              Load more articles
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}

        {/* End of list */}
        {!hasMore && shown.length > 0 && filtered.length > PAGE_SIZE && (
          <p className="text-center text-plum/30 text-xs font-mono mt-14 tracking-widest uppercase font-semibold">
            — All caught up —
          </p>
        )}
      </main>

      {/* ── INSTAGRAM CTA BANNER ──────────────────────────────────────────────── */}
      <div className="relative bg-plum py-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 mix-blend-luminosity bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=2000')` }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-mango font-mono text-xs tracking-[4px] uppercase mb-4 font-bold">
            From the instructor
          </p>
          <h2 className="font-bricolage font-extrabold text-cream text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
            Questions? Topics you'd like covered?
          </h2>
          <p className="text-cream/60 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
            If there's a fitness, nutrition, or Zumba topic you'd love Hanna to write about, send her a message on Instagram.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://instagram.com/hannawaththalage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-lime text-plum font-bold text-sm px-7 py-3.5 rounded-full hover:bg-[#d4f94e] hover:scale-[1.03] transition-all duration-300 no-underline shadow-[0_10px_30px_rgba(200,240,60,0.20)]"
            >
              Message on Instagram
              <ArrowRight size={15} />
            </a>
            <Link
              to="/#about"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider no-underline transition-all duration-200"
              style={{
                color: "rgba(250,244,233,0.50)",
                padding: "14px 24px",
                border: "1px solid rgba(250,244,233,0.14)",
                borderRadius: "9999px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#FAF4E9";
                e.currentTarget.style.borderColor = "rgba(250,244,233,0.30)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(250,244,233,0.50)";
                e.currentTarget.style.borderColor = "rgba(250,244,233,0.14)";
              }}
            >
              <ArrowLeft size={13} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}