export default function Activities(){
  const cards = [
    { title:"Word Matching Game", tag:"Beginner", pts:"100 pts", min:"10", played:"1,245 played today" },
    { title:"Grammar Race", tag:"Intermediate", pts:"150 pts", min:"15", played:"892 played today" },
    { title:"Sentence Builder", tag:"All Levels", pts:"120 pts", min:"12", played:"567 played today" },
  ]
  return (
    <section id="activities" className="py-16 bg-surface snap-section">
      <h2 className="text-2xl font-bold text-center mb-2">Interactive Learning Activities</h2>
      <p className="text-center text-slate-600 max-w-3xl mx-auto mb-8">Games, speaking practice, and conversation exercises.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map(c=>(
          <div key={c.title} className="ui-card p-6">
            <div className="font-semibold mb-1">{c.title}</div>
            <div className="text-xs flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{c.tag}</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100">{c.pts}</span>
            </div>
            <div className="text-xs text-slate-500 mb-4">⏱ {c.min} min · 👥 {c.played}</div>
            <button className="w-full h-10 rounded-lg bg-primaryDark text-white text-sm">Start Activity</button>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-6">
          <div className="font-semibold mb-2">Weekly Challenges</div>
          <p className="text-sm text-slate-600 mb-4">Compete and earn badges.</p>
          <button className="h-10 px-4 rounded-lg bg-fuchsia-600 text-white text-sm">View Challenges</button>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="font-semibold mb-2">Daily Streaks</div>
          <p className="text-sm text-slate-600 mb-4">Maintain your streak for rewards.</p>
          <button className="h-10 px-4 rounded-lg bg-emerald-600 text-white text-sm">Start Streak</button>
        </div>
      </div>
    </section>
  )
}
