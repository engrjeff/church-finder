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
  FormArrayMessage,
  FormFieldInfo,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  churchProfileSchema,
  type ChurchProfileData,
} from "@/lib/schema/church";

import Autocomplete from "@/components/Autocomplete";
import { Cross1Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const defaultValues: ChurchProfileData = {
  church_size: 0,
  communion_frequency: "Weekly",
  vision: "",
  mission: "",
  services: [
    {
      title: "",
      day: "Sunday",
      time: "08:00:00",
    },
  ],
  confessions: [{ title: "" }],
  ministries: [{ title: "" }],
  public_services: [{ title: "" }],
};

function ChurchProfileForm() {
  const form = useForm<ChurchProfileData>({
    resolver: zodResolver(churchProfileSchema),
    defaultValues,
    mode: "onChange",
  });

  const services = useFieldArray({
    name: "services",
    control: form.control,
  });

  const ministries = useFieldArray({
    name: "ministries",
    control: form.control,
  });

  const confessions = useFieldArray({
    name: "confessions",
    control: form.control,
  });

  const public_services = useFieldArray({
    name: "public_services",
    control: form.control,
  });

  const onSubmit: SubmitHandler<ChurchProfileData> = (values) => {
    console.log(values);
  };

  const onError: SubmitErrorHandler<ChurchProfileData> = (err) => {
    console.log(err);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className='space-y-6'
      >
        <div className='space-y-3'>
          <Label>Church Services</Label>
          {services.fields.map((field, index) => (
            <div key={field.id} className='flex flex-col md:flex-row gap-4'>
              <FormField
                control={form.control}
                name={`services.${index}.title`}
                render={({ field }) => (
                  <FormItem className='max-w-[300px] md:flex-1'>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Service Title
                    </FormDescription>
                    <FormControl>
                      <Input placeholder='e.g. Sunday Service' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`services.${index}.day`}
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Day
                    </FormDescription>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={
                        field.value === "" ? undefined : field.value
                      }
                    >
                      <FormControl>
                        <SelectTrigger className='w-[200px]'>
                          <SelectValue placeholder='Select service day' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          "Sunday",
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                        ].map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
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
                name={`services.${index}.time`}
                render={({ field }) => (
                  <FormItem>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Time
                    </FormDescription>
                    <FormControl>
                      <Input
                        type='time'
                        placeholder='e.g. 8:00 AM'
                        className='w-[150px]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {services.fields.length > 1 && (
                <Button
                  aria-label='delete service'
                  variant='outline'
                  size='icon'
                  className={cn(
                    index === 0 ? "mt-7" : "mt-2 self-start",
                    "h-10 w-10"
                  )}
                  type='button'
                  onClick={() => services.remove(index)}
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
            onClick={() => services.append({ title: "", day: "", time: "" })}
          >
            Add Service
          </Button>
        </div>

        <FormField
          control={form.control}
          name='mission'
          render={({ field }) => (
            <FormItem>
              <FormLabel optional>Mission</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your church's mission statement"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='vision'
          render={({ field }) => (
            <FormItem>
              <FormLabel optional>Vision</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your church's vision statement"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-6'>
          <FormField
            control={form.control}
            name='church_size'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Church Size</FormLabel>
                <FormDescription>
                  An estimate of how many attend your church.
                </FormDescription>
                <FormControl>
                  <Input
                    type='number'
                    inputMode='numeric'
                    placeholder='e.g. 100'
                    className='max-w-[120px]'
                    {...field}
                    onChange={(e) => {
                      const value = e.currentTarget.valueAsNumber;
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='communion_frequency'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Communion Frequency</FormLabel>
                <FormDescription>
                  How often do you conduct the Lord&apos;s Supper?
                </FormDescription>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-[200px]'>
                      <SelectValue placeholder='Select communion frequency' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Weekly", "Monthly", "Occasionally"].map((option) => (
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
        </div>

        <div className='space-y-3'>
          <div>
            <Label>Church Ministries</Label>
            <FormArrayMessage
              error={form.formState.errors.ministries?.root?.message}
            />
          </div>
          {ministries.fields.map((field, index) => (
            <div key={field.id} className='flex flex-col md:flex-row gap-4'>
              <FormField
                control={form.control}
                name={`ministries.${index}.title`}
                render={({ field }) => (
                  <FormItem className='max-w-xs md:flex-1'>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Ministry Title
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder='e.g. Music ministry, Ushering ministry'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {ministries.fields.length > 1 && (
                <Button
                  aria-label='delete ministry'
                  variant='outline'
                  size='icon'
                  className={cn(
                    index === 0 ? "mt-7" : "mt-2 self-start",
                    "h-10 w-10"
                  )}
                  type='button'
                  onClick={() => ministries.remove(index)}
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
            onClick={async () => {
              const hasNoError = await form.trigger(
                `ministries.${ministries.fields.length - 1}.title`
              );

              if (!hasNoError) return;

              ministries.append({ title: "" });
            }}
          >
            Add Ministry
          </Button>
        </div>

        <div className='space-y-3'>
          <div>
            <Label>Public Services</Label>
            <FormArrayMessage
              error={form.formState.errors.public_services?.root?.message}
            />
          </div>
          {public_services.fields.map((field, index) => (
            <div key={field.id} className='flex flex-col md:flex-row gap-4'>
              <FormField
                control={form.control}
                name={`public_services.${index}.title`}
                render={({ field }) => (
                  <FormItem className='max-w-xs md:flex-1'>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Public Service Title
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder='e.g. Weddings, Dedications'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {public_services.fields.length > 1 && (
                <Button
                  aria-label='delete public service'
                  variant='outline'
                  size='icon'
                  className={cn(
                    index === 0 ? "mt-7" : "mt-2 self-start",
                    "h-10 w-10"
                  )}
                  type='button'
                  onClick={() => public_services.remove(index)}
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
            onClick={() => public_services.append({ title: "" })}
          >
            Add Public Service
          </Button>
        </div>

        <div className='space-y-3'>
          <Label>Confessions</Label>
          {confessions.fields.map((field, index) => (
            <div key={field.id} className='flex flex-col md:flex-row gap-4'>
              <FormField
                control={form.control}
                name={`confessions.${index}.title`}
                render={({ field }) => (
                  <FormItem className='max-w-xs md:flex-1'>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Title
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder='e.g. Heidelberg Catechism'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {confessions.fields.length > 1 && (
                <Button
                  aria-label='delete confession'
                  variant='outline'
                  size='icon'
                  className={cn(
                    index === 0 ? "mt-7" : "mt-2 self-start",
                    "h-10 w-10"
                  )}
                  type='button'
                  onClick={() => confessions.remove(index)}
                >
                  <Cross1Icon className='w-5 h-5 text-destructive' />
                </Button>
              )}
            </div>
          ))}
          <FormArrayMessage
            error={form.formState.errors.confessions?.root?.message}
          />
          <Button
            type='button'
            variant='secondary'
            size='sm'
            onClick={() => confessions.append({ title: "" })}
          >
            Add Confession
          </Button>
        </div>

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

export default ChurchProfileForm;
