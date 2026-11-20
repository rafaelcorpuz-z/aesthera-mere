import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import type { TreatmentGroup } from "@/data/treatments";

export default function TreatmentSubcategoryCard({
  categorySlug,
  group,
}: {
  categorySlug: string;
  group: TreatmentGroup;
}) {
  return (
    <Link
      href={`/treatments/${categorySlug}/${group.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#80755F]/20 bg-white shadow-[0_12px_32px_rgba(76,85,52,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(76,85,52,0.13)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#80755F]/10">
        <Image
          src={group.image}
          alt=""
          fill
          quality={90}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#4C5534]/45 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-seasons text-[30px] leading-tight text-[#4C5534]">{group.title}</h3>
        <p className="mt-3 font-montserrat text-[13px] leading-6 text-[#80755F]">{group.description}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 font-montserrat text-[11px] font-semibold uppercase tracking-[0.1em] text-[#4C5534]">
          Explore treatments
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1"><ArrowUpRightIcon className="h-4 w-4" /></span>
        </span>
      </div>
    </Link>
  );
}
