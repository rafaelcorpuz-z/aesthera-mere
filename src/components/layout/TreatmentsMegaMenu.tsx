
import Link from "next/link";

type Category = {
  title: string;
  slug: string;
  items: Array<{ title: string; slug: string }>;
};

type Props = {
  categories: Category[];
  onClose: () => void;
};

function TreatmentCategory({
  category,
  onClose,
}: {
  category: Category;
  onClose: () => void;
}) {
  return (
    <div>
      <h3 className="font-bodoni mb-4 text-[22px] font-bold leading-[1.2] text-[#4C5534] sm:mb-5 sm:text-[25px]">
        <Link href={`/treatments/${category.slug}`} onClick={onClose} className="transition-opacity hover:opacity-70">{category.title}</Link>
      </h3>

      <ul className="space-y-4">
        {category.items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/treatments/${category.slug}/${item.slug}`}
              onClick={onClose}
              className="font-montserrat group inline-flex items-center gap-2 text-[14px] leading-6 text-[#80755F] transition-colors duration-200 hover:text-[#4C5534]"
            >
              <span>{item.title}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                aria-hidden="true"
              >
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TreatmentsMegaMenu({
  categories,
  onClose,
}: Props) {
  const desktopColumns = [
    [categories[0]],
    [categories[1]],
    [categories[2], categories[3]],
  ];

  return (
    <div
      id="treatments-mega-menu"
      className="w-full border-t border-[#E9E6DE] bg-[#FFFCF3] shadow-[0_16px_30px_rgba(0,0,0,0.10)]"
    >
      <div className="scrollbar-hidden mx-auto max-h-[calc(100dvh-82px)] max-w-[1440px] touch-pan-y overscroll-contain overflow-y-auto px-5 py-6 sm:px-8 sm:py-8 lg:px-14 lg:py-10">

        {/* Responsive treatment categories */}
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:hidden">
          {categories.map((category) => (
            <TreatmentCategory
              key={category.title}
              category={category}
              onClose={onClose}
            />
          ))}
        </div>

        {/* Independent desktop columns avoid grid-row whitespace. */}
        <div className="hidden grid-cols-3 gap-x-14 lg:grid">
          {desktopColumns.map((column, index) => (
            <div key={index} className="space-y-6">
              {column.filter(Boolean).map((category) => (
                <TreatmentCategory
                  key={category.title}
                  category={category}
                  onClose={onClose}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
