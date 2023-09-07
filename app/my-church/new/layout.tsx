import ChurchFormStepLinks from "@/components/church-form-step-links";
import { Separator } from "@/components/ui/separator";

import { type ReactNode } from "react";

export default function ChurchFormLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='container max-w-7xl py-20'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>Add Your Church</h2>
        <p className='text-muted-foreground'>
          Let your church be found by others by adding it first.
        </p>
      </div>
      <Separator className='my-6' />
      <div className='flex gap-20'>
        <aside>
          <ChurchFormStepLinks />
        </aside>
        <div className='flex-1'>{children}</div>
      </div>
    </div>
  );
}
