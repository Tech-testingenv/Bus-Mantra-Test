import { notFound } from "next/navigation";
import AdminPanel from "@/components/AdminPanel";

const CATEGORIES = {
  "minicoach-edit": "mini-coach",
  "premiumcoach-edit": "premium-coach",
  "luxurycoach-edit": "luxury-coach",
};

export async function generateMetadata({ params }) {
  const { categoryEdit } = await params;
  const label = categoryEdit.replace("-edit", "").replace("mini", "Mini ").replace("premium", "Premium ").replace("luxury", "Luxury ");
  return { title: `${label.trim()} fleet | Bus Mantra Admin`, robots: { index: false, follow: false } };
}

export default async function FleetCategoryPage({ params }) {
  const { categoryEdit } = await params;
  const category = CATEGORIES[categoryEdit];
  if (!category) notFound();
  return <AdminPanel key={categoryEdit} initialSection="fleet-management" initialCategory={category} />;
}
