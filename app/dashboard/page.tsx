import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function DashboardPage() {
  return (
    <div>
      DashboardPage
      <Link href='/my-church/new' className={buttonVariants()}>
        Add Church
      </Link>
    </div>
  );
}

export default DashboardPage;
