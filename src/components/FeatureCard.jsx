import Icon from "./Icon"

export default function FeatureCard({ icon, title, desc }){
  return (
    <div className="card p-6">
      <div className="badge mb-4"><Icon name={icon} className="h-4 w-4" /> Feature</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{desc}</p>
    </div>
  )
}
