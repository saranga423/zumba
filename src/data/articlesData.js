// src/data/articlesData.js

export const categoryColors = {
  Zumba: { bg: "#E23F73", text: "#FAF4E9" }, // hibiscus
  Nutrition: { bg: "#FF9736", text: "#2B1330" }, // mango
  Fitness: { bg: "#C8F03C", text: "#2B1330" }, // lime
  Wellness: { bg: "#2B1330", text: "#FAF4E9" }, // plum
  Lifestyle: { bg: "#FAF4E9", text: "#2B1330" }, // cream
};

const articles = [
  {
    id: 1,
    category: "Zumba",
    title: "Why Zumba Is the Workout You'll Actually Stick To",
    excerpt:
      "Most people quit the gym within 6 weeks. Zumba students keep coming back — here's the science behind why dancing makes fitness feel effortless.",
    readTime: "4 min read",
    date: "Aug 5, 2026",
    image: null,
    slug: "why-zumba-you-will-stick-to",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "According to fitness industry statistics, nearly 50% of new gym memberships are abandoned within the first six weeks. Traditional workouts often feel transactional: you trade sweat and boredom for eventual physical results. Zumba flips this formula by shifting the focus from endurance to engagement."
      },
      {
        type: "heading",
        text: "The Brain on Dance: Intrinsic Motivation"
      },
      {
        type: "paragraph",
        text: "When you dance to high-energy Latin and global rhythms, your brain releases a combination of dopamine and endorphins. This phenomenon—often called 'disguised exercise'—tricks the brain into perceiving workout time as playtime. Because the activity itself is enjoyable, you rely on intrinsic motivation rather than willpower alone."
      },
      {
        type: "tip",
        text: "Stop counting calories during class. Focus on connecting with the music and enjoying the rhythm; long-term consistency follows naturally when the routine feels like fun."
      },
      {
        type: "heading",
        text: "Key Factors That Driving Long-Term Adherence"
      },
      {
        type: "list",
        items: [
          "Rhythmic Synchronization: Moving to a beat reduces perceived physical effort.",
          "Cognitive Engagement: Learning short choreography sequences keeps the mind active and prevents boredom.",
          "Community Energy: Exercising in a group setting fosters shared excitement and mutual accountability.",
          "Low Barrier to Entry: You don't need formal dance training to follow the intuitive steps."
        ]
      },
      {
        type: "quote",
        text: "The best exercise is the one that actually happens. When fitness feels like a party, showing up is no longer a struggle.",
        author: "Hanna Waththalage"
      }
    ]
  },
  {
    id: 2,
    category: "Nutrition",
    title: "What to Eat Before and After a Zumba Class",
    excerpt:
      "Fuel matters. Learn what to eat before you dance so you have energy to last the full hour — and what to reach for after class to recover faster.",
    readTime: "5 min read",
    date: "Aug 3, 2026",
    image: null,
    slug: "what-to-eat-before-after-zumba",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "A high-intensity Zumba session can burn anywhere from 400 to 700 calories per hour. Proper pre-workout fueling prevents fatigue mid-session, while strategic post-workout nutrition speeds up muscle recovery and keeps your energy stable."
      },
      {
        type: "heading",
        text: "Pre-Class Fuel: 45–60 Minutes Before"
      },
      {
        type: "paragraph",
        text: "Your pre-class snack should prioritize easily digestible carbohydrates with minimal fat and fiber to prevent stomach discomfort while jumping and turning."
      },
      {
        type: "list",
        items: [
          "A medium banana with a tablespoon of peanut butter",
          "A small slice of whole-wheat toast with honey",
          "A handful of dried fruit and raw almonds"
        ]
      },
      {
        type: "heading",
        text: "Post-Class Recovery: Within 45 Minutes After"
      },
      {
        type: "paragraph",
        text: "After class, your muscles are primed to absorb nutrients. Combine lean protein to repair tissue with complex carbohydrates to replenish depleted glycogen stores."
      },
      {
        type: "tip",
        text: "Hydration starts long before class begins. Aim for at least 500ml of water two hours before dancing, and sip electrolyte-infused water during humid sessions."
      },
      {
        type: "quote",
        text: "Think of your meals as fuel for your movement. Eat to feel energized, strong, and light on your feet.",
        author: "Hanna Waththalage"
      }
    ]
  },
  {
    id: 3,
    category: "Fitness",
    title: "5 Full-Body Moves You Can Do at Home Between Classes",
    excerpt:
      "Can't make it to the studio this week? These five moves take 20 minutes and keep your body primed between sessions.",
    readTime: "6 min read",
    date: "Jul 28, 2026",
    image: null,
    slug: "5-full-body-moves-at-home",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Maintaining momentum between studio sessions doesn't require a full gym setup. These five bodyweight exercises target core stability, hip mobility, and cardiovascular endurance—the exact foundation needed for dynamic Zumba choreography."
      },
      {
        type: "heading",
        text: "The 20-Minute Conditioning Routine"
      },
      {
        type: "subheading",
        text: "1. Lateral Bodyweight Skaters"
      },
      {
        type: "paragraph",
        text: "Leap side-to-side, landing softly on one foot while sweeping the other behind. This builds ankle strength and improves balance for fast directional changes in class."
      },
      {
        type: "subheading",
        text: "2. Squat to Hip Circle"
      },
      {
        type: "paragraph",
        text: "Perform a standard squat, and as you stand, drive one knee up and open it in a circular motion. This opens tight hip flexors and strengthens the glutes."
      },
      {
        type: "subheading",
        text: "3. High-Knee Rhythm Drives"
      },
      {
        type: "paragraph",
        text: "Drive your knees upward toward your chest in rapid succession while engaging your core. This elevates your heart rate and mimics high-tempo cardio tracks."
      },
      {
        type: "subheading",
        text: "4. Plank Shoulder Taps"
      },
      {
        type: "paragraph",
        text: "Hold a strong high plank and tap opposite shoulders without letting your hips sway. This builds the core stability required for isolations and upper-body movements."
      },
      {
        type: "subheading",
        text: "5. Curtsy Lunges"
      },
      {
        type: "paragraph",
        text: "Step back diagonally into a lunge to target the inner thighs and gluteus medius, essential for controlled dance turns."
      },
      {
        type: "tip",
        text: "Perform each move for 45 seconds, rest for 15 seconds, and repeat the circuit 4 times for a quick 20-minute workout."
      }
    ]
  },
  {
    id: 4,
    category: "Wellness",
    title: "How Dancing Changed My Relationship With My Body",
    excerpt:
      "A personal reflection on what Zumba taught me about confidence, self-expression, and showing up for yourself — even on the hard days.",
    readTime: "7 min read",
    date: "Jul 20, 2026",
    image: null,
    slug: "dancing-changed-my-relationship-with-body",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "For years, I viewed fitness as a form of punishment—something I had to do to burn off calories or meet external standards. My perspective shifted the moment I stepped into a dance fitness studio. For the first time, movement wasn't about changing how my body looked; it was about celebrating what my body could do."
      },
      {
        type: "heading",
        text: "Shifting from Aesthetics to Performance and Joy"
      },
      {
        type: "paragraph",
        text: "Dancing forces you to be present. You cannot focus on self-doubt when listening for rhythm cues, coordinating steps, and keeping up with the group. Slowly, mirror anxiety fades away and is replaced by pride when you master a tricky routine."
      },
      {
        type: "quote",
        text: "When you stop watching yourself critically in the mirror and start feeling the rhythm, your body stops being a project to fix and becomes a gift to enjoy.",
        author: "Hanna Waththalage"
      },
      {
        type: "heading",
        text: "Lessons Learned Along the Way"
      },
      {
        type: "list",
        items: [
          "Perfection is Overrated: Making a wrong turn with a smile is far better than standing still in fear.",
          "Bodies Are Dynamic: Some days you have endless energy; other days, showing up and doing half-intensity is a huge victory.",
          "Self-Expression is Healing: Moving freely allows you to release tension, stress, and emotions you might be holding on to."
        ]
      }
    ]
  },
  {
    id: 5,
    category: "Nutrition",
    title: "Simple Meal Prep Ideas for Busy Class Days",
    excerpt:
      "You don't need a nutrition degree to eat well around your workouts. Here are five quick, balanced meal ideas that work around a packed schedule.",
    readTime: "5 min read",
    date: "Jul 12, 2026",
    image: null,
    slug: "meal-prep-for-busy-class-days",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "When balancing work, family, and evening fitness classes, meal preparation can fall by the wayside. The trick to consistent nutrition isn't spending six hours every Sunday cooking—it's preparing versatile building blocks that assemble in under ten minutes."
      },
      {
        type: "heading",
        text: "The 3-Step Assembly Strategy"
      },
      {
        type: "paragraph",
        text: "Build every meal container around three essential components: a complex carbohydrate base, a lean protein, and colorful fiber-rich vegetables."
      },
      {
        type: "list",
        items: [
          "The Grain Bowl: Quinoa, grilled chicken breast, roasted sweet potatoes, and a drizzle of tahini.",
          "The Quick Egg Wrap: Scrambled eggs or tofu, spinach, black beans, and salsa inside a whole-wheat wrap.",
          "The Greek Yogurt Power Cup: Unsweetened Greek yogurt topped with chia seeds, fresh berries, and a handful of granola.",
          "Mason Jar Chickpea Salad: Layered chickpeas, cucumbers, cherry tomatoes, feta, and olive oil dressing that stays fresh all day."
        ]
      },
      {
        type: "tip",
        text: "Prep double portions of grains and roasted vegetables during dinner so you have pre-portioned meal bases ready for the next two days."
      }
    ]
  },
  {
    id: 6,
    category: "Fitness",
    title: "Beginner's Guide: What to Expect in Your First Zumba Class",
    excerpt:
      "First class nerves are real. Here's exactly what happens in a typical Zumba session — so you can walk in ready to move, not worry.",
    readTime: "4 min read",
    date: "Jul 05, 2026",
    image: null,
    slug: "beginners-guide-first-zumba-class",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Feeling nervous before your first Zumba class is completely normal. Remember: everyone in that room was a beginner once, and no one is watching or judging your steps."
      },
      {
        type: "heading",
        text: "The Class Structure Breakdown"
      },
      {
        type: "subheading",
        text: "1. The Warm-Up (8–10 Minutes)"
      },
      {
        type: "paragraph",
        text: "A gradual sequence that raises your heart rate, warms up key muscle groups, and introduces basic footwork patterns."
      },
      {
        type: "subheading",
        text: "2. The Main Dance Block (35–40 Minutes)"
      },
      {
        type: "paragraph",
        text: "A series of tracks featuring Merengue, Salsa, Cumbia, and Reggaeton. High-tempo tracks alternate with moderate-tempo songs for an effective interval workout."
      },
      {
        type: "subheading",
        text: "3. The Cool-Down & Stretch (5–8 Minutes)"
      },
      {
        type: "paragraph",
        text: "Gentle movements to safely bring your heart rate down, followed by static stretches to improve flexibility and reduce muscle soreness."
      },
      {
        type: "tip",
        text: "Position yourself in the middle of the room rather than the very back. This gives you a clear line of sight to the instructor's feet and hands."
      }
    ]
  },
  {
    id: 7,
    category: "Wellness",
    title: "The Mental Health Benefits of Regular Dance Exercise",
    excerpt:
      "Beyond the physical — research shows that rhythmic group exercise reduces anxiety, lifts mood, and builds social connection. Here's what the studies say.",
    readTime: "6 min read",
    date: "Jun 24, 2026",
    image: null,
    slug: "mental-health-benefits-dance-exercise",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "While cardiovascular health and calorie burn are well-documented physical benefits of Zumba, its neurological and psychological rewards are just as profound. Modern neuroscience shows that combining physical effort with musical rhythms offers unique mental health benefits."
      },
      {
        type: "heading",
        text: "How Dance Supports Mental Wellbeing"
      },
      {
        type: "subheading",
        text: "Endorphin and Serotonin Release"
      },
      {
        type: "paragraph",
        text: "Continuous movement paired with uplifting music stimulates the release of key feel-good neurotransmitters, helping to alleviate symptoms of mild anxiety and stress."
      },
      {
        type: "subheading",
        text: "The Power of Group Cohesion"
      },
      {
        type: "paragraph",
        text: "Moving in sync with a group creates a sense of shared rhythm and belonging. This collective experience helps combat feelings of isolation and builds a sense of community connection."
      },
      {
        type: "quote",
        text: "Dance is one of the few activities that simultaneously engages the brain's emotional, physical, and creative centers.",
        author: "Hanna Waththalage"
      }
    ]
  },
  {
    id: 8,
    category: "Lifestyle",
    title: "How to Build a Sustainable Fitness Routine Around Zumba",
    excerpt:
      "Three classes a week sounds easy until life happens. Here's how to build a routine that actually survives busy weeks, travel, and low-motivation days.",
    readTime: "5 min read",
    date: "Jun 15, 2026",
    image: null,
    slug: "sustainable-fitness-routine-zumba",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Building a workout routine is easy; keeping it going when life gets busy is the real challenge. Long-term success relies on building flexibility into your schedule rather than aiming for rigid perfection."
      },
      {
        type: "heading",
        text: "4 Strategies for Long-Term Consistency"
      },
      {
        type: "list",
        items: [
          "Schedule Classes Like Meetings: Add your weekly studio times directly to your personal calendar as non-negotiable self-care time.",
          "Prepare Your Gym Bag the Night Before: Eliminate morning friction by having your gear, shoes, and water bottle packed and ready.",
          "Use the 10-Minute Rule: On low-energy days, commit to just ten minutes of class. If you still feel exhausted, give yourself permission to rest—but 90% of the time, getting started is all it takes.",
          "Pair Dancing with Recovery: Balance high-cardio dance days with rest, gentle stretching, or yoga to prevent burnout and overtraining."
        ]
      },
      {
        type: "tip",
        text: "Focus on progress over perfection. Missing one class doesn't break your routine—stopping completely does. Reset and show up for the next session!"
      }
    ]
  },
  {
    id: 9,
    category: "Zumba",
    title: "Latin Rhythms 101: The Music Behind the Movement",
    excerpt:
      "Salsa, merengue, cumbia, reggaeton — each Zumba track has a rhythm that shapes how you move. A quick guide to the beats powering your class.",
    readTime: "4 min read",
    date: "Jun 02, 2026",
    image: null,
    slug: "latin-rhythms-behind-zumba-music",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Every Zumba class is built on four core Latin music styles. Understanding the basic rhythm of each genre makes following choreography easier, intuitive, and even more fun."
      },
      {
        type: "heading",
        text: "The Four Core Zumba Rhythms"
      },
      {
        type: "subheading",
        text: "1. Merengue (Dominican Republic)"
      },
      {
        type: "paragraph",
        text: "Fast, driving 2-4 beat rhythm. The basic movement resembles a march with active hip action. Great for warm-ups and high-cadence cardio."
      },
      {
        type: "subheading",
        text: "2. Salsa (Puerto Rico & Cuba)"
      },
      {
        type: "paragraph",
        text: "Features a quick-quick-slow tempo counted across 8 beats. Steps include forward-and-back motions, side steps, and smooth travel turns."
      },
      {
        type: "subheading",
        text: "3. Cumbia (Colombia)"
      },
      {
        type: "paragraph",
        text: "Recognizable by its steady, trotting drumbeat. The moves often imitate a gentle 'sugar cane chop' or side-stepping motion."
      },
      {
        type: "subheading",
        text: "4. Reggaeton (Puerto Rico)"
      },
      {
        type: "paragraph",
        text: "Driven by an urban Dembow beat. The movements are grounded, strong, and focus on chest and hip isolations."
      },
      {
        type: "quote",
        text: "Listen to the music first, then let your feet follow. Once you recognize the drumbeat, the movement happens naturally.",
        author: "Hanna Waththalage"
      }
    ]
  }
];

export default articles;