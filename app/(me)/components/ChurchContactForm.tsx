"use client";

import React, { useState } from "react";

import { useFieldArray, useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  churchContactSchema,
  type ChurchContactData,
} from "@/lib/schema/church";

import { Cross1Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { createChurchContact, updateChurchContact } from "@/app/actions/church";
import { toast } from "react-toastify";

const defaultValues: ChurchContactData = {
  email: "",
  website: null,
  contact_numbers: [{ value: "" }],
  social_links: [],
};

function ChurchContactForm({
  churchContactData,
  churchContactId,
}: {
  churchContactId?: string;
  churchContactData?: ChurchContactData;
}) {
  const form = useForm<ChurchContactData>({
    resolver: zodResolver(churchContactSchema),
    defaultValues: churchContactData ? churchContactData : defaultValues,
    mode: "onChange",
  });

  const contactNumbers = useFieldArray({
    name: "contact_numbers",
    control: form.control,
  });

  const socialLinks = useFieldArray({
    name: "social_links",
    control: form.control,
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const church_id = searchParams.get("id");

  const handleSave = async (values: ChurchContactData) => {
    if (!church_id) return;

    if (churchContactData && churchContactId) {
      // edit
      const result = await updateChurchContact(churchContactId, values);

      if (result?.status === "success") {
        toast.success("Church contact details updated!");
        return;
      }
    }

    const result = await createChurchContact(church_id, values);

    if (result?.status === "success") {
      toast.success("Church contact details saved!");
    }
  };

  const onSubmit: SubmitHandler<ChurchContactData> = async (values) => {
    await handleSave(values);

    router.push(`/listings/edit?id=${church_id}&step=pastor-profile`, {
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

  const onError: SubmitErrorHandler<ChurchContactData> = (err) => {
    console.log(err);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <fieldset disabled={form.formState.isSubmitting} className='space-y-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    inputMode='email'
                    placeholder='contact@mychurch.org'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='website'
            render={({ field }) => (
              <FormItem>
                <FormLabel optional>Website</FormLabel>
                <FormControl>
                  <Input
                    type='url'
                    inputMode='url'
                    placeholder='https://mylocalchurch.org'
                    {...field}
                    value={field.value === null ? "" : field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='space-y-3'>
            <Label>Church Contact Numbers</Label>
            {contactNumbers.fields.map((field, index) => (
              <div key={field.id} className='flex flex-col md:flex-row gap-4'>
                <FormField
                  control={form.control}
                  name={`contact_numbers.${index}.value`}
                  render={({ field }) => (
                    <FormItem className='max-w-[300px] md:flex-1'>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Contact Number
                      </FormDescription>
                      <FormControl>
                        <Input placeholder='+639XXXXXXXXX' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {contactNumbers.fields.length > 1 && (
                  <Button
                    aria-label='delete contact number'
                    variant='outline'
                    size='icon'
                    className={cn(
                      index === 0 ? "mt-7" : "mt-2 self-start",
                      "h-10 w-10"
                    )}
                    type='button'
                    onClick={() => contactNumbers.remove(index)}
                  >
                    <Cross1Icon className='w-5 h-5 text-destructive' />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type='button'
              variant='secondary'
              size='sm'
              onClick={() => contactNumbers.append({ value: "" })}
            >
              Add Contact Number
            </Button>
          </div>

          <div className='space-y-3'>
            <Label className='block'>Social Links</Label>
            {socialLinks.fields.map((field, index) => (
              <div key={field.id} className='flex flex-col md:flex-row gap-4'>
                <FormField
                  control={form.control}
                  name={`social_links.${index}.platform`}
                  render={({ field }) => (
                    <FormItem>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Platform
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={
                          field.value === "" ? undefined : field.value
                        }
                      >
                        <FormControl>
                          <SelectTrigger className='w-[200px]'>
                            <SelectValue placeholder='Select social platform' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[
                            "Facebook",
                            "Instagram",
                            "YouTube",
                            "Tiktok",
                            "Pinterest",
                            "Twitter (X)",
                          ].map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`social_links.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        URL
                      </FormDescription>
                      <FormControl>
                        <Input
                          type='url'
                          inputMode='url'
                          placeholder='www.facebook.com/mychurch'
                          className='w-[320px]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {socialLinks.fields.length > 1 && (
                  <Button
                    aria-label='delete social link'
                    variant='outline'
                    size='icon'
                    className={cn(
                      index === 0 ? "mt-7" : "mt-2 self-start",
                      "h-10 w-10"
                    )}
                    type='button'
                    onClick={() => socialLinks.remove(index)}
                  >
                    <Cross1Icon className='w-5 h-5 text-destructive' />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type='button'
              variant='secondary'
              size='sm'
              onClick={() => socialLinks.append({ platform: "", url: "" })}
            >
              Add Social Link
            </Button>
          </div>

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

export default ChurchContactForm;
