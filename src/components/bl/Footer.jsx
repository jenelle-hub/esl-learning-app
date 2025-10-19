export default function Footer({ onOpen }){
  return (
    <footer className="border-t border-slate-200 mt-12">
      <div className="section grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="/logo.svg" className="h-6 w-6" />
            <div className="font-semibold">BrightLingo</div>
          </div>
          <p className="text-sm text-slate-600">Lighting the way to better English through assessments, lessons, and live classes.</p>
          <div className="mt-4 space-y-1 text-sm">
            <div>hello@brightlingo.com</div>
            <div>(555) 123-4567</div>
            <div>San Francisco, CA</div>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">Learn</div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><a href="#assessment">Take Assessment</a></li>
            <li><a href="#lessons">Browse Lessons</a></li>
            <li><a href="#activities">Practice Activities</a></li>
            <li><a href="#classes">Online Classes</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Support</div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Help Center</li><li>Contact Us</li><li>Technical Support</li><li>Community Forum</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Company</div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>About Us</li><li>Our Teachers</li><li>Careers</li><li>Press</li>
          </ul>
        </div>
      </div>
      <div className="section pt-0 pb-12 text-xs text-slate-500">
        <div className="flex flex-wrap items-center gap-4">
          <a onClick={()=>onOpen("signin")} className="cursor-pointer">Sign In</a>
          <a onClick={()=>onOpen("signup")} className="cursor-pointer">Create Account</a>
          <span className="ml-auto">Available in: usEnglish · esEspañol · frFrançais</span>
        </div>
        <div className="mt-3">© {new Date().getFullYear()} BrightLingo. All rights reserved.</div>
      </div>
    </footer>
  )
}
