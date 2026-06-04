// Studio brings its own CSS reset and chrome — do NOT import globals.css here
// (Tailwind's preflight would interfere with the Studio UI).
export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
