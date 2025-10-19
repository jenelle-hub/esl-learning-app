export default function Lessons(){
  const lessons = [
    { title:"Introduction to English", min:"15", rating:"4.8", items:["Alphabet","Basic Greetings","Numbers 1-20"], done:true },
    { title:"Family and Relationships", min:"20", rating:"4.9", items:["Family Members","Describing People","Possessive Pronouns"], done:true },
    { title:"Daily Routines", min:"25", rating:"4.7", items:["Time Expressions","Daily Activities","Present Simple"], done:false },
    { title:"Food and Dining", min:"30", rating:"4.6", items:["Food Vocabulary","Restaurant Language","Countable/Uncountable"], done:false, locked:true },
  ]
  return (
    <section id="lessons" className="py-16 snap-section">
      <h2 className="text-2xl font-bold text-center mb-2">Interactive English Lessons</h2>
      <p className="text-center text-slate-600 max-w-3xl mx-auto mb-8">Videos, exercises, and practical applications.</p>

      <div className="mb-4 mx-auto max-w-3xl rounded-full bg-slate-100 overflow-hidden">
        <div className="h-2 w-[50%] bg-primary"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {lessons.map(l=>(
          <div key={l.title} className="ui-card p-6">
            <div className="flex justify-between mb-2">
              <div className="font-semibold">{l.title}</div>
              <div className="text-xs text-slate-500">{l.min} min · ⭐ {l.rating}</div>
            </div>
            <div className="text-sm text-slate-600 mb-4">
              <div className="font-medium mb-1">What you'll learn:</div>
              <ul className="list-disc pl-5 space-y-1">{l.items.map(i=><li key={i}>{i}</li>)}</ul>
            </div>
            <button className={`w-full h-10 rounded-lg text-sm ${l.locked ? "bg-slate-300 text-white cursor-not-allowed" : "bg-primaryDark text-white"}`}>
              {l.locked ? "Locked" : (l.done ? "Review" : "Start Lesson")}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
        <div className="text-2xl mb-2">📖</div>
        <div className="font-semibold mb-2">Personalized Learning Path</div>
        <p className="text-slate-600 mb-3">Unlock lessons as you progress.</p>
        <button className="h-10 px-4 rounded-lg bg-primaryDark text-white text-sm">Get My Learning Plan</button>
      </div>
    </section>
  )
}
