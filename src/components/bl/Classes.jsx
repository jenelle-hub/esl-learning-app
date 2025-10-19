export default function Classes(){
  return (
    <section id="classes" className="py-16 snap-section">
      <h2 className="text-2xl font-bold text-center mb-2">Live Online Classes</h2>
      <p className="text-center text-slate-600 max-w-3xl mx-auto mb-8">1-on-1 or group sessions with certified instructors.</p>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 ui-card p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <select className="h-11 rounded-lg border border-slate-300 px-3 focus:border-primary focus:ring-1 focus:ring-primary">
              <option>Choose class type</option>
              <option>1-on-1</option>
              <option>Group Class (2–4)</option>
              <option>Intensive (2 hrs)</option>
            </select>
            <select className="h-11 rounded-lg border border-slate-300 px-3 focus:border-primary focus:ring-1 focus:ring-primary">
              <option>Choose your instructor</option>
              <option>Sarah Johnson</option>
              <option>David Chen</option>
              <option>Maria Rodriguez</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="font-semibold mb-3">Choose Date</div>
              <img src="/calendar.png" className="rounded-lg border border-slate-200" alt="calendar" />
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="font-semibold mb-3">Choose Time</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                {["09:00 AM","10:00 AM","11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM","06:00 PM","07:00 PM","08:00 PM"].map(t=>(
                  <button key={t} className="h-9 rounded-lg border border-slate-300 hover:border-primary">{t}</button>
                ))}
              </div>
            </div>
          </div>

          <button className="mt-6 w-full h-11 rounded-lg bg-primaryDark text-white text-sm">Book Class • $25/hour</button>
        </div>

        <div className="ui-card p-6">
          <div className="font-semibold mb-3">Pricing</div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
              <div>1-on-1 Session<br/><span className="text-slate-500 text-xs">Personal attention</span></div>
              <div className="font-bold">$25/hr</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
              <div>Group Class (2–4 students)</div>
              <div className="font-bold">$15/hr</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
              <div>Intensive Session (2 hours)</div>
              <div className="font-bold">$45/hr</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {[
          { name:"Sarah Johnson", exp:"8 years", rate:"$25/hr" },
          { name:"David Chen", exp:"6 years", rate:"$23/hr" },
          { name:"Maria Rodriguez", exp:"10 years", rate:"$27/hr" },
        ].map(p=>(
          <div key={p.name} className="ui-card p-5 flex items-center justify-between">
            <div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-xs text-slate-500">{p.exp} experience</div>
              <div className="mt-1 text-xs text-slate-600">Specialties: Grammar, Pronunciation, Academic Writing</div>
            </div>
            <div className="text-right">
              <div className="text-amber-600">⭐ 4.8</div>
              <div className="font-bold mt-1">{p.rate}</div>
              <div className="mt-2 inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs">Available</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
