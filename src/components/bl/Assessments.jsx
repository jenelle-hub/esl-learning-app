export default function Assessments(){
  const items = [
    { name:"Grammar & Vocabulary", badge:"All Levels", time:"20 minutes", qs:"25 questions" },
    { name:"Listening Comprehension", badge:"Intermediate+", time:"15 minutes", qs:"20 questions" },
    { name:"Reading Comprehension", badge:"All Levels", time:"25 minutes", qs:"30 questions" },
    { name:"Writing Skills", badge:"Intermediate+", time:"30 minutes", qs:"5 questions" },
  ]
  return (
    <section id="assessment" className="py-16 snap-section">
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center mb-10">
        <div className="font-semibold mb-2">Flexible Learning Schedule</div>
        <p className="text-slate-600">Learn at your pace or book live classes 7 days a week.</p>
        <button className="mt-4 h-10 px-4 rounded-lg bg-primaryDark text-white text-sm">Schedule Your First Class</button>
      </div>

      <h2 className="text-2xl font-bold text-center mb-2">English Proficiency Assessment</h2>
      <p className="text-center text-slate-600 max-w-3xl mx-auto mb-8">Get personalized recommendations that light the way to your goals.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map(x=>(
          <div key={x.name} className="ui-card p-6">
            <div className="flex items-center justify-between mb-1">
              <div className="font-semibold">{x.name}</div>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs">{x.badge}</span>
            </div>
            <div className="text-xs text-slate-500 mb-4">⏱ {x.time} · 📝 {x.qs}</div>
            <button className="w-full h-10 rounded-lg bg-primaryDark text-white text-sm">Start Assessment</button>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
        <div className="font-semibold mb-1">Complete Assessment Package</div>
        <p className="text-slate-600 mb-3">Receive detailed feedback and recommendations.</p>
        <button className="h-10 px-4 rounded-lg bg-primaryDark text-white text-sm">Start Complete Assessment (60 minutes)</button>
      </div>
    </section>
  )
}
