export type Treatment = {
  slug: string;
  name: string;
  description: string;
  price: string;
  packagePrice?: string;
  priceNote?: string;
  priceLabel: "Per session" | "Starting price" | "Package" | "Price";
  image: string;
  imageAvailable?: boolean;
  benefits: string[];
  duration: string;
  sessions: string;
  downtime: string;
  collection?: "Premium Facial Selections" | "Elite Facial Selections";
};

export type TreatmentGroup = {
  slug: string;
  title: string;
  description: string;
  image: string;
  treatments: Treatment[];
};

export type TreatmentCategory = {
  slug: "skin-radiance" | "lift-contour" | "rejuvenation-volume" | "body-wellness";
  name: string;
  introduction: string;
  image: string;
  groups: TreatmentGroup[];
};

const consultationDetails = {
  duration: "Confirmed during consultation",
  sessions: "Personalized after assessment",
  downtime: "Discussed before treatment",
};

const premiumFacials: Treatment[] = [
  {
    slug: "aqua-reset-facial",
    name: "Aqua Reset Facial",
    description: "Deep pore cleansing with exfoliation and hydration for refreshed skin.",
    price: "₱1,280",
    packagePrice: "5+1 package: ₱6,400",
    priceLabel: "Per session",
    image: "/images/treatments/premium facials/pf1.png",
    collection: "Premium Facial Selections",
    benefits: ["Deep cleansing", "Gentle exfoliation", "Hydration support"],
    ...consultationDetails,
  },
  {
    slug: "oxy-radiance-facial",
    name: "Oxy Radiance Facial",
    description: "Oxygen infusion to hydrate, brighten, and revive tired skin.",
    price: "₱1,580",
    packagePrice: "5+1 package: ₱7,900",
    priceLabel: "Per session",
    image: "/images/treatments/premium facials/pf2.png",
    collection: "Premium Facial Selections",
    benefits: ["Hydration support", "Brighter-looking complexion", "Refreshed appearance"],
    ...consultationDetails,
  },
  {
    slug: "carbon-laser-facial",
    name: "Carbon Laser Facial",
    description: "Pore-refining laser treatment for smoother, brighter skin.",
    price: "₱1,580",
    packagePrice: "5+1 package: ₱7,900",
    priceLabel: "Per session",
    image: "/images/treatments/premium facials/pf3.png",
    collection: "Premium Facial Selections",
    benefits: ["Pore refinement", "Smoother-looking texture", "Brighter-looking skin"],
    ...consultationDetails,
  },
];

const eliteFacials: Treatment[] = [
  {
    slug: "korean-skin-reset-facial",
    name: "Korean Skin Reset Facial",
    description: "Deep cleanse, exfoliation, and hydration to restore smooth, clear, balanced skin.",
    price: "₱1,680",
    packagePrice: "5+1 package: ₱8,400",
    priceLabel: "Per session",
    image: "/images/treatments/premium facials/pf4.png",
    collection: "Premium Facial Selections",
    benefits: ["Deep cleansing", "Texture refinement", "Balanced hydration"],
    ...consultationDetails,
  },
  {
    slug: "korean-acne-clarity-facial",
    name: "Korean Acne Clarity Facial",
    description: "Acne-focused treatment to clear pores, reduce breakouts, and calm the skin.",
    price: "₱1,880",
    packagePrice: "5+1 package: ₱9,400",
    priceLabel: "Per session",
    image: "/images/treatments/premium facials/pf5.png",
    collection: "Premium Facial Selections",
    benefits: ["Pore cleansing", "Blemish-prone skin care", "Calmer-looking skin"],
    ...consultationDetails,
  },
  {
    slug: "korean-whitening-facial",
    name: "Korean Whitening Facial",
    description: "Deep pore cleansing with exfoliation and hydration for refreshed skin.",
    price: "₱2,880",
    packagePrice: "5+1 package: ₱14,400",
    priceLabel: "Per session",
    image: "/images/treatments/elite facials/ef1.png",
    collection: "Elite Facial Selections",
    benefits: ["Deep cleansing", "Gentle exfoliation", "Brighter-looking skin"],
    ...consultationDetails,
  },
  {
    slug: "korean-age-defy-facial",
    name: "Korean Age Defy Facial",
    description: "Oxygen infusion to hydrate, brighten, and revive tired skin.",
    price: "₱2,880",
    packagePrice: "5+1 package: ₱14,400",
    priceLabel: "Per session",
    image: "/images/treatments/elite facials/ef2.png",
    collection: "Elite Facial Selections",
    benefits: ["Hydration support", "Texture care", "Refreshed appearance"],
    ...consultationDetails,
  },
  {
    slug: "aqua-reset-fusion",
    name: "Aqua Reset Fusion",
    description: "Deep pore cleansing with exfoliation and hydration for refreshed skin.",
    price: "₱2,580",
    packagePrice: "5+1 package: ₱12,900",
    priceLabel: "Per session",
    image: "/images/treatments/elite facials/ef3.png",
    collection: "Elite Facial Selections",
    benefits: ["Deep cleansing", "Exfoliation", "Enhanced hydration"],
    ...consultationDetails,
  },
  {
    slug: "oxy-radiance-fusion",
    name: "Oxy Radiance Fusion",
    description: "Oxygen infusion to hydrate, brighten, and revive tired skin.",
    price: "₱2,780",
    packagePrice: "5+1 package: ₱13,900",
    priceLabel: "Per session",
    image: "/images/treatments/elite facials/epf5.png",
    collection: "Elite Facial Selections",
    benefits: ["Hydration support", "Radiance care", "Revitalized appearance"],
    ...consultationDetails,
  },
];

const premiumEliteFacials = [...premiumFacials, ...eliteFacials];

type PendingMenuTreatment = Pick<Treatment, "slug" | "name" | "price" | "priceLabel" | "image"> &
  Pick<Partial<Treatment>, "packagePrice" | "priceNote">;

function createPendingMenuTreatment(input: PendingMenuTreatment): Treatment {
  return {
    ...input,
    description: "Treatment details are confirmed during consultation.",
    benefits: ["Details confirmed during consultation"],
    imageAvailable: false,
    ...consultationDetails,
  };
}

const laserTreatments: Treatment[] = [
  createPendingMenuTreatment({ slug: "ipl-whitening", name: "IPL Whitening", price: "₱1,495–₱2,695 by area", packagePrice: "5+2: ₱7,475–₱13,475", priceLabel: "Per session", image: "/images/treatments/laser-treatments/ipl-whitening.png" }),
  createPendingMenuTreatment({ slug: "ipl-hair-removal", name: "IPL Hair Removal", price: "₱1,495–₱2,695 by area", packagePrice: "5+2: ₱7,475–₱13,475", priceLabel: "Per session", image: "/images/treatments/laser-treatments/ipl-hair-removal.png" }),
  createPendingMenuTreatment({ slug: "ipl-skin-clarity", name: "IPL Skin Clarity", price: "₱1,495–₱2,495 by area", packagePrice: "5+2: ₱7,475–₱12,475", priceLabel: "Per session", image: "/images/treatments/laser-treatments/ipl-skin-clarity.png" }),
  createPendingMenuTreatment({ slug: "ipl-bright-smooth", name: "IPL Bright and Smooth", price: "₱2,495–₱3,995 by area", packagePrice: "5+2: ₱12,475–₱19,975", priceLabel: "Per session", image: "/images/treatments/laser-treatments/ipl-bright-smooth.png" }),
  createPendingMenuTreatment({ slug: "diode-hair-removal", name: "Diode Hair Removal", price: "₱1,495–₱2,695 by area", packagePrice: "5+2: ₱7,475–₱13,475", priceLabel: "Per session", image: "/images/treatments/laser-treatments/diode-hair-removal.png" }),
  createPendingMenuTreatment({ slug: "thera-pico-laser", name: "Thera Pico Laser / Thera Pico Treatment", price: "₱1,495–₱3,495 by area", packagePrice: "5+2: ₱7,475–₱17,475", priceNote: "Overview lists a ₱1,495 starting price.", priceLabel: "Starting price", image: "/images/treatments/laser-treatments/thera-pico-laser.png" }),
  createPendingMenuTreatment({ slug: "thera-fractional-laser", name: "Thera Fractional Laser", price: "₱2,995–₱6,995 by area", packagePrice: "3+1: ₱8,985–₱20,985", priceLabel: "Per session", image: "/images/treatments/laser-treatments/thera-fractional-laser.png" }),
  createPendingMenuTreatment({ slug: "precision-laser-wart-removal", name: "Precision Laser Wart Removal", price: "₱2,995 per area", packagePrice: "3+1: ₱8,985", priceLabel: "Price", image: "/images/treatments/laser-treatments/precision-laser-wart-removal.png" }),
];

const skinPeelsResurfacing: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-biorenew-peel", name: "Thera BioRenew Peel", price: "₱4,790–₱8,990 by area", packagePrice: "3+1: ₱14,370–₱26,970", priceLabel: "Per session", image: "/images/treatments/skin-peels-resurfacing/thera-biorenew-peel.png" }),
  createPendingMenuTreatment({ slug: "korean-facial-skin-renewal-peel", name: "Korean Facial Skin Renewal Peel", price: "₱5,480", packagePrice: "3 sessions (10% off): ₱14,796", priceLabel: "Per session", image: "/images/treatments/skin-peels-resurfacing/korean-facial-skin-renewal-peel.png" }),
  createPendingMenuTreatment({ slug: "korean-body-clarity-renewal-peel", name: "Korean Body Clarity Renewal Peel", price: "₱3,990–₱6,990 by area", packagePrice: "3 sessions (10% off): ₱10,773–₱18,873", priceLabel: "Per session", image: "/images/treatments/skin-peels-resurfacing/korean-body-clarity-renewal-peel.png" }),
  createPendingMenuTreatment({ slug: "thera-prx-glow", name: "Thera PRX Glow", price: "₱9,990 full face; ₱11,990 face + neck", packagePrice: "3 sessions: ₱23,976–₱28,976", priceLabel: "Per session", image: "/images/treatments/skin-peels-resurfacing/thera-prx-glow.png" }),
  createPendingMenuTreatment({ slug: "thera-prx-glow-premium", name: "Thera PRX Glow Premium", price: "₱12,990 full face; ₱14,990 face + neck", packagePrice: "3 sessions: ₱31,176–₱35,976", priceLabel: "Per session", image: "/images/treatments/skin-peels-resurfacing/thera-prx-glow-premium.png" }),
  createPendingMenuTreatment({ slug: "thera-prx-glow-elite", name: "Thera PRX Glow Elite", price: "₱21,990 full face; ₱23,990 face + neck", packagePrice: "3 sessions: ₱52,776–₱57,576", priceLabel: "Per session", image: "/images/treatments/skin-peels-resurfacing/thera-prx-glow-elite.png" }),
  createPendingMenuTreatment({ slug: "thera-scarflift-precision", name: "Thera ScarFlift Precision", price: "₱4,990", packagePrice: "3+1: ₱14,970", priceLabel: "Per session", image: "/images/treatments/skin-peels-resurfacing/thera-scarflift-precision.png" }),
  createPendingMenuTreatment({ slug: "thera-scarflift-infusion", name: "Thera ScarFlift Infusion", price: "₱5,990", packagePrice: "3+1: ₱17,970", priceLabel: "Per session", image: "/images/treatments/skin-peels-resurfacing/thera-scarflift-infusion.png" }),
];

const microneedlingSkinRepair: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-skinpen-microneedling", name: "Thera SkinPen Microneedling", price: "₱11,990", packagePrice: "3 sessions (15% off): ₱30,574.50", priceLabel: "Per session", image: "/images/treatments/microneedling-skin-repair/thera-skinpen-microneedling.png" }),
  createPendingMenuTreatment({ slug: "thera-prp-regenerative-therapy-face", name: "TheraPRP Regenerative Therapy – Face", price: "₱3,990", packagePrice: "3 sessions (20% off): ₱9,576", priceLabel: "Per session", image: "/images/treatments/microneedling-skin-repair/thera-prp-face.png" }),
  createPendingMenuTreatment({ slug: "thera-xosomes-elite-skinpen", name: "TheraXosomes Elite (ASCE+) – SkinPen", price: "₱24,990", packagePrice: "3 sessions (15% off): ₱63,724.50", priceLabel: "Per session", image: "/images/treatments/microneedling-skin-repair/thera-xosomes-elite-skinpen.png" }),
  createPendingMenuTreatment({ slug: "thera-xosomes-elite-rf-microneedling", name: "TheraXosomes Elite (ASCE+) – RF Microneedling", price: "₱18,990", packagePrice: "3 sessions (15% off): ₱48,424.50", priceLabel: "Per session", image: "/images/treatments/microneedling-skin-repair/thera-xosomes-elite-rf-microneedling.png" }),
  createPendingMenuTreatment({ slug: "thera-xosomes-elite-co2-fractional", name: "TheraXosomes Elite (ASCE+) – CO2 Fractional", price: "₱18,990", packagePrice: "3 sessions (15% off): ₱48,424.50", priceLabel: "Per session", image: "/images/treatments/microneedling-skin-repair/thera-xosomes-elite-co2-fractional.png" }),
  createPendingMenuTreatment({ slug: "thera-xosomes-elite-remeepro", name: "TheraXosomes Elite (ASCE+) – RemeePro", price: "₱24,990", packagePrice: "3 sessions (15% off): ₱63,724.50", priceLabel: "Per session", image: "/images/treatments/microneedling-skin-repair/thera-xosomes-elite-remeepro.png" }),
];

const hairRestoration: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-prp-regenerative-therapy-hair", name: "TheraPRP Regenerative Therapy – Hair", price: "₱4,990", packagePrice: "3 sessions (20% off): ₱11,976", priceLabel: "Per session", image: "/images/treatments/hair-restoration/thera-prp-hair.png" }),
  createPendingMenuTreatment({ slug: "hair-thera-xosomes-premium-dr-pen", name: "Hair TheraXosomes Premium – Dr. Pen", price: "₱7,990", packagePrice: "3 sessions (15% off): ₱20,374.50", priceLabel: "Per session", image: "/images/treatments/hair-restoration/hair-thera-xosomes-premium-dr-pen.png" }),
  createPendingMenuTreatment({ slug: "hair-thera-xosomes-premium-remeepro", name: "Hair TheraXosomes Premium – RemeePro", price: "₱10,990", packagePrice: "3 sessions (15% off): ₱28,024.50", priceLabel: "Per session", image: "/images/treatments/hair-restoration/hair-thera-xosomes-premium-remeepro.png" }),
  createPendingMenuTreatment({ slug: "hair-thera-xosomes-elite-dr-pen", name: "Hair TheraXosomes Elite (ASCE+) – Dr. Pen", price: "₱19,990", packagePrice: "3 sessions (15% off): ₱50,974.50", priceLabel: "Per session", image: "/images/treatments/hair-restoration/hair-thera-xosomes-elite-dr-pen.png" }),
  createPendingMenuTreatment({ slug: "hair-thera-xosomes-elite-remeepro", name: "Hair TheraXosomes Elite (ASCE+) – RemeePro", price: "₱23,990", packagePrice: "3 sessions (15% off): ₱61,174.50", priceLabel: "Per session", image: "/images/treatments/hair-restoration/hair-thera-xosomes-elite-remeepro.png" }),
];

const faceLiftingTightening: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-hifu-contouring-face-neck", name: "Thera HIFU Contouring (12D) – Face & Neck", price: "₱2,995–₱4,995 by area", packagePrice: "3+1: ₱8,985–₱14,985", priceLabel: "Per session", image: "/images/treatments/face-lifting-tightening/thera-hifu-face-neck.png" }),
  createPendingMenuTreatment({ slug: "ultraformer-mpt-face-neck", name: "Ultraformer MPT – Face & Neck", price: "₱39,990–₱59,990 by area", priceLabel: "Price", image: "/images/treatments/face-lifting-tightening/ultraformer-mpt-face-neck.png" }),
];

const bodyContouringFatReduction: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-hifu-contouring-body", name: "Thera HIFU Contouring (12D) – Body", price: "₱4,995–₱5,995 by area", packagePrice: "3+1: ₱14,985–₱17,985", priceLabel: "Per session", image: "/images/treatments/body-contouring-fat-reduction/thera-hifu-body.png" }),
  createPendingMenuTreatment({ slug: "thera-exilift-360", name: "Thera Exilift 360", price: "₱1,995–₱2,995 by size", packagePrice: "5+2: ₱9,975–₱14,975", priceLabel: "Per session", image: "/images/treatments/body-contouring-fat-reduction/thera-exilift-360.png" }),
  createPendingMenuTreatment({ slug: "thera-cryolipo", name: "Thera Cryolipo", price: "₱3,995 any area", packagePrice: "5+1: ₱19,975", priceLabel: "Per session", image: "/images/treatments/body-contouring-fat-reduction/thera-cryolipo.png" }),
  createPendingMenuTreatment({ slug: "ultraformer-mpt-body", name: "Ultraformer MPT – Abdomen & Arms", price: "₱89,990 abdomen; ₱74,990 arms", priceLabel: "Price", image: "/images/treatments/body-contouring-fat-reduction/ultraformer-mpt-body.png" }),
];

const muscleToning: Treatment[] = [
  createPendingMenuTreatment({ slug: "therasculpt-neo", name: "TheraSculpt Neo", price: "₱2,495", packagePrice: "5+2: ₱12,475", priceLabel: "Per session", image: "/images/treatments/muscle-toning/therasculpt-neo.png" }),
];

const slimmingBodySculptingPrograms: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-slimming-injections", name: "Thera Slimming Injections", price: "₱6,990", packagePrice: "4+1: ₱27,960", priceNote: "Includes Lemon Bottle + Thera Exilift 360.", priceLabel: "Per session", image: "/images/treatments/slimming-body-sculpting/thera-slimming-injections.png" }),
  createPendingMenuTreatment({ slug: "thera-body-contouring-program", name: "Thera Body Contouring Program", price: "₱9,990", packagePrice: "4+1: ₱39,960", priceNote: "Includes Lemon Bottle + Thera Exilift 360 + TheraSculpt Neo.", priceLabel: "Per session", image: "/images/treatments/slimming-body-sculpting/thera-body-contouring-program.png" }),
];

const theraToxAreaPrices = "Forehead ₱4,990; Frowns ₱4,990; Crow’s Feet ₱4,990; Jawtox ₱8,990; Nefertiti ₱4,990; Lip Flip ₱3,590; Nosetox ₱4,990; Sweatox ₱14,990; Traptox ₱9,990; Barbie Arms/Legs ₱14,990.";
const theraToxEliteAreaPrices = "Forehead ₱7,490; Frowns ₱7,490; Crow’s Feet ₱7,490; Jawtox ₱16,990; Nefertiti ₱7,490; Lip Flip ₱4,990; Nosetox ₱7,490; Sweatox ₱29,990; Traptox ₱10,990; Barbie Arms/Legs ₱29,990.";

const botoxTreatments: Treatment[] = [
  createPendingMenuTreatment({ slug: "theratox", name: "TheraTox", price: "₱3,590–₱14,990 depending on area", priceNote: theraToxAreaPrices, priceLabel: "Per session", image: "/images/treatments/botox-treatments/theratox.png" }),
  createPendingMenuTreatment({ slug: "theratox-elite-xeomin", name: "TheraTox Elite (Xeomin)", price: "₱4,990–₱29,990 depending on area", priceNote: theraToxEliteAreaPrices, priceLabel: "Per session", image: "/images/treatments/botox-treatments/theratox-elite-xeomin.png" }),
];

const dermalLipFillers: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-lip-premium-filler", name: "Thera Lip Premium Filler", price: "₱11,990", priceLabel: "Price", image: "/images/treatments/dermal-lip-fillers/thera-lip-premium-filler.png" }),
  createPendingMenuTreatment({ slug: "thera-lip-elite-filler", name: "Thera Lip Elite Filler", price: "₱23,990", priceLabel: "Price", image: "/images/treatments/dermal-lip-fillers/thera-lip-elite-filler.png" }),
  createPendingMenuTreatment({ slug: "thera-premium-filler", name: "Thera Premium Filler", price: "₱11,990", priceLabel: "Price", image: "/images/treatments/dermal-lip-fillers/thera-premium-filler.png" }),
  createPendingMenuTreatment({ slug: "thera-elite-filler", name: "Thera Elite Filler", price: "₱23,990", priceLabel: "Price", image: "/images/treatments/dermal-lip-fillers/thera-elite-filler.png" }),
];

const signatureSkinBoosters: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-radiance-signature-booster", name: "Thera Radiance Signature Booster", price: "₱5,990 standard; ₱7,990 RemeePro", packagePrice: "5+1: ₱29,950 standard; ₱39,950 RemeePro", priceLabel: "Per session", image: "/images/treatments/signature-skin-boosters/thera-radiance-signature-booster.png" }),
  createPendingMenuTreatment({ slug: "thera-repair-signature-booster", name: "Thera Repair Signature Booster", price: "₱5,990 standard; ₱7,990 RemeePro", packagePrice: "5+1: ₱29,950 standard; ₱39,950 RemeePro", priceLabel: "Per session", image: "/images/treatments/signature-skin-boosters/thera-repair-signature-booster.png" }),
  createPendingMenuTreatment({ slug: "thera-lift-signature-booster", name: "Thera Lift Signature Booster", price: "₱5,990 standard; ₱7,990 RemeePro", packagePrice: "5+1: ₱29,950 standard; ₱39,950 RemeePro", priceLabel: "Per session", image: "/images/treatments/signature-skin-boosters/thera-lift-signature-booster.png" }),
];

const eliteSkinBoostersRenewal: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-rejuran-h", name: "Thera Rejuran H", price: "₱23,995", packagePrice: "3 sessions: ₱64,786.50", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-rejuran-h.png" }),
  createPendingMenuTreatment({ slug: "thera-rejuran-h-remeepro", name: "Thera Rejuran H + RemeePro", price: "₱26,995", packagePrice: "3 sessions: ₱72,886.50", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-rejuran-h-remeepro.png" }),
  createPendingMenuTreatment({ slug: "thera-rejuran-h-plus", name: "Thera Rejuran H+", price: "₱35,995", packagePrice: "3 sessions: ₱97,186.50", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-rejuran-h-plus.png" }),
  createPendingMenuTreatment({ slug: "thera-rejuran-h-plus-remeepro", name: "Thera Rejuran H+ + RemeePro", price: "₱38,995", packagePrice: "3 sessions: ₱105,286.50", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-rejuran-h-plus-remeepro.png" }),
  createPendingMenuTreatment({ slug: "thera-painless-rejuran", name: "Thera Painless Rejuran", price: "₱39,995", packagePrice: "3 sessions: ₱107,986.50", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-painless-rejuran.png" }),
  createPendingMenuTreatment({ slug: "thera-rejuran-i", name: "Thera Rejuran I", price: "₱13,995", packagePrice: "3 sessions: ₱37,786.50", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-rejuran-i.png" }),
  createPendingMenuTreatment({ slug: "thera-rejuran-s", name: "Thera Rejuran S", price: "₱13,995", packagePrice: "3 sessions: ₱37,786.50", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-rejuran-s.png" }),
  createPendingMenuTreatment({ slug: "thera-luhilo-classic", name: "Thera Luhilo Classic", price: "₱18,990", packagePrice: "3 sessions: ₱51,273", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-luhilo-classic.png" }),
  createPendingMenuTreatment({ slug: "thera-luhilo-snow", name: "Thera Luhilo Snow", price: "₱21,990", packagePrice: "3 sessions: ₱59,373", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-luhilo-snow.png" }),
  createPendingMenuTreatment({ slug: "thera-juvelook", name: "Thera JuveLook", price: "₱19,990", packagePrice: "3 sessions: ₱47,976", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-juvelook.png" }),
  createPendingMenuTreatment({ slug: "thera-juvelook-remeepro", name: "Thera JuveLook with RemeePro", price: "₱22,990", packagePrice: "3 sessions: ₱55,176", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-juvelook-remeepro.png" }),
  createPendingMenuTreatment({ slug: "thera-juvelook-cannula", name: "Thera JuveLook with Cannula", price: "₱22,990", packagePrice: "3 sessions: ₱55,176", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-juvelook-cannula.png" }),
  createPendingMenuTreatment({ slug: "thera-juvelook-undereye", name: "Thera JuveLook – Undereye", price: "₱13,990", packagePrice: "3 sessions: ₱33,576", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-juvelook-undereye.png" }),
  createPendingMenuTreatment({ slug: "thera-italian-lip-booster", name: "Thera Italian Lip Booster", price: "₱12,990", packagePrice: "3 sessions: ₱35,073", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-italian-lip-booster.png" }),
  createPendingMenuTreatment({ slug: "thera-nctf-treatment", name: "Thera NCTF Treatment", price: "₱18,990", packagePrice: "3 sessions: ₱51,273", priceLabel: "Per session", image: "/images/treatments/elite-skin-boosters/thera-nctf-treatment.png" }),
  createPendingMenuTreatment({ slug: "thera-sculptra", name: "Thera Sculptra", price: "₱44,990", priceLabel: "Price", image: "/images/treatments/elite-skin-boosters/thera-sculptra.png" }),
];

const collagenRenewalPrograms: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-sculptra-collagen-renewal-program", name: "Thera Sculptra Collagen Renewal Program", price: "₱134,970", priceLabel: "Package", image: "/images/treatments/collagen-renewal/thera-sculptra-collagen-renewal-program.png" }),
];

const heroAestheraDrips: Treatment[] = [
  createPendingMenuTreatment({ slug: "harmonias-push", name: "Harmonia’s Push (Balance)", price: "₱1,190", packagePrice: "10+2: ₱11,900", priceLabel: "Per session", image: "/images/treatments/hero-aesthera-drips/harmonias-push.png" }),
  createPendingMenuTreatment({ slug: "helens-drip", name: "Helen’s Drip (Trio)", price: "₱1,890", packagePrice: "10+2: ₱18,900", priceLabel: "Per session", image: "/images/treatments/hero-aesthera-drips/helens-drip.png" }),
  createPendingMenuTreatment({ slug: "hercules-drip", name: "Hercules Drip (Myer’s Cocktail)", price: "₱1,990", packagePrice: "10+2: ₱19,900", priceLabel: "Per session", image: "/images/treatments/hero-aesthera-drips/hercules-drip.png" }),
];

const divineAestheraDrips: Treatment[] = [
  createPendingMenuTreatment({ slug: "aphrodite-drip", name: "Aphrodite Drip", price: "₱2,990", packagePrice: "5+1: ₱14,950", priceLabel: "Per session", image: "/images/treatments/divine-aesthera-drips/aphrodite-drip.png" }),
  createPendingMenuTreatment({ slug: "poseidon-drip", name: "Poseidon Drip", price: "₱2,990", packagePrice: "5+1: ₱14,950", priceLabel: "Per session", image: "/images/treatments/divine-aesthera-drips/poseidon-drip.png" }),
  createPendingMenuTreatment({ slug: "zeus", name: "Zeus", price: "₱3,990", packagePrice: "5+1: ₱19,950", priceLabel: "Per session", image: "/images/treatments/divine-aesthera-drips/zeus.png" }),
  createPendingMenuTreatment({ slug: "apollo-drip", name: "Apollo Drip", price: "₱2,290", packagePrice: "5+1: ₱11,450", priceLabel: "Per session", image: "/images/treatments/divine-aesthera-drips/apollo-drip.png" }),
  createPendingMenuTreatment({ slug: "artemis-drip", name: "Artemis Drip", price: "₱3,290", packagePrice: "5+1: ₱16,450", priceLabel: "Per session", image: "/images/treatments/divine-aesthera-drips/artemis-drip.png" }),
];

const nadTherapy: Treatment[] = [
  createPendingMenuTreatment({ slug: "thera-nad-plus", name: "Thera NAD+", price: "125 mg: ₱9,990; 250 mg: ₱16,990", packagePrice: "3 sessions — 125 mg: ₱26,973; 250 mg: ₱45,873", priceLabel: "Per session", image: "/images/treatments/nad-therapy/thera-nad-plus.png" }),
  createPendingMenuTreatment({ slug: "thera-nad-plus-elite", name: "Thera NAD+ Elite (RejuvaNAD+)", price: "125 mg: ₱11,990; 250 mg: ₱19,990", packagePrice: "3 sessions — 125 mg: ₱32,373; 250 mg: ₱53,973", priceLabel: "Per session", image: "/images/treatments/nad-therapy/thera-nad-plus-elite.png" }),
];

const weightManagementProtocols: Treatment[] = [
  createPendingMenuTreatment({ slug: "glp-1-compound-weight-management", name: "GLP-1 Compound Weight Management Protocol", price: "2.5 mg: ₱2,490; 5 mg: ₱3,490; 7.5 mg: ₱4,490", packagePrice: "3+1 — 2.5 mg: ₱7,968; 5 mg: ₱11,168; 7.5 mg: ₱14,368", priceLabel: "Per session", image: "/images/treatments/weight-management/glp-1-compound.png" }),
  createPendingMenuTreatment({ slug: "mounjaro-weight-management", name: "Mounjaro Weight Management Protocol", price: "2.5 mg: ₱13,995; 5 mg: ₱15,995; 7.5 mg: ₱21,995", priceLabel: "Per session", image: "/images/treatments/weight-management/mounjaro.png" }),
];

const ivDripAddons: Treatment[] = [
  createPendingMenuTreatment({ slug: "collagen-boost", name: "Collagen Boost", price: "₱300 per ampoule", priceLabel: "Price", image: "/images/treatments/iv-drip-addons/collagen-boost.png" }),
  createPendingMenuTreatment({ slug: "placenta-boost", name: "Placenta Boost", price: "₱1,200 per ampoule", priceLabel: "Price", image: "/images/treatments/iv-drip-addons/placenta-boost.png" }),
];

export const treatmentCategories: TreatmentCategory[] = [
  {
    slug: "skin-radiance",
    name: "Skin & Radiance",
    introduction: "Refine texture, clarity, and glow with treatments selected around your skin's individual needs.",
    image: "/images/treatments/treatment1.png",
    groups: [
      { slug: "premium-elite-facials", title: "Premium & Elite Facials", description: "Essential and elevated facial care for hydration, clarity, and renewed radiance.", image: "/images/treatments/pf1.png", treatments: premiumEliteFacials },
      { slug: "laser-treatments", title: "Laser Treatments", description: "Advanced skin-focused treatment options.", image: "/images/treatments/treatment1.png", treatments: laserTreatments },
      { slug: "skin-peels-resurfacing", title: "Skin Peels & Resurfacing", description: "Care focused on texture and overall skin appearance.", image: "/images/treatments/pf2.png", treatments: skinPeelsResurfacing },
      { slug: "microneedling-skin-repair", title: "Microneedling & Skin Repair", description: "Targeted options for skin renewal and repair.", image: "/images/treatments/pf3.png", treatments: microneedlingSkinRepair },
      { slug: "hair-restoration", title: "Hair Restoration", description: "Personalized options for hair and scalp concerns.", image: "/images/treatments/pf4.png", treatments: hairRestoration },
    ],
  },
  {
    slug: "lift-contour",
    name: "Lifting & Contouring",
    introduction: "Explore considered face and body treatments designed around definition, balance, and contour.",
    image: "/images/treatments/treatment2.png",
    groups: [
      { slug: "face-body-lifting", title: "Face Lifting & Tightening", description: "Non-surgical options designed around lift and definition.", image: "/images/treatments/treatment2.png", treatments: faceLiftingTightening },
      { slug: "body-sculpting", title: "Body Contouring & Fat Reduction", description: "Body-focused treatments for contour and definition.", image: "/images/treatments/treatment4.png", treatments: bodyContouringFatReduction },
      { slug: "muscle-toning", title: "Muscle Toning", description: "Treatment options focused on muscle definition.", image: "/images/treatments/pf3.png", treatments: muscleToning },
      { slug: "slimming-treatments", title: "Slimming & Body Sculpting Programs", description: "Guided treatment options aligned with body goals.", image: "/images/treatments/pf2.png", treatments: slimmingBodySculptingPrograms },
    ],
  },
  {
    slug: "rejuvenation-volume",
    name: "Facial Rejuvenation",
    introduction: "Discover physician-led options for refreshed-looking skin, balanced volume, and natural-looking renewal.",
    image: "/images/treatments/treatment3.png",
    groups: [
      { slug: "botox-treatments", title: "TheraTox / Botox Services", description: "Consultation-led options for expression lines and facial balance.", image: "/images/treatments/treatment3.png", treatments: botoxTreatments },
      { slug: "dermal-fillers", title: "Dermal & Lip Fillers", description: "Personalized treatments focused on proportion and volume.", image: "/images/treatments/pf3.png", treatments: dermalLipFillers },
      { slug: "signature-skin-boosters", title: "Signature Skin Boosters", description: "Aesthera Mère booster options tailored to individual goals.", image: "/images/treatments/pf4.png", treatments: signatureSkinBoosters },
      { slug: "renewal-therapy", title: "Elite Skin Boosters & Renewal Therapy", description: "Regenerative options for refreshed-looking skin.", image: "/images/treatments/pf1.png", treatments: eliteSkinBoostersRenewal },
      { slug: "collagen-treatments", title: "Collagen Renewal Programs", description: "Treatments selected to support skin structure and renewal.", image: "/images/treatments/pf2.png", treatments: collagenRenewalPrograms },
    ],
  },
  {
    slug: "body-wellness",
    name: "Wellness & Weight Management",
    introduction: "Support your aesthetic and wellness goals with personalized therapies and guided programs.",
    image: "/images/treatments/treatment4.png",
    groups: [
      { slug: "hero-aesthera-drips", title: "Hero Aesthera Drips", description: "Aesthera Mère IV options provided after medical assessment.", image: "/images/treatments/treatment4.png", treatments: heroAestheraDrips },
      { slug: "divine-aesthera-drips", title: "Divine Aesthera Drips", description: "Premium IV options selected around individual wellness goals.", image: "/images/treatments/pf4.png", treatments: divineAestheraDrips },
      { slug: "nad-therapy", title: "NAD+ Therapy", description: "Clinician-guided NAD+ options following suitability screening.", image: "/images/treatments/pf3.png", treatments: nadTherapy },
      { slug: "weight-management", title: "Weight Management Protocols", description: "Doctor-guided programs based on assessment and eligibility.", image: "/images/treatments/pf2.png", treatments: weightManagementProtocols },
      { slug: "iv-drip-addons", title: "IV Drip Add-ons", description: "Optional add-ons for eligible IV drip treatments.", image: "/images/treatments/pf5.png", treatments: ivDripAddons },
    ],
  },
];

export function getTreatmentCategory(slug: string) {
  return treatmentCategories.find((category) => category.slug === slug);
}

export function getTreatmentGroup(categorySlug: string, groupSlug: string) {
  const category = getTreatmentCategory(categorySlug);
  const group = category?.groups.find((item) => item.slug === groupSlug);
  return category && group ? { category, group } : undefined;
}

export function getTreatment(categorySlug: string, groupSlug: string, treatmentSlug: string) {
  const result = getTreatmentGroup(categorySlug, groupSlug);
  const treatment = result?.group.treatments.find((item) => item.slug === treatmentSlug);
  return result && treatment ? { ...result, treatment } : undefined;
}
