"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthInputs = z.infer<typeof authSchema>;

export default function LoginForm() {
  const authForm = useForm<AuthInputs>({
    mode: "onSubmit",
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, register, formState } = authForm;

  const supabase = createClientComponentClient();

  const handleSignUp: SubmitHandler<AuthInputs> = async ({
    email,
    password,
  }) => {
    await supabase.auth.signUp({
      email,
      password,
    });
  };

  return (
    <div className='w-full max-w-md px-10 py-6 space-y-4 rounded-md shadow-md bg-white'>
      <form className='grid gap-2' onSubmit={handleSubmit(handleSignUp)}>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Login your account
          </h1>
          <p className='text-sm text-muted-foreground'>
            Sign in first before continuing
          </p>
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type='email'
            placeholder='youremail@example.com'
            {...register("email")}
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type='password'
            placeholder='Enter your password'
            {...register("password")}
          />
          <Link
            href='/forgot-password'
            className={cn(
              buttonVariants({ variant: "link" }),
              "px-0 text-xs text-muted-foreground"
            )}
          >
            Forgot your password?
          </Link>
        </div>
        <Button className='mt-4' type='submit' disabled={formState.isLoading}>
          Sign In with Email
        </Button>
      </form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
      </div>
      <Button variant='outline' className='w-full'>
        Google
      </Button>

      <div className='text-center pt-4'>
        <span className='text-sm mr-3'>Does not have an account yet?</span>
        <Link
          href='/register'
          className={cn(
            buttonVariants({ variant: "link" }),
            "px-0 text-sm text-primary"
          )}
        >
          Register
        </Link>
      </div>
    </div>
  );
}
