import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import AdminPanel from "@/components/AdminPanel";

const ADMIN_SECTIONS = new Set([
  "bookings",
  "inquiries",
  "admins",
]);

export async function generateMetadata({ params }) {
  const { section } = await params;
  if (section === "catalog") return { title: "Fleet management | Bus Mantra Admin" };
  const title = section.charAt(0).toUpperCase() + section.slice(1);
  return {
    title: `${title} | Bus Mantra Admin`,
    robots: { index: false, follow: false },
  };
}

export default async function AdminSectionPage({ params }) {
  const { section } = await params;
  if (section === "catalog") redirect("/admin/fleet-management");
  if (!ADMIN_SECTIONS.has(section)) notFound();
  return <AdminPanel key={section} initialSection={section} />;
}
