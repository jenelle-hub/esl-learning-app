export default function Pricing({ onStart }){
  const tiers = [
    { name:"Self-Study", price:"Free", sub:"", features:["Basic assessments","Limited lesson access","Practice activities","Community forums","Progress tracking"], cta:"Get Started" },
    { name:"Premium Learning", price:"$19", sub:"/per month", features:["Full assessment suite","All lessons & activities","AI conversation practice","Personalized path","Downloads","Priority support","10% class discount"], cta:"Start Premium", highlighted:true },
    { name:"Online Classes", price:"$25", sub:"/per hour", features:["1-on-1 personal sessions","Flexible scheduling","HD video calling","Interactive whiteboard","Class recordings","Homework assignments","Progress reports"], cta:"Book Class" },
  ]
  return (
    <section id="pricing" className="py-16 bg-surface snap-section">
      <h2 className="text-2xl font-bold text-center mb-2">Choose Your Learning Path</h2>
      <p className="text-center text-slate-600 max-w-3xl mx-auto mb-8">Flexible pricing to fit your goals.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map(t=>(
          <div key={t.name} className={`ui-card p-6 ${t.highlighted ? "ring-2 ring-primary/30 border-primary":""}`}>
            {t.highlighted && <div className="mx-auto -mt-8 mb-2 w-max px-3 py-1 text-xs rounded-full bg-primaryDark text-white">Most Popular</div>}
            <div className="text-center">
              <div className="font-semibold">{t.name}</div>
              <div className="text-4xl font-extrabold mt-1">{t.price}<span className="text-base font-medium text-slate-500">{t.sub}</span></div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {t.features.map(f=> <li key={f} className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span>{f}</li>)}
            </ul>
            <button onClick={onStart} className="mt-6 w-full h-11 rounded-lg bg-primaryDark text-white text-sm">{t.cta}</button>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="ui-card p-6">
          <div className="font-semibold mb-2">Group & Intensive Options</div>
          <div className="rounded-xl border border-slate-200 p-4 mb-4">
            <div className="flex justify-between text-sm"><div>Group Classes</div><div className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs">2–4 students</div></div>
            <div className="text-slate-600 mt-1 text-sm">Learn with peers in small groups</div>
            <div className="mt-3 font-bold">$15/per hour</div>
            <button className="mt-3 h-9 px-4 rounded-lg bg-primaryDark text-white text-sm">Book Now</button>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex justify-between text-sm"><div>Intensive Sessions</div><div className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs">1-on-1</div></div>
            <div className="text-slate-600 mt-1 text-sm">Deep-dive learning for faster progress</div>
            <div className="mt-3 font-bold">$45/per 2-hour session</div>
            <button className="mt-3 h-9 px-4 rounded-lg bg-primaryDark text-white text-sm">Book Now</button>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="font-semibold mb-2">Payment Features</div>
          <ul className="space-y-2 text-sm text-slate-700">
            {["Secure payment processing","Cancel anytime with 24hr notice","Money-back guarantee","Multiple payment methods accepted","No hidden fees or contracts"]
              .map(x=> <li key={x} className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span>{x}</li>)}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 mt-8 text-center">
        <div className="font-semibold mb-2">Try Before You Commit</div>
        <p className="text-slate-600 mb-4">Start free or book a trial live class.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="h-10 px-4 rounded-lg bg-primaryDark text-white text-sm">Start Free Assessment</button>
          <button className="h-10 px-4 rounded-lg bg-white border border-slate-300 text-sm">Book Trial Class – $15</button>
        </div>
      </div>
    </section>
  )
}
