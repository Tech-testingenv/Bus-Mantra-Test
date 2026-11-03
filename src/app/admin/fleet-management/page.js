import AdminPanel from "@admin/AdminPanel";

export const metadata = {
  title: "Fleet management | Bus Mantra Admin",
  robots: { index: false, follow: false },
};

export default function FleetManagementPage() {
  return <AdminPanel key="fleet-management" initialSection="fleet-management" />;
}
