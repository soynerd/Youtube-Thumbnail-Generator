import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UpgradeCard } from "@/components/upgrade-card";
import { GeneratorUI } from "@/components/generator-ui";
import { getUser } from "@/lib/getUser";

export default async function GeneratePage() {
  const user = await getUser();
  if (!user) redirect("/");

  return (
    <div className="space-y-8 mx-56">
      <UpgradeCard />
      <GeneratorUI />
    </div>
  );
}
