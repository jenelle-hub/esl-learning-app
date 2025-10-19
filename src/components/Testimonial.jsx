import Icon from "./Icon"

export default function Testimonial({ quote, name, role }){
  return (
    <figure className="card p-6">
      <Icon name="star" className="h-5 w-5 mb-3" />
      <blockquote className="text-base leading-relaxed mb-4">“{quote}”</blockquote>
      <figcaption className="text-sm text-muted">{name} · {role}</figcaption>
    </figure>
  )
}
