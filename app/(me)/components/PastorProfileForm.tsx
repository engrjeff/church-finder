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
import { useRouter, useSearchParams } from "next/navigation";
import { createPastorProfile, updatePastorProfile } from "@/app/actions/church";
import { toast } from "react-toastify";

const defaultValues: PastorProfileData = {
  name: "",
  bio: "",
  photo: "",
};

function PastorProfileForm({
  pastorProfileId,
  pastorData,
}: {
  pastorProfileId?: string;
  pastorData?: PastorProfileData;
}) {
  const form = useForm<PastorProfileData>({
    resolver: zodResolver(pastorProfileSchema),
    defaultValues: pastorData ? pastorData : defaultValues,
    mode: "onChange",
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const church_id = searchParams.get("id");

  const handleSave = async (values: PastorProfileData) => {
    if (!church_id) return;

    if (pastorProfileId && pastorData) {
      // edit
      const result = await updatePastorProfile(pastorProfileId, values);

      if (result?.status === "success") {
        toast.success("Pastor profile updated!");
        return;
      }
    }

    const result = await createPastorProfile(church_id, values);

    if (result?.status === "success") {
      toast.success("Pastor profile saved!");
    }
  };

  const onSubmit: SubmitHandler<PastorProfileData> = async (values) => {
    await handleSave(values);

    router.push(`/listings/edit?id=${church_id}&step=media`, {
      scroll: true,
    });
  };

  const handleSaveAndExit = async () => {
    const noError = await form.trigger();

    if (!noError) return;

    const values = form.getValues();
    await handleSave(values);

    router.push("/listings");
  };

  const onError: SubmitErrorHandler<PastorProfileData> = (err) => {
    console.log(err);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <fieldset disabled={form.formState.isSubmitting} className='space-y-6'>
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
            name='name'
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
                  A short bio about the church&apos;s pastor.
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
              onClick={handleSaveAndExit}
            >
              Save and Exit
            </Button>
            <Button type='submit' size='lg' className='ml-auto shadow-none'>
              {form.formState.isSubmitting
                ? "Saving changes..."
                : "Save and Continue"}
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}

export default PastorProfileForm;
