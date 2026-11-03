import AdminPanel from "@admin/AdminPanel";

export const metadata = {
  title: "Admin Portal | Bus Mantra",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminPanel key="dashboard" initialSection="dashboard" />;
}
