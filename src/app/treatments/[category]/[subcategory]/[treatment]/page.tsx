import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import TreatmentDetailPage from "@/components/treatments/TreatmentDetailPage";
import TreatmentRouteFallback from "@/components/treatments/TreatmentRouteFallback";
import { getTreatment, treatmentCategories } from "@/data/treatments";

type Props = PageProps<"/treatments/[category]/[subcategory]/[treatment]">;

export function generateStaticParams() {
  return treatmentCategories.flatMap((category) =>
    category.groups.flatMap((group) =>
      group.treatments.map((treatment) => ({
        category: category.slug,
        subcategory: group.slug,
        treatment: treatment.slug,
      })),
    ),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug, subcategory, treatment: treatmentSlug } = await params;
  const result = getTreatment(categorySlug, subcategory, treatmentSlug);
  if (!result) return {};
  return {
    title: `${result.treatment.name} | Aesthera Mère`,
    description: result.treatment.description,
  };
}

export default function TreatmentPage({ params }: Props) {
  return (
    <Suspense fallback={<TreatmentRouteFallback />}>
      <TreatmentContent params={params} />
    </Suspense>
  );
}

async function TreatmentContent({ params }: Pick<Props, "params">) {
  const { category: categorySlug, subcategory, treatment: treatmentSlug } = await params;
  if (categorySlug === "skin-radiance" && (subcategory === "premium-facials" || subcategory === "elite-facials")) {
    const legacyResult = getTreatment(categorySlug, "premium-elite-facials", treatmentSlug);
    if (legacyResult) {
      redirect(`/treatments/skin-radiance/premium-elite-facials/${treatmentSlug}`);
    }
  }
  const result = getTreatment(categorySlug, subcategory, treatmentSlug);
  if (!result) notFound();
  return <TreatmentDetailPage category={result.category} group={result.group} treatment={result.treatment} />;
}
