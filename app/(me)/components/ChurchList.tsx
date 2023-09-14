import React from "react";

import { Church } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

function ChurchList({ churchList }: { churchList: Church[] }) {
  return (
    <div>
      <ul className='grid grid-cols-4'>
        {churchList.map((church) => (
          <li key={church.id}>
            <ChurchItem church={church} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChurchList;

const ChurchItem = ({ church }: { church: Church }) => {
  return (
    <Card>
      <CardHeader className='flex flex-row gap-4'>
        <Avatar className='bg-muted/40 rounded-md p-1'>
          <AvatarImage
            src={church.logo!}
            alt={church.name}
            className='object-cover'
          />
        </Avatar>
        <div>
          <CardTitle>{church.name}</CardTitle>
          <CardDescription>{church.welcome_message}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Badge variant='secondary' className='capitalize'>
          {church.status.toLowerCase()}
        </Badge>
        <div className='flex items-center gap-3'>
          <Link href='/listings' className={cn(buttonVariants(), "flex-1")}>
            View
          </Link>
          <Link
            href='/listings'
            className={cn(
              buttonVariants({ size: "icon", variant: "secondary" })
            )}
          >
            <span className='sr-only'>Edit</span>
            <Pencil1Icon />
          </Link>
          <Link
            href='/listings'
            className={cn(
              buttonVariants({ size: "icon", variant: "secondary" })
            )}
          >
            <span className='sr-only'>Delete</span>
            <TrashIcon />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
