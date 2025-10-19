import { Book, GraduationCap, Mic, MessageSquare, Star, PlayCircle, Sparkles, CheckCircle2 } from "lucide-react"

const map = {
  book: Book,
  cap: GraduationCap,
  mic: Mic,
  chat: MessageSquare,
  star: Star,
  play: PlayCircle,
  sparkles: Sparkles,
  check: CheckCircle2
}

export default function Icon({ name, className }) {
  const Cmp = map[name] || Sparkles
  return <Cmp className={className} aria-hidden />
}
