import { Lightbulb, BookOpen, Mic, Sparkles } from "lucide-react"

const Box = ({ icon:Icon, title, items, cta }) => (
  <div className="ui-card p-6">
    <div className="flex items-center gap-2 font-semibold mb-2"><Icon className="h-5 w-5 text-primary"/>{title}</div>
    <ul className="text-sm text-slate-600 space-y-2">
      {items.map((t,i)=> <li key={i} className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span>{t}</li>)}
    </ul>
    <button className="mt-5 w-full h-10 rounded-lg bg-primaryDark text-white text-sm">{cta}</button>
  </div>
)

export default function Features(){
  return (
    <section id="features" className="py-16 bg-surface snap-section">
      <h2 className="text-2xl font-bold text-center mb-2">Comprehensive ESL Learning Platform</h2>
      <p className="text-center text-slate-600 max-w-3xl mx-auto mb-8">Brighten your English skills with assessments, lessons and live classes.</p>
      <div className="grid md:grid-cols-2 gap-6">
        <Box icon={Lightbulb} title="Skill Assessment" items={["Grammar & Vocabulary Tests","Speaking Assessment","Writing Evaluation","Personalized Feedback"]} cta="Take Assessment" />
        <Box icon={BookOpen} title="Interactive Lessons" items={["Beginner to Advanced","Video Lessons","Interactive Exercises","Progress Tracking"]} cta="Browse Lessons" />
        <Box icon={Sparkles} title="Practice Activities" items={["Grammar Games","Vocabulary Builder","Pronunciation Practice","Conversation Starters"]} cta="Try Activities" />
        <Box icon={Mic} title="Online Classes" items={["1-on-1 Sessions","Group Classes","Flexible Scheduling","$25/hour Rate"]} cta="Book Class" />
      </div>
    </section>
  )
}
