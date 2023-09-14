import React from "react";

import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function ProfileCompletion({ stepsCompleted }: { stepsCompleted: string[] }) {
  // if (stepsCompleted.length === 0) return null;
  return null;

  const stepsLeft = 6 - stepsCompleted.length;

  return (
    <Alert className='w-max bg-green-800/10'>
      <RocketIcon className='h-4 w-4' />
      <AlertTitle className='text-sm'>You&apos;re close!</AlertTitle>
      <AlertDescription className='text-xs'>
        You&apos;re {stepsLeft} steps closer to completing this church&apos;
        profile.
      </AlertDescription>
    </Alert>
  );
}

export default ProfileCompletion;
