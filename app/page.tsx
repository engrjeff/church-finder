import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const church = await supabase.from("churches").select("*");

  return (
    <div className='container max-w-7xl h-full py-20 flex flex-col items-center gap-8'>
      <pre>{JSON.stringify(church.data, null, 2)}</pre>
      <div className='space-y-4 text-center'>
        <h3 className='font-medium tracking-wider'>
          Every believer should have a home
        </h3>
        <h1 className='text-6xl font-bold'>Welcome to Church Finder PH!</h1>
        <h2 className='text-xl'>
          Find a church where you will grow in your faith in Christ
        </h2>
      </div>
      <div className='relative w-full max-w-xl'>
        <Input
          type='text'
          className='h-16 pl-6 pr-14 bg-secondary text-lg'
          placeholder='Search a church for you'
        />
        <MagnifyingGlassIcon className='h-6 w-6 text-muted-foreground absolute top-1/2 right-6 -translate-y-1/2' />
      </div>
      <div className='space-y-4'>
        <p>Already have a church?</p>
        <Button className='py-6 px-8 text-lg'>Add My Church</Button>
      </div>
    </div>
  );
}
