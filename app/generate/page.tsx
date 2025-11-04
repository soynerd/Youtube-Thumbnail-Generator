import { UpgradeCard } from "@/components/upgrade-card";
import { GeneratorUI } from "@/components/generator-ui";

export default async function GeneratePage() {
  return (
    <div className="space-y-8 mx-56">
      <UpgradeCard />
      <GeneratorUI />
    </div>
  );
}
