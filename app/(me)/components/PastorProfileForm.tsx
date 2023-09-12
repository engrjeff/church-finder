"use client";

import React from "react";

import { useForm } from "react-hook-form";
import type { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  pastorProfileSchema,
  type PastorProfileData,
} from "@/lib/schema/church";
import AvatarPicker from "@/components/AvatarPicker";

const defaultValues: PastorProfileData = {
  pastor_name: "",
  bio: "",
  photo: "",
};

function PastorProfileForm() {
  const form = useForm<PastorProfileData>({
    resolver: zodResolver(pastorProfileSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<PastorProfileData> = (values) => {
    console.log(values);
  };

  const onError: SubmitErrorHandler<PastorProfileData> = (err) => {
    console.log(err);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className='space-y-6'
      >
        <FormField
          control={form.control}
          name='photo'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AvatarPicker
                  src={field.value}
                  label='Photo'
                  desc='Upload a photo'
                  onAfterUpload={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='pastor_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pastor&apos; name</FormLabel>
              <FormControl>
                <Input placeholder="Pastor's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormDescription>
                A short bio of who the church&apos; is.
              </FormDescription>
              <FormControl>
                <Textarea placeholder='Enter a short bio' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='space-x-4 pt-4'>
          <Button
            type='button'
            variant='outline'
            size='lg'
            className='shadow-none'
          >
            Save and Exit
          </Button>
          <Button type='submit' size='lg' className='ml-auto shadow-none'>
            Save and Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PastorProfileForm;
