import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UpgradeCard } from "@/components/upgrade-card";
import { GeneratorUI } from "@/components/generator-ui";

export default async function GeneratePage() {
  const isAuthed = (await cookies()).get("tf_auth")?.value === "true";
  if (!isAuthed) redirect("/");

  return (
    <div className="space-y-8 mx-56">
      <UpgradeCard />
      <GeneratorUI />
    </div>
  );
}
