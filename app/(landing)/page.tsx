import { FinanceBar } from "@/components/finance-bar";
import { NavigationBar } from "@/components/navigation-bar";

export default async function Home() {
  return (
    <div className="bg-white h-full">
      <FinanceBar />
      <NavigationBar />
      <div className="h-full">test1</div>
      <div className="">test</div>
    </div>
  );
}
