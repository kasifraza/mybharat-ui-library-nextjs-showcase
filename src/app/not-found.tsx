"use client";

import Link from "next/link";
import { Button } from "mybharat-react-library";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <p className="brand-text text-6xl font-bold">404</p>
      <h1 className="mt-3 text-xl font-bold">This mission trail ends here</h1>
      <p className="text-muted mt-2 text-sm">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="mt-6">
        <Button variant="primary" styleType="filled">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
