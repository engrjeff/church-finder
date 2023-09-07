import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { MapPinIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  return (
    <div className='h-16 w-full flex items-center bg-white p-2 rounded-full gap-4 shadow-md'>
      <Button
        className='flex-shrink-0 rounded-full h-full'
        variant='ghost'
        size='lg'
      >
        <MapPinIcon className='h-4 w-4 mr-2' /> Churches near me
      </Button>
      <Separator orientation='vertical' />
      <Input
        className='border-none focus:ring-0 focus-visible:ring-0 shadow-none text-base'
        placeholder='Search for a church'
      />
      <Button className='rounded-full shadow-none h-full' size='lg'>
        Search
      </Button>
    </div>
  );
}
