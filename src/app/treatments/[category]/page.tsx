import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import TreatmentCategoryPage from "@/components/treatments/TreatmentCategoryPage";
import TreatmentRouteFallback from "@/components/treatments/TreatmentRouteFallback";
import { getTreatmentCategory, treatmentCategories } from "@/data/treatments";

type Props = PageProps<"/treatments/[category]">;

export function generateStaticParams() {
  return treatmentCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getTreatmentCategory(slug);
  if (!category) return {};
  return {
    title: `${category.name} Treatments | Aesthera Mère`,
    description: category.introduction,
  };
}

export default function CategoryPage({ params }: Props) {
  return (
    <Suspense fallback={<TreatmentRouteFallback />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: Pick<Props, "params">) {
  const { category: slug } = await params;
  const category = getTreatmentCategory(slug);
  if (!category) notFound();
  return <TreatmentCategoryPage category={category} />;
}
