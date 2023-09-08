"use client";

import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import FileDropZone from "@/components/FileDropZone";

import { churchMediaSchema, type ChurchMediaData } from "@/lib/schema/church";

const defaultValues: ChurchMediaData = {
  gallery: [],
};

function MediaForm() {
  const form = useForm<ChurchMediaData>({
    resolver: zodResolver(churchMediaSchema),
    defaultValues,
    mode: "onChange",
  });

  const galleryValues = useFieldArray({
    name: "gallery",
    control: form.control,
  });

  const onSubmit: SubmitHandler<ChurchMediaData> = (values) => {
    console.log(values);
  };

  const onError: SubmitErrorHandler<ChurchMediaData> = (err) => {
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
          name='gallery'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gallery</FormLabel>
              <FormDescription>
                Upload some photos for others to see.
              </FormDescription>
              <FormControl>
                <FileDropZone
                  fileData={field.value}
                  onSave={(data) => {
                    galleryValues.append(data);
                  }}
                />
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
            Cancel
          </Button>
          <Button type='submit' size='lg' className='ml-auto shadow-none'>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default MediaForm;
