import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import TreatmentListingPage from "@/components/treatments/TreatmentListingPage";
import TreatmentRouteFallback from "@/components/treatments/TreatmentRouteFallback";
import { getTreatmentGroup, treatmentCategories } from "@/data/treatments";

type Props = PageProps<"/treatments/[category]/[subcategory]">;

export function generateStaticParams() {
  return treatmentCategories.flatMap((category) =>
    category.groups.map((group) => ({
      category: category.slug,
      subcategory: group.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug, subcategory } = await params;
  const result = getTreatmentGroup(categorySlug, subcategory);
  if (!result) return {};
  return {
    title: `${result.group.title} | Aesthera Mère`,
    description: result.group.description,
  };
}

export default function SubcategoryPage({ params }: Props) {
  return (
    <Suspense fallback={<TreatmentRouteFallback />}>
      <SubcategoryContent params={params} />
    </Suspense>
  );
}

async function SubcategoryContent({ params }: Pick<Props, "params">) {
  const { category: categorySlug, subcategory } = await params;
  if (categorySlug === "skin-radiance" && (subcategory === "premium-facials" || subcategory === "elite-facials")) {
    redirect("/treatments/skin-radiance/premium-elite-facials");
  }
  const result = getTreatmentGroup(categorySlug, subcategory);
  if (!result) notFound();
  return <TreatmentListingPage category={result.category} group={result.group} />;
}
