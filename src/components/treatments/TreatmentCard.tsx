import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import type { Treatment } from "@/data/treatments";

export default function TreatmentCard({
  treatment,
  href,
}: {
  treatment: Treatment;
  href: string;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#80755F]/20 bg-white shadow-[0_12px_32px_rgba(76,85,52,0.06)] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#80755F]/10">
        {treatment.imageAvailable === false ? (
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#FFFCF3] to-[#4F6442]/15" />
        ) : (
          <>
            <Image src={treatment.image} alt={treatment.name} fill quality={90} sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#4C5534]/20 to-transparent" />
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-seasons text-[28px] leading-tight text-[#4C5534]">{treatment.name}</h3>
        <p className="mt-3 font-montserrat text-[13px] leading-6 text-[#80755F]">{treatment.description}</p>
        <div className="mt-auto pt-6">
          <div className="border-t border-[#80755F]/15 pt-4">
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.14em] text-[#80755F]">{treatment.priceLabel}</p>
            <p className="mt-1 font-montserrat text-sm font-semibold text-[#4C5534]">{treatment.price}</p>
            {treatment.packagePrice && <p className="mt-2 font-montserrat text-[11px] font-semibold uppercase tracking-[0.1em] text-[#80755F]">Package available</p>}
          </div>
          <Link href={href} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#4C5534] px-5 font-montserrat text-xs font-semibold text-white transition-colors hover:bg-[#4F6442]">
            View Details <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
