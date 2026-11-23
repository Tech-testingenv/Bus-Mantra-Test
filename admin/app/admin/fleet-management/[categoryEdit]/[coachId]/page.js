import AdminPanel from "@/components/AdminPanel";

const LEGACY_CATEGORIES = {
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
  const category = LEGACY_CATEGORIES[categoryEdit] || categoryEdit;
  return <AdminPanel key={`${categoryEdit}-${coachId}`} initialSection="fleet-management" initialCategory={category} initialCoachId={coachId} />;
}
