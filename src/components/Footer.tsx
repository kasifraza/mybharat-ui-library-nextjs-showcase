import Link from "next/link";

export default function Footer() {
  return (
    <footer className="surface mt-12 border-t">
      <div className="text-muted mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm font-bold">My Bharat Volunteer Portal</p>
          <p className="mt-2 text-xs leading-relaxed">
            Mera Yuva Mera Bharat — empowering young Indians to build the
            nation through service, skill and citizenship.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Explore</p>
          <ul className="mt-2 space-y-1.5 text-xs">
            <li>
              <Link
                href="/opportunities"
                className="underline-offset-2 hover:text-[color:var(--brand)] hover:underline"
              >
                Browse Opportunities
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="underline-offset-2 hover:text-[color:var(--brand)] hover:underline"
              >
                Become a Volunteer
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="underline-offset-2 hover:text-[color:var(--brand)] hover:underline"
              >
                My Profile
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Focus Areas</p>
          <ul className="mt-2 space-y-1.5 text-xs">
            <li>Environment &amp; Climate</li>
            <li>Education &amp; Literacy</li>
            <li>Health &amp; Wellbeing</li>
            <li>Sports &amp; Fitness</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">An Initiative Of</p>
          <p className="mt-2 text-xs leading-relaxed">
            Ministry of Youth Affairs &amp; Sports,
            <br />
            Government of India
          </p>          <p className="mt-3 text-[11px] opacity-70">
            Built with Next.js App Router, Tailwind CSS &amp;
            mybharat-react-library
          </p>
        </div>
      </div>
      <div className="text-muted border-t py-4 text-center text-[11px]">
        © {new Date().getFullYear()} My Bharat Portal — Demo build for
        showcase purposes.
      </div>
    </footer>
  );
}
