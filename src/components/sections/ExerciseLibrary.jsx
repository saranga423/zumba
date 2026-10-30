import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowUpRight, Clock3, Dumbbell, Search, X } from 'lucide-react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import { exerciseCategories, exercises } from '../../data/exercises'
import './ExerciseLibrary.css'

const levels = ['All levels', 'Beginner', 'Intermediate', 'Advanced']

const poses = {
  march: [
    { head: [110, 42], shoulder: [110, 72], hip: [110, 126], leftElbow: [87, 94], leftHand: [86, 116], rightElbow: [134, 87], rightHand: [137, 108], leftKnee: [99, 158], leftFoot: [92, 192], rightKnee: [124, 157], rightFoot: [132, 190] },
    { head: [110, 42], shoulder: [110, 72], hip: [110, 126], leftElbow: [88, 87], leftHand: [87, 108], rightElbow: [133, 95], rightHand: [135, 117], leftKnee: [96, 155], leftFoot: [89, 190], rightKnee: [120, 144], rightFoot: [138, 126] },
  ],
  jack: [
    { head: [110, 42], shoulder: [110, 72], hip: [110, 126], leftElbow: [88, 85], leftHand: [75, 105], rightElbow: [132, 85], rightHand: [145, 105], leftKnee: [98, 158], leftFoot: [88, 192], rightKnee: [122, 158], rightFoot: [132, 192] },
    { head: [110, 42], shoulder: [110, 72], hip: [110, 126], leftElbow: [81, 55], leftHand: [77, 29], rightElbow: [139, 55], rightHand: [143, 29], leftKnee: [78, 151], leftFoot: [54, 177], rightKnee: [142, 151], rightFoot: [166, 177] },
  ],
  dance: [
    { head: [110, 42], shoulder: [110, 72], hip: [110, 126], leftElbow: [87, 77], leftHand: [68, 61], rightElbow: [137, 98], rightHand: [153, 113], leftKnee: [96, 158], leftFoot: [83, 190], rightKnee: [127, 154], rightFoot: [140, 182] },
    { head: [110, 42], shoulder: [110, 72], hip: [110, 126], leftElbow: [81, 96], leftHand: [62, 110], rightElbow: [134, 73], rightHand: [149, 54], leftKnee: [91, 157], leftFoot: [79, 181], rightKnee: [126, 158], rightFoot: [145, 191] },
  ],
  squat: [
    { head: [110, 42], shoulder: [110, 72], hip: [110, 126], leftElbow: [87, 96], leftHand: [76, 116], rightElbow: [133, 96], rightHand: [144, 116], leftKnee: [99, 158], leftFoot: [91, 192], rightKnee: [122, 158], rightFoot: [130, 192] },
    { head: [110, 58], shoulder: [110, 88], hip: [110, 137], leftElbow: [84, 103], leftHand: [72, 113], rightElbow: [136, 103], rightHand: [148, 113], leftKnee: [78, 151], leftFoot: [67, 181], rightKnee: [144, 151], rightFoot: [155, 181] },
  ],
  lunge: [
    { head: [110, 42], shoulder: [110, 72], hip: [110, 126], leftElbow: [87, 94], leftHand: [84, 115], rightElbow: [133, 94], rightHand: [136, 115], leftKnee: [100, 158], leftFoot: [93, 192], rightKnee: [122, 158], rightFoot: [130, 192] },
    { head: [111, 58], shoulder: [111, 88], hip: [111, 140], leftElbow: [88, 109], leftHand: [82, 130], rightElbow: [134, 109], rightHand: [140, 130], leftKnee: [84, 163], leftFoot: [68, 184], rightKnee: [145, 143], rightFoot: [158, 177] },
  ],
  pushup: [
    { head: [56, 95], shoulder: [78, 110], hip: [127, 137], leftElbow: [72, 126], leftHand: [65, 143], rightElbow: [75, 128], rightHand: [70, 145], leftKnee: [151, 145], leftFoot: [177, 152], rightKnee: [151, 145], rightFoot: [180, 152] },
    { head: [56, 102], shoulder: [78, 116], hip: [127, 137], leftElbow: [70, 132], leftHand: [64, 148], rightElbow: [76, 136], rightHand: [70, 151], leftKnee: [151, 145], leftFoot: [177, 152], rightKnee: [151, 145], rightFoot: [180, 152] },
  ],
  wall: [
    { head: [94, 43], shoulder: [94, 73], hip: [89, 128], leftElbow: [116, 77], leftHand: [139, 77], rightElbow: [117, 84], rightHand: [139, 84], leftKnee: [82, 159], leftFoot: [77, 191], rightKnee: [104, 159], rightFoot: [109, 191] },
    { head: [100, 50], shoulder: [100, 80], hip: [91, 131], leftElbow: [119, 89], leftHand: [139, 89], rightElbow: [121, 96], rightHand: [139, 96], leftKnee: [82, 160], leftFoot: [77, 191], rightKnee: [104, 160], rightFoot: [109, 191] },
  ],
  plank: [
    { head: [43, 110], shoulder: [66, 122], hip: [126, 127], leftElbow: [59, 144], leftHand: [46, 151], rightElbow: [61, 144], rightHand: [48, 152], leftKnee: [153, 127], leftFoot: [182, 134], rightKnee: [153, 127], rightFoot: [182, 134] },
    { head: [43, 110], shoulder: [66, 122], hip: [126, 127], leftElbow: [59, 144], leftHand: [46, 151], rightElbow: [61, 144], rightHand: [48, 152], leftKnee: [153, 127], leftFoot: [182, 134], rightKnee: [153, 127], rightFoot: [182, 134] },
  ],
  climber: [
    { head: [43, 76], shoulder: [66, 92], hip: [125, 112], leftElbow: [60, 117], leftHand: [51, 140], rightElbow: [69, 117], rightHand: [60, 140], leftKnee: [149, 113], leftFoot: [179, 120], rightKnee: [153, 122], rightFoot: [183, 130] },
    { head: [43, 76], shoulder: [66, 92], hip: [125, 112], leftElbow: [60, 117], leftHand: [51, 140], rightElbow: [69, 117], rightHand: [60, 140], leftKnee: [96, 108], leftFoot: [81, 91], rightKnee: [153, 122], rightFoot: [183, 130] },
  ],
  knees: [
    { head: [110, 42], shoulder: [110, 72], hip: [110, 126], leftElbow: [86, 86], leftHand: [81, 107], rightElbow: [135, 98], rightHand: [141, 118], leftKnee: [98, 158], leftFoot: [90, 191], rightKnee: [122, 157], rightFoot: [130, 191] },
    { head: [110, 42], shoulder: [110, 72], hip: [110, 126], leftElbow: [87, 97], leftHand: [82, 117], rightElbow: [135, 83], rightHand: [141, 104], leftKnee: [94, 157], leftFoot: [87, 190], rightKnee: [131, 136], rightFoot: [148, 122] },
  ],
  stretch: [
    { head: [110, 42], shoulder: [110, 72], hip: [110, 126], leftElbow: [86, 94], leftHand: [80, 115], rightElbow: [134, 94], rightHand: [140, 115], leftKnee: [99, 158], leftFoot: [92, 192], rightKnee: [122, 158], rightFoot: [130, 192] },
    { head: [101, 42], shoulder: [102, 72], hip: [110, 126], leftElbow: [81, 51], leftHand: [77, 24], rightElbow: [129, 55], rightHand: [137, 30], leftKnee: [99, 158], leftFoot: [92, 192], rightKnee: [122, 158], rightFoot: [130, 192] },
  ],
}

function Pose({ pose }) {
  const limbs = [
    ['shoulder', 'leftElbow'], ['leftElbow', 'leftHand'],
    ['shoulder', 'rightElbow'], ['rightElbow', 'rightHand'],
    ['hip', 'leftKnee'], ['leftKnee', 'leftFoot'],
    ['hip', 'rightKnee'], ['rightKnee', 'rightFoot'],
    ['shoulder', 'hip'],
  ]

  return (
    <g className="exercise-pose">
      {limbs.map(([from, to]) => (
        <line key={`${from}-${to}`} x1={pose[from][0]} y1={pose[from][1]} x2={pose[to][0]} y2={pose[to][1]} />
      ))}
      <circle cx={pose.head[0]} cy={pose.head[1]} r="11" className="exercise-figure-head" />
      <circle cx={pose.shoulder[0]} cy={pose.shoulder[1]} r="5" className="exercise-figure-joint" />
      <circle cx={pose.hip[0]} cy={pose.hip[1]} r="5" className="exercise-figure-joint" />
    </g>
  )
}

function ExerciseAnimation({ exercise }) {
  const exercisePoses = poses[exercise.animation] ?? poses.march

  return (
    <div className={`exercise-art exercise-art--${exercise.animation}`} style={{ '--art-color': exercise.color }} aria-label={`${exercise.name} movement illustration`}>
      <span className="exercise-art-label">MOVEMENT GUIDE</span>
      <svg viewBox="0 0 220 210" role="img" aria-hidden="true">
        <ellipse cx="110" cy="193" rx="66" ry="7" className="exercise-art-shadow" />
        {exercise.animation === 'wall' && <line x1="148" y1="25" x2="148" y2="184" className="exercise-art-wall" />}
        <g className="exercise-pose exercise-pose--first"><Pose pose={exercisePoses[0]} /></g>
        <g className="exercise-pose exercise-pose--second"><Pose pose={exercisePoses[1]} /></g>
      </svg>
      <span className="exercise-art-loop"><span /> LOOPING DEMO</span>
    </div>
  )
}

function ExerciseModal({ exercise, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="exercise-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="exercise-modal" role="dialog" aria-modal="true" aria-labelledby="exercise-modal-title">
        <button className="exercise-modal-close" type="button" onClick={onClose} aria-label="Close exercise details"><X size={20} /></button>
        <div className="exercise-modal-art"><ExerciseAnimation exercise={exercise} /></div>
        <div className="exercise-modal-content">
          <div className="exercise-eyebrow">{exercise.category} <span>·</span> {exercise.level}</div>
          <h2 id="exercise-modal-title">{exercise.name}</h2>
          <p className="exercise-modal-muscles">Targets {exercise.muscles.join(', ')}</p>
          <div className="exercise-stats">
            <div><span>REPS</span><strong>{exercise.reps}</strong></div>
            <div><span>SETS</span><strong>{exercise.sets}</strong></div>
            <div><span>REST</span><strong>{exercise.rest}</strong></div>
            <div><span>DURATION</span><strong>{exercise.duration}</strong></div>
          </div>
          <div className="exercise-modal-sections">
            <div>
              <h3>How to do it</h3>
              <ol>{exercise.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}</ol>
            </div>
            <div className="exercise-modal-meta">
              <p><Dumbbell size={16} /><span><b>Equipment</b>{exercise.equipment}</span></p>
              <p><span className="exercise-meta-mark">+</span><span><b>Benefits</b>{exercise.benefits}</span></p>
              <p className="exercise-safety"><span className="exercise-meta-mark">!</span><span><b>Safety first</b>{exercise.safety}</span></p>
            </div>
          </div>
          <p className="exercise-disclaimer">Move at your own pace. Stop if you feel pain, and check with a healthcare professional if you have concerns before exercising.</p>
        </div>
      </section>
    </div>
  )
}

function ExerciseCard({ exercise, onSelect, index }) {
  return (
    <article className="exercise-card" style={{ '--card-index': index }}>
      <ExerciseAnimation exercise={exercise} />
      <div className="exercise-card-content">
        <div className="exercise-card-eyebrow"><span>{exercise.category}</span><span className={`exercise-level exercise-level--${exercise.level.toLowerCase()}`}>{exercise.level}</span></div>
        <h2>{exercise.name}</h2>
        <p className="exercise-card-muscles">{exercise.muscles.join(' · ')}</p>
        <div className="exercise-card-footer">
          <span><Clock3 size={15} />{exercise.duration}</span>
          <button type="button" onClick={() => onSelect(exercise)} aria-label={`View ${exercise.name} instructions`}>
            View guide <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </article>
  )
}

export default function ExerciseLibrary() {
  const [activeCategory, setActiveCategory] = useState('All exercises')
  const [activeLevel, setActiveLevel] = useState('All levels')
  const [search, setSearch] = useState('')
  const [selectedExercise, setSelectedExercise] = useState(null)

  const filteredExercises = useMemo(() => {
    const query = search.trim().toLowerCase()
    return exercises.filter((exercise) => {
      const matchesCategory = activeCategory === 'All exercises' || exercise.category === activeCategory
      const matchesLevel = activeLevel === 'All levels' || exercise.level === activeLevel
      const matchesQuery = !query || [exercise.name, exercise.category, ...exercise.muscles].join(' ').toLowerCase().includes(query)
      return matchesCategory && matchesLevel && matchesQuery
    })
  }, [activeCategory, activeLevel, search])

  useEffect(() => {
    document.body.style.overflow = selectedExercise ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedExercise])

  return (
    <div className="exercise-page">
      <Navbar />
      <main>
        <section className="exercise-hero">
          <div className="exercise-hero-inner">
            <div className="exercise-eyebrow"><span className="exercise-eyebrow-mark">✳</span> YOUR MOVE, YOUR WAY</div>
            <h1>Find your next<br /><span>feel-good move.</span></h1>
            <p>A library of easy-to-follow exercises, animated movement guides, and tips to help you move with confidence.</p>
            <a className="exercise-hero-link" href="#exercise-browser">Explore the library <ArrowDown size={16} /></a>
            <div className="exercise-hero-sticker" aria-hidden="true"><span>MOVE</span><span>WITH</span><strong>JOY!</strong></div>
          </div>
          <div className="exercise-hero-stripe" aria-hidden="true"><span>MOVE MORE · FEEL GOOD · REPEAT · </span><span>MOVE MORE · FEEL GOOD · REPEAT · </span></div>
        </section>

        <section className="exercise-browser" id="exercise-browser">
          <div className="exercise-browser-heading">
            <div>
              <div className="exercise-eyebrow">THE EXERCISE LIBRARY</div>
              <h2>Pick a move.<br /><span>Make it yours.</span></h2>
            </div>
            <p>Every guide includes a movement demo, simple instructions, and sensible starting points. Adjust the pace and reps to suit you.</p>
          </div>

          <div className="exercise-controls">
            <label className="exercise-search">
              <Search size={18} aria-hidden="true" />
              <span className="sr-only">Search exercises</span>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search moves or muscles" />
              {search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search"><X size={16} /></button>}
            </label>
            <label className="exercise-level-select">
              <span>Level</span>
              <select value={activeLevel} onChange={(event) => setActiveLevel(event.target.value)} aria-label="Filter by difficulty level">
                {levels.map((level) => <option key={level}>{level}</option>)}
              </select>
            </label>
          </div>

          <div className="exercise-category-list" aria-label="Filter by exercise category">
            {exerciseCategories.map((category) => (
              <button key={category} type="button" className={category === activeCategory ? 'is-active' : ''} onClick={() => setActiveCategory(category)} aria-pressed={category === activeCategory}>{category}</button>
            ))}
          </div>

          <div className="exercise-results-summary" aria-live="polite">
            <span>{filteredExercises.length} {filteredExercises.length === 1 ? 'move' : 'moves'} to explore</span>
            <span><span className="exercise-results-dot" /> Animated visual guides</span>
          </div>

          {filteredExercises.length > 0 ? (
            <div className="exercise-grid">
              {filteredExercises.map((exercise, index) => <ExerciseCard key={exercise.id} exercise={exercise} onSelect={setSelectedExercise} index={index} />)}
            </div>
          ) : (
            <div className="exercise-empty">
              <span>Nothing moving here yet.</span>
              <p>Try another search or clear a filter to find your next move.</p>
              <button type="button" onClick={() => { setSearch(''); setActiveCategory('All exercises'); setActiveLevel('All levels') }}>Clear all filters</button>
            </div>
          )}

          <aside className="exercise-safety-note">
            <span className="exercise-safety-icon">!</span>
            <p><strong>A friendly reminder</strong> These guides are general fitness information, not medical advice. Choose a comfortable range of motion and take a break whenever you need one.</p>
          </aside>
        </section>
      </main>
      <Footer />
      {selectedExercise && <ExerciseModal exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />}
    </div>
  )
}
