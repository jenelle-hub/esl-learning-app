export default function Button({ children, className="", variant="solid", ...props }){
  const base = "inline-flex items-center justify-center h-10 px-4 rounded-lg text-sm font-semibold transition"
  const styles = variant==="outline"
    ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
    : "bg-primary text-white hover:opacity-95"
  return <button className={`${base} ${styles} ${className}`} {...props}>{children}</button>
}
