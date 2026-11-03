import { notFound } from "next/navigation";
import AdminPanel from "../../../../../../admin_and_backend/AdminPanel";

const CATEGORIES = {
  "minicoach-edit": "mini-coach",
  "premiumcoach-edit": "premium-coach",
  "luxurycoach-edit": "luxury-coach",
};

export async function generateMetadata({ params }) {
  const { categoryEdit } = await params;
  return { title: `Edit coach | Bus Mantra Admin`, robots: { index: false, follow: false } };
}

export default async function FleetCoachEditorPage({ params }) {
  const { categoryEdit, coachId } = await params;
  const category = CATEGORIES[categoryEdit];
  if (!category) notFound();
  return <AdminPanel key={`${categoryEdit}-${coachId}`} initialSection="fleet-management" initialCategory={category} initialCoachId={coachId} />;
}
