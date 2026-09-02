import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  BookOpen,
  Pencil,
  Flame,
  ChevronRight,
  Download,
  Loader2,
} from "lucide-react";
import articles, { categoryColors } from "../../data/articlesData";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
// cream: #FAF4E9 | hibiscus: #E23F73 | mango: #FF9736 | plum: #2B1330 | lime: #C8F03C

// ─── Instagram icon ───────────────────────────────────────────────────────────
function Instagram({ size = 24, style, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ─── WhatsApp icon ────────────────────────────────────────────────────────────
function WhatsApp({ size = 24, style, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={style}
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── WhatsApp share URL ───────────────────────────────────────────────────────
function whatsappShareURL(article) {
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${article.slug}`
      : `/blog/${article.slug}`;
  const message = encodeURIComponent(
    `"${article.title}" — by Hanna Waththalage\n\nRead it here: ${url}`
  );
  return `https://wa.me/?text=${message}`;
}

// ─── Load jsPDF from CDN (no npm install needed) ──────────────────────────────
function loadJsPDF() {
  return new Promise((resolve, reject) => {
    // If already loaded from a previous call, reuse it
    if (window.jspdf && window.jspdf.jsPDF) {
      resolve(window.jspdf.jsPDF);
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = () => {
      if (window.jspdf && window.jspdf.jsPDF) {
        resolve(window.jspdf.jsPDF);
      } else {
        reject(new Error("jsPDF did not attach to window.jspdf"));
      }
    };
    script.onerror = () => reject(new Error("Failed to load jsPDF from CDN"));
    document.head.appendChild(script);
  });
}

// ─── PDF generation ───────────────────────────────────────────────────────────
const generatePDF = async (article) => {
  const jsPDF = await loadJsPDF();
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // Page geometry
  const W = 210, H = 297;
  const ML = 22, MR = 22;
  const CW = W - ML - MR;           // 166 mm usable width
  const HEADER_H = 20;
  const FOOTER_Y = H - 16;
  const BODY_TOP = HEADER_H + 10;
  const BODY_BOTTOM = FOOTER_Y - 6;

  // Brand palette (RGB)
  const PLUM  = [43, 19, 48];
  const HIB   = [226, 63, 115];
  const MANGO = [255, 151, 54];
  const LIME  = [200, 240, 60];
  const CREAM = [250, 244, 233];
  const GRAY  = [140, 120, 145];
  const WMARK = [237, 234, 238];    // ghost-plum — barely-visible watermark

  let y  = BODY_TOP;
  let pg = 1;

  // ── Header ─────────────────────────────────────────────────────────────────
  function drawHeader() {
    // Dark plum bar
    doc.setFillColor(...PLUM);
    doc.rect(0, 0, W, HEADER_H, "F");

    // Tri-color accent strip at the bottom of the bar
    const stripH = 1.3, stripY = HEADER_H - stripH;
    doc.setFillColor(...HIB);   doc.rect(0,         stripY, W / 3, stripH, "F");
    doc.setFillColor(...MANGO); doc.rect(W / 3,     stripY, W / 3, stripH, "F");
    doc.setFillColor(...LIME);  doc.rect(2 * W / 3, stripY, W / 3, stripH, "F");

    // Brand name — left
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...CREAM);
    doc.text("ZUMBA WITH HANNA", ML, 12.5);

    // Separator dot
    doc.setFillColor(...HIB);
    doc.circle(ML + 51, 11.8, 0.9, "F");

    // Category — right
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...MANGO);
    doc.text(
      (article.category || "Article").toUpperCase(),
      W - MR, 12.5,
      { align: "right" }
    );

    y = BODY_TOP;
  }

  // ── Footer ─────────────────────────────────────────────────────────────────
  function drawFooter() {
    doc.setDrawColor(...HIB);
    doc.setLineWidth(0.3);
    doc.line(ML, FOOTER_Y, W - MR, FOOTER_Y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);

    // Left: copyright
    doc.setTextColor(...GRAY);
    doc.text(
      "\u00A9 Hanna Waththalage \u00B7 All Rights Reserved",
      ML, FOOTER_Y + 5
    );

    // Centre: Instagram handle (brand colour)
    doc.setTextColor(...HIB);
    doc.text("@hannawaththalage", W / 2, FOOTER_Y + 5, { align: "center" });

    // Right: page number
    doc.setTextColor(...GRAY);
    doc.text(`Page ${pg}`, W - MR, FOOTER_Y + 5, { align: "right" });
  }

  // ── Diagonal watermark ────────────────────────────────────────────────────
  function drawWatermark() {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(36);
    doc.setTextColor(...WMARK);
    doc.text("HANNA WATHTHALAGE", W / 2, H / 2, {
      align: "center",
      angle: 45,
    });
  }

  // ── Page break helper ─────────────────────────────────────────────────────
  function newPage() {
    drawFooter();
    drawWatermark();
    doc.addPage();
    pg++;
    drawHeader();
  }

  function checkBreak(needed) {
    if (y + needed > BODY_BOTTOM) newPage();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // First page — title block
  // ═══════════════════════════════════════════════════════════════════════════
  drawHeader();

  // Category pill
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  const catLabel = (article.category || "Article").toUpperCase();
  const catPillW = doc.getTextWidth(catLabel) + 8;
  doc.setFillColor(...HIB);
  doc.roundedRect(ML, y, catPillW, 6.5, 1.5, 1.5, "F");
  doc.setTextColor(...CREAM);
  doc.text(catLabel, ML + 4, y + 4.5);

  // Read time + date
  let mx = ML + catPillW + 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...GRAY);
  if (article.readTime) {
    doc.text(article.readTime, mx, y + 4.5);
    mx += doc.getTextWidth(article.readTime) + 4;
  }
  if (article.date) {
    doc.text(`\u00B7 ${article.date}`, mx, y + 4.5);
  }
  y += 14;

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...PLUM);
  const titleLines = doc.splitTextToSize(article.title, CW);
  checkBreak(titleLines.length * 9.5 + 5);
  doc.text(titleLines, ML, y);
  y += titleLines.length * 9.5 + 4;

  // Author byline
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(...GRAY);
  checkBreak(10);
  doc.text(
    "By Hanna Waththalage \u00B7 Zumba Instructor, Kandy, Sri Lanka",
    ML, y
  );
  y += 6;

  // Hibiscus accent bar below byline
  doc.setFillColor(...HIB);
  doc.rect(ML, y, 26, 0.5, "F");
  y += 8;

  // Excerpt (lead paragraph)
  if (article.excerpt) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(...PLUM);
    const exLines = doc.splitTextToSize(article.excerpt, CW);
    checkBreak(exLines.length * 7 + 8);
    doc.text(exLines, ML, y);
    y += exLines.length * 7 + 5;

    // Thin separator
    doc.setDrawColor(200, 195, 205);
    doc.setLineWidth(0.2);
    doc.line(ML, y, W - MR, y);
    y += 8;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Content blocks
  // ═══════════════════════════════════════════════════════════════════════════
  const renderContent = (content) => {
    if (!content) return;

    // Normalise: string → split on double newlines → array of paragraph blocks
    const blocks =
      typeof content === "string"
        ? content.split(/\n\n+/).map((t) => ({ type: "paragraph", text: t }))
        : Array.isArray(content)
        ? content
        : [];

    blocks.forEach((raw) => {
      const block =
        typeof raw === "string" ? { type: "paragraph", text: raw } : raw;
      if (!block) return;

      switch (block.type) {

        // Heading ────────────────────────────────────────────────────────────
        case "heading": {
          y += 4;
          doc.setFont("helvetica", "bold");
          doc.setFontSize(15);
          doc.setTextColor(...PLUM);
          const lines = doc.splitTextToSize(block.text, CW);
          checkBreak(lines.length * 8.5 + 5);
          doc.text(lines, ML, y);
          y += lines.length * 8.5 + 4;
          break;
        }

        // Subheading ─────────────────────────────────────────────────────────
        case "subheading": {
          y += 2;
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.setTextColor(...PLUM);
          const lines = doc.splitTextToSize(block.text, CW);
          checkBreak(lines.length * 7 + 4);
          doc.text(lines, ML, y);
          y += lines.length * 7 + 4;
          break;
        }

        // Paragraph ──────────────────────────────────────────────────────────
        case "paragraph": {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(...PLUM);
          const lines = doc.splitTextToSize(block.text, CW);
          checkBreak(lines.length * 6 + 5);
          doc.text(lines, ML, y);
          y += lines.length * 6 + 5;
          break;
        }

        // List ───────────────────────────────────────────────────────────────
        case "list": {
          (block.items || []).forEach((item) => {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(...PLUM);
            const lines = doc.splitTextToSize(item, CW - 8);
            checkBreak(lines.length * 6 + 3);
            // Hibiscus bullet dot
            doc.setFillColor(...HIB);
            doc.circle(ML + 2.5, y - 1.5, 1.1, "F");
            doc.text(lines, ML + 7, y);
            y += lines.length * 6 + 3;
          });
          y += 3;
          break;
        }

        // Tip ────────────────────────────────────────────────────────────────
        case "tip": {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9.5);
          const tipLines = doc.splitTextToSize(block.text, CW - 14);
          const boxH = tipLines.length * 6 + 18;
          checkBreak(boxH + 6);

          // Lime-tinted background box
          doc.setFillColor(240, 252, 215);
          doc.roundedRect(ML, y, CW, boxH, 2.5, 2.5, "F");

          // Green left-border bar
          doc.setFillColor(160, 200, 30);
          doc.rect(ML, y, 2.5, boxH, "F");

          // Label
          doc.setFont("helvetica", "bold");
          doc.setFontSize(7);
          doc.setTextColor(90, 140, 20);
          doc.text("HANNA'S TIP", ML + 8, y + 6.5);

          // Tip body
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9.5);
          doc.setTextColor(...PLUM);
          doc.text(tipLines, ML + 8, y + 13);

          y += boxH + 6;
          break;
        }

        // Quote ──────────────────────────────────────────────────────────────
        case "quote": {
          doc.setFont("helvetica", "bolditalic");
          doc.setFontSize(11);
          const qLines = doc.splitTextToSize(`"${block.text}"`, CW - 12);
          const authorH = block.author ? 10 : 0;
          const boxH = qLines.length * 7.5 + 10 + authorH;
          checkBreak(boxH + 6);

          // Hibiscus left-border
          doc.setFillColor(...HIB);
          doc.rect(ML, y, 3, boxH, "F");

          // Quote text
          doc.setTextColor(...PLUM);
          doc.text(qLines, ML + 9, y + 7);

          // Optional author attribution
          if (block.author) {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(7.5);
            doc.setTextColor(...GRAY);
            doc.text(
              `\u2014 ${block.author}`,
              ML + 9,
              y + qLines.length * 7.5 + 9
            );
          }

          y += boxH + 8;
          break;
        }

        default:
          break;
      }
    });
  };

  renderContent(article.content);

  // ── Last page: footer + watermark ────────────────────────────────────────
  drawFooter();
  drawWatermark();

  // Save with a branded filename
  doc.save(`${article.slug || "article"}-hanna-waththalage.pdf`);
};

// ─── Placeholder cover ────────────────────────────────────────────────────────
function PlaceholderCover({ category, large = false }) {
  const { bg } = categoryColors?.[category] ?? { bg: "#E23F73" };
  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: bg + "12" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${bg}22 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      <Pencil
        size={large ? 80 : 48}
        style={{ color: bg, opacity: 0.18 }}
        className="relative z-10"
      />
    </div>
  );
}

// ─── Article body renderer ────────────────────────────────────────────────────
function ArticleBody({ content }) {
  if (!content) {
    return (
      <div
        className="rounded-3xl p-10 text-center border border-dashed"
        style={{
          background: "rgba(226,63,115,0.04)",
          borderColor: "rgba(226,63,115,0.20)",
        }}
      >
        <Pencil
          size={32}
          className="mx-auto mb-4"
          style={{ color: "rgba(226,63,115,0.35)" }}
        />
        <p className="font-bricolage font-bold text-plum text-lg mb-2">
          Article coming soon
        </p>
        <p
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: "rgba(43,19,48,0.40)" }}
        >
          Hanna is working on this one — check back soon
        </p>
      </div>
    );
  }

  if (typeof content === "string") {
    return (
      <>
        {content.split(/\n\n+/).map((para, i) => (
          <p key={i} className="text-plum/75 leading-9 text-base sm:text-lg mb-7">
            {para}
          </p>
        ))}
      </>
    );
  }

  if (Array.isArray(content)) {
    return (
      <>
        {content.map((block, i) => {
          if (typeof block === "string") {
            return (
              <p key={i} className="text-plum/75 leading-9 text-base sm:text-lg mb-7">
                {block}
              </p>
            );
          }

          switch (block?.type) {
            case "heading":
              return (
                <h2
                  key={i}
                  className="font-bricolage font-extrabold text-plum text-2xl sm:text-3xl mt-14 mb-5 leading-snug"
                >
                  {block.text}
                </h2>
              );
            case "subheading":
              return (
                <h3
                  key={i}
                  className="font-bricolage font-bold text-plum text-xl mt-10 mb-4 leading-snug"
                >
                  {block.text}
                </h3>
              );
            case "paragraph":
              return (
                <p key={i} className="text-plum/75 leading-9 text-base sm:text-lg mb-7">
                  {block.text}
                </p>
              );
            case "list":
              return (
                <ul key={i} className="mb-8 space-y-3 pl-1">
                  {(block.items ?? []).map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-plum/75 text-base leading-7"
                    >
                      <span
                        className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: "#E23F73" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              );
            case "tip":
              return (
                <div
                  key={i}
                  className="my-10 rounded-2xl px-6 py-6 border-l-4"
                  style={{ background: "rgba(200,240,60,0.08)", borderColor: "#C8F03C" }}
                >
                  <p
                    className="font-mono text-[10px] font-bold tracking-[3px] uppercase mb-3"
                    style={{ color: "#C8F03C" }}
                  >
                    💡 Hanna's Tip
                  </p>
                  <p className="text-plum/80 text-sm leading-7">{block.text}</p>
                </div>
              );
            case "quote":
              return (
                <blockquote key={i} className="my-12 relative">
                  <div
                    className="absolute -left-2 top-0 bottom-0 w-1 rounded-full"
                    style={{ background: "linear-gradient(to bottom, #E23F73, #FF9736)" }}
                  />
                  <div className="pl-8">
                    <p className="font-bricolage font-bold text-plum text-xl sm:text-2xl leading-snug italic">
                      "{block.text}"
                    </p>
                    {block.author && (
                      <p className="font-mono text-[11px] text-plum/40 uppercase tracking-widest mt-4">
                        — {block.author}
                      </p>
                    )}
                  </div>
                </blockquote>
              );
            default:
              return null;
          }
        })}
      </>
    );
  }

  return null;
}

// ─── Related articles strip ───────────────────────────────────────────────────
function RelatedArticles({ current }) {
  const related = (articles || [])
    .filter(
      (a) =>
        a.slug?.toLowerCase() !== current.slug?.toLowerCase() &&
        a.category === current.category
    )
    .slice(0, 3);

  if (!related.length) return null;

  return (
    <section
      className="py-16 px-6 border-t"
      style={{ borderColor: "rgba(43,19,48,0.07)", backgroundColor: "#FAF4E9" }}
    >
      <div className="max-w-4xl mx-auto">
        <p
          className="font-mono text-[10px] font-bold tracking-[4px] uppercase mb-2"
          style={{ color: "rgba(43,19,48,0.35)" }}
        >
          More in {current.category}
        </p>
        <h3 className="font-bricolage font-extrabold text-plum text-2xl mb-8">
          You might also like
        </h3>
        <div className="grid sm:grid-cols-3 gap-5">
          {related.map((a) => {
            const { bg, text } = categoryColors?.[a.category] ?? { bg: "#E23F73", text: "#fff" };
            return (
              <Link
                key={a.id || a.slug}
                to={`/blog/${a.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden no-underline border hover:shadow-[0_16px_48px_rgba(43,19,48,0.10)] transition-all duration-300"
                style={{ borderColor: "rgba(43,19,48,0.07)" }}
              >
                <div className="relative h-32 overflow-hidden">
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <PlaceholderCover category={a.category} />
                  )}
                  <span
                    className="absolute top-2.5 left-2.5 text-[9px] font-mono font-bold tracking-[2px] uppercase px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: bg, color: text }}
                  >
                    {a.category}
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-bricolage font-bold text-plum text-sm leading-snug line-clamp-2 group-hover:text-hibiscus transition-colors">
                    {a.title}
                  </p>
                  <div
                    className="flex items-center gap-1 mt-3 font-mono text-[10px]"
                    style={{ color: "rgba(43,19,48,0.35)" }}
                  >
                    <Clock size={10} />
                    {a.readTime}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Main Blog Post Page ──────────────────────────────────────────────────────
export default function BlogPostPage() {
  const { slug } = useParams();
  const prefersReduced = useReducedMotion();
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [slug]);

  const normalizedSlug = slug?.toLowerCase().trim();
  const article = (articles || []).find(
    (a) => a.slug?.toLowerCase().trim() === normalizedSlug
  );

  // ── PDF handler ──────────────────────────────────────────────────────────
  const handleDownloadPDF = async () => {
    if (!article || isPdfGenerating) return;
    setIsPdfGenerating(true);
    try {
      await generatePDF(article);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Could not generate PDF. Please check your internet connection and try again.");
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // ── 404 ──────────────────────────────────────────────────────────────────
  if (!article) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6 px-6"
        style={{ backgroundColor: "#FAF4E9" }}
      >
        <p className="font-bricolage font-extrabold text-6xl text-plum">404</p>
        <p className="font-mono text-sm text-plum/50 uppercase tracking-widest">
          Article not found
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 bg-lime text-plum font-bold text-sm px-6 py-3 rounded-full no-underline hover:bg-[#d4f94e] transition-colors"
        >
          <ArrowLeft size={14} /> Back to blog
        </Link>
      </div>
    );
  }

  const { bg, text: badgeText } = categoryColors?.[article.category] ?? {
    bg: "#E23F73",
    text: "#fff",
  };
  const idx = articles.findIndex(
    (a) => a.slug?.toLowerCase().trim() === normalizedSlug
  );
  const prev = articles[idx - 1] ?? null;
  const next = articles[idx + 1] ?? null;

  return (
    <div
      className="min-h-screen selection:bg-lime selection:text-plum"
      style={{ backgroundColor: "#FAF4E9" }}
    >
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <header className="relative bg-plum overflow-hidden">
        <div
          className="relative w-full"
          style={{ height: "70vh", minHeight: 420, maxHeight: 680 }}
        >
          {article.image ? (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              style={{ opacity: 0.45 }}
            />
          ) : (
            <div className="w-full h-full" style={{ opacity: 0.5 }}>
              <PlaceholderCover category={article.category} large />
            </div>
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: [
                "linear-gradient(to top, rgba(43,19,48,1) 0%, rgba(43,19,48,0.65) 45%, rgba(43,19,48,0.1) 100%)",
                `radial-gradient(ellipse 60% 50% at 80% 20%, ${bg}22 0%, transparent 60%)`,
              ].join(", "),
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 40% 60% at 15% 80%, ${bg}18 0%, transparent 60%)`,
            }}
          />
        </div>

        {/* Back button */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 no-underline transition-all duration-200"
            style={{
              background: "rgba(43,19,48,0.55)",
              border: "1px solid rgba(250,244,233,0.15)",
              color: "rgba(250,244,233,0.70)",
              padding: "8px 18px",
              borderRadius: "9999px",
              fontSize: "11px",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              backdropFilter: "blur(14px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#C8F03C";
              e.currentTarget.style.borderColor = "#C8F03C";
              e.currentTarget.style.color = "#2B1330";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(43,19,48,0.55)";
              e.currentTarget.style.borderColor = "rgba(250,244,233,0.15)";
              e.currentTarget.style.color = "rgba(250,244,233,0.70)";
            }}
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
            All articles
          </Link>
        </div>

        {/* Breadcrumb */}
        <div
          className="absolute top-6 right-6 z-20 hidden sm:flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest"
          style={{ color: "rgba(250,244,233,0.30)" }}
        >
          <Link to="/" className="no-underline hover:text-cream/60 transition-colors" style={{ color: "inherit" }}>
            Home
          </Link>
          <ChevronRight size={10} />
          <Link to="/blog" className="no-underline hover:text-cream/60 transition-colors" style={{ color: "inherit" }}>
            Blog
          </Link>
          <ChevronRight size={10} />
          <span style={{ color: "rgba(250,244,233,0.55)" }}>{article.category}</span>
        </div>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 right-0 px-6 pb-12"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="text-[10px] font-mono font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full"
                style={{ backgroundColor: bg, color: badgeText }}
              >
                {article.category}
              </span>
              <div
                className="flex items-center gap-1.5 font-mono text-xs"
                style={{ color: "rgba(250,244,233,0.40)" }}
              >
                <Clock size={11} />
                {article.readTime}
              </div>
              {article.date && (
                <span
                  className="font-mono text-xs"
                  style={{ color: "rgba(250,244,233,0.28)" }}
                >
                  {article.date}
                </span>
              )}
            </div>

            <h1
              className="font-bricolage font-extrabold text-cream leading-[1.02] mb-5"
              style={{ fontSize: "clamp(2rem, 5.5vw, 3.75rem)" }}
            >
              {article.title}
            </h1>

            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bricolage font-bold text-sm shrink-0"
                style={{ background: "linear-gradient(135deg, #E23F73, #FF9736)", color: "#FAF4E9" }}
              >
                H
              </div>
              <div>
                <p className="font-mono text-xs font-bold" style={{ color: "rgba(250,244,233,0.75)" }}>
                  Hanna Waththalage
                </p>
                <p className="font-mono text-[10px]" style={{ color: "rgba(250,244,233,0.35)" }}>
                  Zumba Instructor · Kandy
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* ── ARTICLE LAYOUT ────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12 items-start">

          {/* Main body column */}
          <main>
            {article.excerpt && (
              <motion.p
                initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-bricolage text-xl sm:text-2xl font-semibold leading-9 mb-10 pb-10 border-b"
                style={{ color: "#2B1330", borderColor: "rgba(43,19,48,0.09)" }}
              >
                {article.excerpt}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              <ArticleBody content={article.content} />
            </motion.div>

            {/* ── Tags / share strip ──────────────────────────────────────── */}
            <div
              className="mt-14 pt-8 border-t flex flex-wrap items-center justify-between gap-4"
              style={{ borderColor: "rgba(43,19,48,0.08)" }}
            >
              {/* Tagged badge */}
              <div className="flex items-center gap-2">
                <span
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: "rgba(43,19,48,0.35)" }}
                >
                  Tagged:
                </span>
                <span
                  className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: bg + "18", color: bg }}
                >
                  {article.category}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 flex-wrap">

                {/* ── Share on WhatsApp ─────────────────────────────────── */}
                <a
                  href={whatsappShareURL(article)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs no-underline transition-all duration-200 px-4 py-2 rounded-full"
                  style={{
                    border: "1px solid rgba(37,211,102,0.30)",
                    color: "rgba(43,19,48,0.45)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#25D366";
                    e.currentTarget.style.color = "#128C7E";
                    e.currentTarget.style.background = "rgba(37,211,102,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(37,211,102,0.30)";
                    e.currentTarget.style.color = "rgba(43,19,48,0.45)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <WhatsApp size={13} /> Share on WhatsApp
                </a>

                {/* ── Download PDF ──────────────────────────────────────── */}
                <button
                  onClick={handleDownloadPDF}
                  disabled={isPdfGenerating}
                  className="inline-flex items-center gap-2 font-mono text-xs transition-all duration-200 px-4 py-2 rounded-full disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    border: "1px solid rgba(255,151,54,0.30)",
                    color: "rgba(43,19,48,0.45)",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isPdfGenerating) {
                      e.currentTarget.style.borderColor = "#FF9736";
                      e.currentTarget.style.color = "#CC7000";
                      e.currentTarget.style.background = "rgba(255,151,54,0.06)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,151,54,0.30)";
                    e.currentTarget.style.color = "rgba(43,19,48,0.45)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {isPdfGenerating ? (
                    <>
                      <Loader2 size={13} className="animate-spin" /> Generating…
                    </>
                  ) : (
                    <>
                      <Download size={13} /> Download PDF
                    </>
                  )}
                </button>

                {/* ── Share on Instagram ────────────────────────────────── */}
                <a
                  href="https://instagram.com/hannawaththalage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs no-underline transition-all duration-200 px-4 py-2 rounded-full"
                  style={{
                    border: "1px solid rgba(43,19,48,0.12)",
                    color: "rgba(43,19,48,0.45)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#E23F73";
                    e.currentTarget.style.color = "#E23F73";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(43,19,48,0.12)";
                    e.currentTarget.style.color = "rgba(43,19,48,0.45)";
                  }}
                >
                  <Instagram size={13} /> Share on Instagram
                </a>
              </div>
            </div>
          </main>

          {/* ── Sidebar ───────────────────────────────────────────────────── */}
          <aside className="hidden lg:flex flex-col gap-6 sticky top-24">
            {/* About Hanna */}
            <div
              className="bg-white rounded-2xl p-6 border"
              style={{ borderColor: "rgba(43,19,48,0.08)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bricolage font-extrabold text-xl mb-4"
                style={{ background: "linear-gradient(135deg, #E23F73, #FF9736)", color: "#FAF4E9" }}
              >
                H
              </div>
              <p className="font-bricolage font-bold text-plum text-base mb-1">
                Hanna Waththalage
              </p>
              <p
                className="font-mono text-[10px] uppercase tracking-widest mb-4"
                style={{ color: "rgba(43,19,48,0.40)" }}
              >
                Zumba Instructor · Kandy
              </p>
              <p className="text-plum/60 text-xs leading-6 mb-5">
                Certified Zumba instructor based in Kandy, Sri Lanka. Teaching
                at Resh Dance Studio and Nimal Senanayake Academy.
              </p>
              <a
                href="https://instagram.com/hannawaththalage"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider no-underline transition-all duration-200 w-full justify-center py-2.5 rounded-xl"
                style={{
                  background: "rgba(226,63,115,0.08)",
                  color: "#E23F73",
                  border: "1px solid rgba(226,63,115,0.20)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#E23F73";
                  e.currentTarget.style.color = "#FAF4E9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(226,63,115,0.08)";
                  e.currentTarget.style.color = "#E23F73";
                }}
              >
                <Instagram size={12} /> Follow on Instagram
              </a>
            </div>

            {/* Join a class */}
            <div
              className="rounded-2xl p-6 text-center"
              style={{
                background: "linear-gradient(135deg, #2B1330, #3d1f4a)",
                border: "1px solid rgba(200,240,60,0.20)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: "rgba(200,240,60,0.15)",
                  border: "1px solid rgba(200,240,60,0.30)",
                }}
              >
                <Flame size={18} style={{ color: "#C8F03C" }} />
              </div>
              <p className="font-bricolage font-bold text-cream text-base mb-2">
                Ready to dance?
              </p>
              <p className="font-mono text-[10px] text-cream/40 uppercase tracking-wider mb-5 leading-5">
                Join Hanna's classes in Kandy
              </p>
              <Link
                to="/#schedule"
                className="inline-flex items-center justify-center gap-2 w-full font-bold text-xs py-2.5 rounded-xl no-underline transition-all duration-200 hover:scale-[1.03]"
                style={{
                  background: "#C8F03C",
                  color: "#2B1330",
                  boxShadow: "0 6px 20px rgba(200,240,60,0.25)",
                }}
              >
                View Schedule <ArrowRight size={13} />
              </Link>
            </div>

            {/* Sidebar: Download PDF shortcut */}
            <button
              onClick={handleDownloadPDF}
              disabled={isPdfGenerating}
              className="w-full rounded-2xl p-5 text-left transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_8px_24px_rgba(255,151,54,0.12)]"
              style={{
                background: "rgba(255,151,54,0.05)",
                border: "1px solid rgba(255,151,54,0.18)",
              }}
              onMouseEnter={(e) => {
                if (!isPdfGenerating)
                  e.currentTarget.style.borderColor = "rgba(255,151,54,0.40)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,151,54,0.18)";
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                {isPdfGenerating ? (
                  <Loader2
                    size={16}
                    className="animate-spin shrink-0"
                    style={{ color: "#FF9736" }}
                  />
                ) : (
                  <Download size={16} className="shrink-0" style={{ color: "#FF9736" }} />
                )}
                <p className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: "#FF9736" }}>
                  {isPdfGenerating ? "Generating PDF…" : "Download PDF"}
                </p>
              </div>
              <p className="font-mono text-[10px] leading-5" style={{ color: "rgba(43,19,48,0.40)" }}>
                Branded copy with Hanna's name on every page
              </p>
            </button>

            {/* Reading time hint */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(43,19,48,0.04)",
                border: "1px solid rgba(43,19,48,0.07)",
              }}
            >
              <p
                className="font-mono text-[10px] uppercase tracking-widest mb-3"
                style={{ color: "rgba(43,19,48,0.35)" }}
              >
                In this article
              </p>
              <div className="flex items-center gap-2">
                <Clock size={11} style={{ color: "rgba(43,19,48,0.35)" }} />
                <span className="font-mono text-xs" style={{ color: "rgba(43,19,48,0.50)" }}>
                  {article.readTime}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── RELATED ARTICLES ──────────────────────────────────────────────── */}
      <RelatedArticles current={article} />

      {/* ── PREV / NEXT NAV ───────────────────────────────────────────────── */}
      {(prev || next) && (
        <div
          className="border-t px-6 py-12"
          style={{ borderColor: "rgba(43,19,48,0.07)", backgroundColor: "#FAF4E9" }}
        >
          <div className="max-w-4xl mx-auto">
            <p
              className="font-mono text-[10px] uppercase tracking-widest text-center mb-8"
              style={{ color: "rgba(43,19,48,0.30)" }}
            >
              Continue reading
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {prev ? (
                <Link
                  to={`/blog/${prev.slug}`}
                  className="group flex items-start gap-4 p-6 rounded-2xl no-underline transition-all duration-300 hover:shadow-[0_12px_40px_rgba(43,19,48,0.10)] hover:-translate-y-0.5"
                  style={{ background: "#fff", border: "1px solid rgba(43,19,48,0.07)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(226,63,115,0.08)" }}
                  >
                    <ArrowLeft size={16} style={{ color: "#E23F73" }} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: "rgba(43,19,48,0.35)" }}>
                      ← Previous
                    </p>
                    <p className="font-bricolage font-bold text-plum text-sm leading-snug line-clamp-2 group-hover:text-hibiscus transition-colors">
                      {prev.title}
                    </p>
                    <div className="flex items-center gap-1 mt-2 font-mono text-[10px]" style={{ color: "rgba(43,19,48,0.30)" }}>
                      <Clock size={9} />
                      {prev.readTime}
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {next && (
                <Link
                  to={`/blog/${next.slug}`}
                  className="group flex items-start gap-4 p-6 rounded-2xl no-underline text-right justify-end transition-all duration-300 hover:shadow-[0_12px_40px_rgba(43,19,48,0.10)] hover:-translate-y-0.5"
                  style={{ background: "#fff", border: "1px solid rgba(43,19,48,0.07)" }}
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: "rgba(43,19,48,0.35)" }}>
                      Next →
                    </p>
                    <p className="font-bricolage font-bold text-plum text-sm leading-snug line-clamp-2 group-hover:text-hibiscus transition-colors">
                      {next.title}
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-2 font-mono text-[10px]" style={{ color: "rgba(43,19,48,0.30)" }}>
                      <Clock size={9} />
                      {next.readTime}
                    </div>
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(226,63,115,0.08)" }}
                  >
                    <ArrowRight size={16} style={{ color: "#E23F73" }} />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER CTA ────────────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: "#2B1330" }}>
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, #FAF4E9 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-50 pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(226,63,115,0.12) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 py-20 px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(226,63,115,0.15)", border: "1px solid rgba(226,63,115,0.25)" }}
                >
                  <BookOpen size={16} style={{ color: "#E23F73" }} />
                </div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(200,240,60,0.12)", border: "1px solid rgba(200,240,60,0.25)" }}
                >
                  <Flame size={20} style={{ color: "#C8F03C" }} />
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,151,54,0.15)", border: "1px solid rgba(255,151,54,0.25)" }}
                >
                  <Instagram size={16} style={{ color: "#FF9736" }} />
                </div>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[5px] mb-4" style={{ color: "rgba(250,244,233,0.30)" }}>
                From Hanna's studio
              </p>
              <h2 className="font-bricolage font-extrabold text-cream text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
                Keep Moving.
                <br />
                <span style={{ WebkitTextStroke: "1.5px #E23F73", color: "transparent" }}>
                  Keep Reading.
                </span>
              </h2>
              <p className="text-cream/45 text-sm leading-relaxed max-w-md mx-auto mb-10">
                More articles on Zumba, fitness, and nutrition are on the way.
                Follow Hanna on Instagram so you never miss one.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-full no-underline transition-all duration-200 hover:scale-[1.03]"
                  style={{ background: "#C8F03C", color: "#2B1330", boxShadow: "0 8px 28px rgba(200,240,60,0.22)" }}
                >
                  Browse all articles <ArrowRight size={14} />
                </Link>
                <a
                  href="https://instagram.com/hannawaththalage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-6 py-3.5 rounded-full no-underline transition-all duration-200"
                  style={{
                    background: "rgba(250,244,233,0.06)",
                    border: "1px solid rgba(250,244,233,0.12)",
                    color: "rgba(250,244,233,0.50)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#FAF4E9";
                    e.currentTarget.style.borderColor = "rgba(250,244,233,0.30)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(250,244,233,0.50)";
                    e.currentTarget.style.borderColor = "rgba(250,244,233,0.12)";
                  }}
                >
                  <Instagram size={13} /> Follow @hannawaththalage
                </a>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-6 py-3.5 rounded-full no-underline transition-all duration-200"
                  style={{
                    background: "rgba(250,244,233,0.04)",
                    border: "1px solid rgba(250,244,233,0.08)",
                    color: "rgba(250,244,233,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#FAF4E9";
                    e.currentTarget.style.borderColor = "rgba(250,244,233,0.20)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(250,244,233,0.35)";
                    e.currentTarget.style.borderColor = "rgba(250,244,233,0.08)";
                  }}
                >
                  <ArrowLeft size={13} /> Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}