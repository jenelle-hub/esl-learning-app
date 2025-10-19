import Button from "../shared/Button"
import StatCard from "../shared/StatCard"

export default function Hero(){
  return (
    <section id="home" className="section">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-[44px] leading-[1.1] font-extrabold">
            Lighting the Way to <span className="text-primary">Better English</span>
          </h1>
          <p className="mt-4 text-slate-600">
            Comprehensive ESL platform with personalized assessments, interactive lessons, and live online classes with certified instructors.
          </p>
          <div className="mt-6 flex gap-3">
            <Button className="bg-primaryDark">Start Free Assessment</Button>
            <Button variant="outline">Book Online Class</Button>
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard value="10,000+" label="Students" />
            <StatCard value="500+" label="Lessons" />
            <StatCard value="95%" label="Success Rate" />
            <StatCard value="4.9/5" label="Rating" />
          </div>
        </div>
        <div>
          <img src="/hero-illustration.png" alt="hero" className="w-full rounded-2xl border border-slate-200 shadow-hero object-cover" />
        </div>
      </div>
    </section>
  )
}
