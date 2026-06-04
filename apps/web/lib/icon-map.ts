import {
  Building2,
  Clock,
  HardHat,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  Clock,
  HardHat,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Wrench,
}

export function resolveIcon(name: string | undefined | null, fallback: LucideIcon = MessageCircle): LucideIcon {
  if (!name) return fallback
  return ICON_MAP[name] ?? fallback
}
