import Icon from "./Icon"

export default function CourseCard({ title, level, lessons, cta }){
  return (
    <div className="card p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="badge"><Icon name="book" className="h-4 w-4"/> Course</span>
        <span className="text-xs text-muted">{level}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted mb-4">{lessons} lessons</p>
      <a href="#" className="mt-auto inline-flex items-center gap-2 text-primary hover:underline">
        {cta} →
      </a>
    </div>
  )
}
