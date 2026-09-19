"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "mybharat-react-library";
import ThemeToggle from "./ThemeToggle";
import { ClipboardText, Discover, Home2, Profile } from "./Icons";

const MINISTRY_LOGO =
  "https://cdn-prod.mybharats.in/mybharat/assets/img/yuva_landing/YASLogo_opt_2x.png";
const MYBHARAT_LOGO =
  "https://cdn-prod.mybharats.in/mybharat/assets/img/yuva_landing/mybharatlogo_opt_2x.png";

const NAV = [
  { href: "/", label: "Home", icon: Home2 },
  { href: "/opportunities", label: "Opportunities", icon: Discover },
  { href: "/register", label: "Become a Volunteer", icon: ClipboardText },
  { href: "/profile", label: "My Profile", icon: Profile },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="glass-bar sticky top-0 z-40 border-b border-[color:var(--border-soft)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="My Bharat — Ministry of Youth Affairs and Sports, Government of India"
        >
          <span className="flex items-center gap-2.5 rounded-xl bg-white px-2.5 py-1.5 ring-1 ring-black/5">
            <Image
              src={MINISTRY_LOGO}
              alt="National Emblem — Ministry of Youth Affairs & Sports, Government of India"
              width={64}
              height={40}
              priority
              className="h-10 w-auto"
            />
            <span
              aria-hidden
              className="h-8 w-px bg-[color:var(--myb-neutral-300)]"
            />
            <Image
              src={MYBHARAT_LOGO}
              alt="My Bharat"
              width={112}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "brand-bg-soft brand-text"
                    : "text-muted hover:opacity-75"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Badge variant="info" className="hidden lg:inline-flex">
            Mera Yuva Mera Bharat
          </Badge>
          <ThemeToggle />
        </div>
      </div>

      <nav
        className="surface-muted flex overflow-x-auto border-t md:hidden"
        aria-label="Mobile"
      >
        {NAV.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-w-fit flex-1 flex-col items-center gap-0.5 px-3 py-2 text-[11px] font-medium ${
                active ? "brand-text" : "text-muted"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
