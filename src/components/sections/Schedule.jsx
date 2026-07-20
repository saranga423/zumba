/* eslint-disable no-empty */
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { User, Clock3, X, Share2, Check, Search, Filter, Calendar } from "lucide-react";

// ─── Fonts ─────────────────────────────────────────────────────────────────
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=Lora:ital,wght@0,400;0,500;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-body    { font-family: 'Lora', serif; }
    .font-mono    { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

// ─── Data ──────────────────────────────────────────────────────────────────
const scheduleData = [
  { id: 1,  name: "Zumba Fitness", day: "Mon", dayFull: "Monday",    time: "6:00 PM – 7:00 PM",   startH: 18.0,  durationH: 1,    level: "All levels",  spots: 4,  capacity: 20, description: "High-energy Latin dance cardio — no experience needed. Just bring your energy and we'll take care of the rest." },
  { id: 2,  name: "Zumba Gold",    day: "Mon", dayFull: "Monday",    time: "10:00 AM – 11:00 AM", startH: 10.0,  durationH: 1,    level: "Beginner",    spots: 12, capacity: 15, description: "A lower-impact version of Zumba designed for active older adults. Same great music, gentler on the joints." },
  { id: 3,  name: "Strong Nation", day: "Tue", dayFull: "Tuesday",   time: "7:00 PM – 8:00 PM",   startH: 19.0,  durationH: 1,    level: "Intermediate", spots: 2,  capacity: 18, description: "Muscle-conditioning workout where every squat, lunge, and crunch is synced to original music." },
  { id: 4,  name: "Aqua Zumba",    day: "Wed", dayFull: "Wednesday", time: "8:00 AM – 9:00 AM",   startH: 8.0,   durationH: 1,    level: "All levels",  spots: 8,  capacity: 12, description: "Pool-based Zumba class. Resistance of water makes it a full-body workout that's gentle on joints." },
  { id: 5,  name: "Zumba Fitness", day: "Wed", dayFull: "Wednesday", time: "6:30 PM – 7:30 PM",   startH: 18.5,  durationH: 1,    level: "All levels",  spots: 0,  capacity: 20, description: "Mid-week energy boost. Same infectious rhythms, same great vibe." },
  { id: 6,  name: "Zumba Toning",  day: "Thu", dayFull: "Thursday",  time: "5:30 PM – 6:30 PM",   startH: 17.5,  durationH: 1,    level: "Intermediate", spots: 6,  capacity: 16, description: "Dance fitness with light toning sticks to sculpt and tone while you dance." },
  { id: 8,  name: "Zumba Fitness", day: "Fri", dayFull: "Friday",    time: "6:00 PM – 7:00 PM",   startH: 18.0,  durationH: 1,    level: "All levels",  spots: 1,  capacity: 20, description: "End the week with a bang. Friday night energy hits different." },
  { id: 9,  name: "Masterclass",   day: "Sat", dayFull: "Saturday",  time: "9:00 AM – 10:30 AM",  startH: 9.0,   durationH: 1.5,  level: "All levels",  spots: 3,  capacity: 25, description: "Monthly special session with a guest instructor. Choreography, performance tips, and pure fun." },
  { id: 10, name: "Zumba Fitness", day: "Sat", dayFull: "Saturday",  time: "11:00 AM – 12:00 PM", startH: 11.0,  durationH: 1,    level: "All levels",  spots: 9,  capacity: 20, description: "Weekend morning class. Start your Saturday moving to the beat." },
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ─── Palette ───────────────────────────────────────────────────────────────
const accentColor = { text: "text-[#c084fc]", bg: "bg-[#c084fc]", border: "border-[#c084fc]", ring: "#c084fc", hex: "#c084fc" };

function getAccent() {
  return accentColor;
}

function spotsInfo(spots, capacity) {
  const fill = (capacity - spots) / capacity;
  if (spots === 0) return { text: "Full",    urgent: true,  fill };
  if (spots <= 3)  return { text: `${spots} left`, urgent: true,  fill };
  return                  { text: `${spots} open`, urgent: false, fill };
}

// ─── SpotsPunch ───────────────────────────────────────────────────────────────
function SpotsPunch({ spots, capacity, accent, size = 40 }) {
  const { text, urgent, fill } = spotsInfo(spots, capacity);
  const r = 15, circ = 2 * Math.PI * r;
  const color = urgent ? "#f87171" : accent.ring;
  return (
    <div className="flex items-center gap-2 shrink-0">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 40 40" width={size} height={size} className="-rotate-90">
          <circle cx="20" cy="20" r={r} fill="none" stroke="#2e303a" strokeWidth="2.5" />
          <motion.circle cx="20" cy="20" r={r} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ * (1 - fill) }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] text-[#f3f4f6]">{capacity-spots}/{capacity}</span>
      </div>
      <span className={`font-mono text-[11px] uppercase tracking-wider hidden sm:inline ${urgent ? "text-[#f87171]" : "text-[#9ca3af]"}`}>{text}</span>
    </div>
  );
}

// ─── ShareButton ─────────────────────────────────────────────────────────────
function ShareButton({ cls }) {
  const [copied, setCopied] = useState(false);
  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}#schedule-class-${cls.id}`;
    try {
      if (navigator.share) await navigator.share({ title: cls.name, text: `${cls.name} — ${cls.dayFull} ${cls.time}`, url });
      else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    } catch {}
  }, [cls]);
  return (
    <button onClick={handleShare} aria-label={copied ? "Link copied" : "Share this class"}
      className="flex items-center gap-1.5 rounded-none px-2.5 py-1.5 border border-[#2e303a] text-[#9ca3af] font-mono text-[10px] uppercase tracking-wider hover:border-[#c084fc]/50 hover:text-[#f3f4f6] transition-all">
      <AnimatePresence mode="wait" initial={false}>
        {copied
          ? <span className="flex items-center gap-1 text-[#4ade80]"><Check size={11}/>Copied</span>
          : <span className="flex items-center gap-1"><Share2 size={11}/>Share</span>
        }
      </AnimatePresence>
    </button>
  );
}

// ─── DetailModal ─────────────────────────────────────────────────────────────
function DetailModal({ cls, onClose }) {
  useEffect(() => {
    if (!cls) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cls, onClose]);

  if (!cls) return null;
  const accent = getAccent();
  const isFull = cls.spots === 0;

  return (
    <AnimatePresence>
      {cls && (
        <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={onClose} aria-hidden="true"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]" />
          <motion.div role="dialog" aria-modal="true" aria-label={`Class details: ${cls.name}`}
            initial={{opacity:0,y:16,scale:0.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10,scale:0.98}}
            transition={{duration:0.2,ease:"easeOut"}}
            className="fixed z-50 inset-x-4 top-[10vh] mx-auto max-w-xl bg-[#16171d] border border-[#2e303a] max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className={`flex items-center justify-between px-6 py-4 border-b border-[#2e303a]`}>
              <span className={`font-mono text-[11px] uppercase tracking-[0.2em] ${accent.text}`}>{cls.dayFull}</span>
              <div className="flex items-center gap-3">
                <ShareButton cls={cls} />
                <button onClick={onClose} aria-label="Close class detail" className="p-1 text-[#9ca3af] hover:text-[#f3f4f6]"><X size={18}/></button>
              </div>
            </div>
            <div className="px-6 py-6">
              <h4 className="font-display italic text-3xl font-medium text-[#f3f4f6] mb-3">{cls.name}</h4>
              <p className="font-body text-[#9ca3af] text-sm leading-relaxed mb-6">{cls.description}</p>
              <div className="grid grid-cols-2 border border-[#2e303a] mb-6">
                {[{label:"Time",value:cls.time,icon:Clock3},{label:"Level",value:cls.level,icon:User}].map(({label,value,icon:Icon},i) => (
                  <div key={label} className={`px-4 py-3 flex flex-col gap-1 bg-[#1f2028] ${i>0?"border-l border-[#2e303a]":""}`}>
                    <Icon size={13} className={accent.text} aria-hidden="true"/>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-[#9ca3af]">{label}</p>
                    <p className="font-body text-xs font-medium text-[#f3f4f6]">{value}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mb-6">
                <SpotsPunch spots={cls.spots} capacity={cls.capacity} accent={accent} size={48}/>
              </div>
              <button disabled={isFull}
                className={`w-full py-3.5 font-mono text-[12px] uppercase tracking-[0.15em] font-medium transition-all ${isFull?"bg-[#2e303a] text-[#9ca3af] cursor-not-allowed":"bg-[#c084fc] text-[#16171d] hover:opacity-90"}`}>
                {isFull ? "Class full — join waitlist" : "Reserve a spot"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Schedule Component Alternative ──────────────────────────────────────────
export default function ScheduleAlternative() {
  const [activeDay, setActiveDay] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const availableLevels = ["All", ...Array.from(new Set(scheduleData.map(c => c.level)))];

  const filtered = scheduleData.filter(c => {
    const matchesDay = activeDay === "All" || c.day === activeDay;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === "All" || c.level === selectedLevel;
    return matchesDay && matchesSearch && matchesLevel;
  });

  const openCls = openId ? scheduleData.find(c => c.id === openId) ?? null : null;
  const accent = getAccent();

  return (
    <section id="schedule-alt" ref={ref} className="relative py-24 px-4 sm:px-6 bg-[#16171d] text-[#f3f4f6]">
      <FontImport />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="max-w-4xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#c084fc] mb-2">Weekly Programme</p>
          <h2 className="font-display italic text-4xl sm:text-5xl font-medium text-[#f3f4f6]">Class Sessions</h2>
        </div>

        {/* Search & Level Filter Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <div className="relative flex-1 w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#9ca3af]/60"><Search size={15}/></span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by class name or vibe..."
              className="w-full pl-9 pr-4 py-2.5 bg-[#1f2028] border border-[#2e303a] font-body text-sm text-[#f3f4f6] placeholder-[#9ca3af]/50 focus:outline-none focus:border-[#c084fc]"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="font-mono text-[11px] uppercase text-[#9ca3af] flex items-center gap-1 shrink-0"><Filter size={12}/> Level:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-[#1f2028] border border-[#2e303a] font-mono text-[11px] uppercase text-[#f3f4f6] px-3 py-2.5 focus:outline-none flex-1 sm:flex-none cursor-pointer"
            >
              {availableLevels.map(lvl => <option key={lvl} value={lvl} className="bg-[#1f2028]">{lvl}</option>)}
            </select>
          </div>
        </div>

        {/* Day Selector Pill Buttons */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 -mx-4 px-4 sm:mx-0">
          {["All", ...WEEK_DAYS].map(day => {
            const isSel = activeDay === day;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 shrink-0 ${
                  isSel ? "bg-[#c084fc] text-[#16171d] font-semibold" : "bg-[#1f2028] border border-[#2e303a] text-[#9ca3af] hover:border-[#c084fc]/50 hover:text-[#f3f4f6]"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Responsive List of Cards */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map(cls => {
                const isFull = cls.spots === 0;
                return (
                  <motion.div
                    key={cls.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#1f2028] border border-[#2e303a] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#c084fc]/50 transition-colors cursor-pointer group"
                    onClick={() => setOpenId(cls.id)}
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className={`w-2.5 h-10 sm:h-12 shrink-0 bg-[#c084fc]`} />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-mono text-[10px] uppercase tracking-widest text-[#c084fc]`}>{cls.dayFull}</span>
                          <span className="text-[#9ca3af]/30">•</span>
                          <span className="font-mono text-[10px] uppercase text-[#9ca3af]">{cls.level}</span>
                        </div>
                        <h3 className="font-display italic text-xl font-medium text-[#f3f4f6] group-hover:translate-x-1 transition-transform">{cls.name}</h3>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-[#9ca3af] font-body">
                          <span className="flex items-center gap-1"><Clock3 size={12} className="text-[#c084fc]"/> {cls.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#2e303a]">
                      <SpotsPunch spots={cls.spots} capacity={cls.capacity} accent={accent} size={42} />
                      <button 
                        className={`px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-all ${
                          isFull ? "bg-[#2e303a] text-[#9ca3af]" : "bg-[#c084fc] text-[#16171d] font-semibold hover:opacity-90"
                        }`}
                        onClick={(e) => { e.stopPropagation(); setOpenId(cls.id); }}
                      >
                        {isFull ? "Waitlist" : "View Details"}
                      </button>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="border border-dashed border-[#2e303a] py-16 text-center bg-[#1f2028]">
                <Calendar size={28} className="mx-auto text-[#9ca3af]/40 mb-2"/>
                <p className="font-display italic text-2xl text-[#f3f4f6] mb-1">No sessions match filters</p>
                <p className="font-body text-xs text-[#9ca3af] mb-4">Try altering your search keywords or choosing another day.</p>
                <button onClick={() => { setActiveDay("All"); setSearchQuery(""); setSelectedLevel("All"); }}
                  className="font-mono text-[11px] uppercase underline text-[#c084fc]">
                  Reset filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>

      <DetailModal cls={openCls} onClose={() => setOpenId(null)} />
    </section>
  );
}