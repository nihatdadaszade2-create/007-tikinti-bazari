"use client";

import Link from "next/link";
import { useEffect } from "react";
import { RotateCw } from "lucide-react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-x py-24 text-center">
      <h1 className="text-4xl font-black">Xəta baş verdi</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted">Səhifəni yükləmək mümkün olmadı. Yenidən cəhd edin.</p>
      <div className="mt-8 flex justify-center gap-3">
        <button type="button" onClick={reset} className="btn btn-dark">
          <RotateCw className="h-4 w-4" aria-hidden="true" /> Yenidən cəhd et
        </button>
        <Link href="/" className="btn btn-outline">
          Ana səhifə
        </Link>
      </div>
    </section>
  );
}
