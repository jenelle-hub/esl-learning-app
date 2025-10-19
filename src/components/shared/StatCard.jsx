export default function StatCard({ value, label }){
  return (
    <div className="ui-card p-4">
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  )
}
