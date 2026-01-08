"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
  children: React.ReactElement | (({ active }: { active: boolean }) => React.ReactElement)
  href: string
}

export default function ActiveLink({ children, href }: Props) {
  const pathname = usePathname()
  const active = pathname === href || pathname.startsWith(href)

  return <Link href={href}>{typeof children === "function" ? children({ active }) : children}</Link>
}
