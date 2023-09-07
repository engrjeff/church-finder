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

import { basicInfoSchema, type BasicInfoData } from "@/lib/church/schema";

const defaultValues: BasicInfoData = {
  name: "",
  pastor_name: "",
  address: {
    region: "",
    province: "",
    town: "",
    street: "",
  },
};

function BasicInfoForm() {
  const form = useForm<BasicInfoData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<BasicInfoData> = (values) => {
    console.log(values);
  };

  const onError: SubmitErrorHandler<BasicInfoData> = (err) => {
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Church Name</FormLabel>
              <FormControl>
                <Input placeholder='The name of your church' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='space-y-3'>
          <Label>Church Address</Label>
          <div className='flex flex-col md:flex-row gap-4'>
            <FormField
              control={form.control}
              name='address.region'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormDescription>Region</FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a region' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Region 1'>Region 1</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address.province'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormDescription>Province</FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a province' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Province 1'>Province 1</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address.town'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormDescription>Town</FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a town' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Town 1'>Town 1</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='address.street'
            render={({ field }) => (
              <FormItem>
                <FormDescription>Barangay and Street Address</FormDescription>
                <FormControl>
                  <Textarea
                    placeholder='e.g. Peter Street, Brgy. San Jose'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='pastor_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Church Pastor Name</FormLabel>
              <FormControl>
                <Input placeholder='The name of your Pastor' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='space-x-4'>
          <Button
            type='button'
            variant='secondary'
            size='lg'
            className='shadow-none'
          >
            Cancel
          </Button>
          <Button type='submit' size='lg' className='ml-auto shadow-none'>
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default BasicInfoForm;
