import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  description?: string;
  href?: string;
  children?: ReactNode;
}

export function SectionHeading({ title, description, href, children }: SectionHeadingProps) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
      <div className="min-w-0">
        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{title}</h2>
        {description && <p className="mt-1 max-w-2xl text-sm text-slate-400 sm:text-base">{description}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {children}
        {href && (
          <Link
            href={href}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl px-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 sm:px-3"
          >
            <span className="hidden min-[390px]:inline">Ver todos</span>
            <ArrowUpRight className="size-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
