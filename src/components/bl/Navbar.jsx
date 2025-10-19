import Button from "../shared/Button"
import { useEffect, useState } from "react";

const links = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "Assessment", href: "#assessment" },
  { name: "Lessons", href: "#lessons" },
  { name: "Activities", href: "#activities" },
  { name: "Online Classes", href: "#classes" },
  { name: "Pricing", href: "#pricing" },
]

export default function Navbar({ onOpen }){
  const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 4);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
  <Container className="flex h-[64px] items-center justify-between">
    {/* Left: Logo + Brand */}
    <div className="flex items-center gap-3">
      <div className="w-7 h-7">
        <ImgIcon name="nav-features" className="w-full h-full" />
      </div>
      <div>
        <div className="font-semibold text-[16px] text-slate-900">BrightLingo</div>
        <div className="text-[12.5px] text-slate-500 -mt-[2px]">
          Lighting the Way to Better English
        </div>
      </div>
    </div>

    {/* Center: Nav Links */}
    <nav className="hidden md:flex items-center text-[14px] text-slate-700 font-medium">
      <a href="#home" className="inline-flex items-center gap-1 px-3 py-2 rounded-md hover:text-blue-600">
        <ImgIcon name="nav-home" className="w-[14px] h-[14px]" /> Home
      </a>
      <a href="#features" className="inline-flex items-center gap-1 px-3 py-2 rounded-md hover:text-blue-600">
        <ImgIcon name="nav-features" className="w-[14px] h-[14px]" /> Features
      </a>
      <a href="#assessment" className="inline-flex items-center gap-1 px-3 py-2 rounded-md hover:text-blue-600">
        <ImgIcon name="nav-assessment" className="w-[14px] h-[14px]" /> Assessment
      </a>
      <a href="#lessons" className="inline-flex items-center gap-1 px-3 py-2 rounded-md hover:text-blue-600">
        <ImgIcon name="nav-lessons" className="w-[14px] h-[14px]" /> Lessons
      </a>
      <a href="#activities" className="inline-flex items-center gap-1 px-3 py-2 rounded-md hover:text-blue-600">
        <ImgIcon name="nav-activities" className="w-[14px] h-[14px]" /> Activities
      </a>
      <a href="#classes" className="inline-flex items-center gap-1 px-3 py-2 rounded-md hover:text-blue-600">
        <ImgIcon name="nav-classes" className="w-[14px] h-[14px]" /> Online Classes
      </a>
      <a href="#pricing" className="inline-flex items-center gap-1 px-3 py-2 rounded-md hover:text-blue-600">
        <ImgIcon name="nav-pricing" className="w-[14px] h-[14px]" /> Pricing
      </a>
    </nav>

    {/* Right: Auth Buttons */}
    <div className="hidden md:flex items-center gap-2">
      <button
        onClick={() => onOpenAuth("signin")}
        className="h-[36px] px-4 text-[14px] text-slate-700 font-medium hover:text-blue-600"
      >
        Sign In
      </button>
      <button
        onClick={() => onOpenAuth("signup")}
        className="h-[36px] px-4 rounded-md bg-[#1E50FF] text-white text-[14px] font-medium hover:bg-[#1743D6]"
      >
        Get Started
      </button>
    </div>
  </Container>
</header>
  )
}