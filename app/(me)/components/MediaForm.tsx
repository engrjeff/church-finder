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
  gallery: [
    {
      name: "340600010_761266395438334_7612572252988261020_n.jpg",
      size: 427649,
      url: "http://res.cloudinary.com/abide-in-the-vine/image/upload/v1694231638/church_finder/jszmnw161ldb7iv9cbsd.jpg",
      type: "image",
    },
    {
      name: "340573073_257973296588160_124471928567736355_n.jpg",
      size: 480189,
      url: "http://res.cloudinary.com/abide-in-the-vine/image/upload/v1694231638/church_finder/jopowf5fis1nkfs014iv.jpg",
      type: "image",
    },
    {
      name: "336163336_6181772041868578_8339360444359220638_n.jpg",
      size: 178831,
      url: "http://res.cloudinary.com/abide-in-the-vine/image/upload/v1694231601/church_finder/dyhj3pz9wm0kw4jl3n74.jpg",
      type: "image",
    },
  ],
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
                  onRemoveExisting={galleryValues.remove}
                  onClearAll={galleryValues.remove}
                  onSave={(data) => {
                    form.setValue("gallery", data);
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
