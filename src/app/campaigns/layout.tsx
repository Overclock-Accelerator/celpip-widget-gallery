import { SiteNav } from "@/components/SiteNav";

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className="min-h-[calc(100vh-3rem)] bg-gray-50">{children}</main>
    </>
  );
}
