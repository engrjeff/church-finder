"use client";

import React, { useState } from "react";

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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { basicInfoSchema, type BasicInfoData } from "@/lib/schema/church";
import {
  Barangay,
  City,
  Province,
  Region,
  getBarangaysByCity,
  getCitiesByProvince,
  getProvincesByRegion,
  getRegions,
} from "@/lib/constants";
import Autocomplete from "@/components/Autocomplete";
import AvatarPicker from "@/components/AvatarPicker";
import { createChurch } from "@/app/actions/church";

const defaultValues: BasicInfoData = {
  name: "",
  welcome_message: "",
  logo: "",
  region: "",
  province: "",
  city: "",
  barangay: "",
  street: "",
};

function BasicInfoForm() {
  const form = useForm<BasicInfoData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues,
    mode: "onChange",
  });

  const [regions, setRegions] = useState<Region[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [barangays, setBarangays] = useState<Barangay[]>([]);

  const currentRegion = form.watch("region");
  const currentProvince = form.watch("province");
  const currentCity = form.watch("city");

  React.useEffect(() => {
    const updateOptions = async () => {
      const regionsArr = await getRegions();
      const citiesArr = await getCitiesByProvince(currentProvince);
      const provincesArr = await getProvincesByRegion(currentRegion);
      const barangaysArr = await getBarangaysByCity(currentCity);

      setRegions(regionsArr);
      setProvinces(provincesArr);
      setCities(citiesArr);
      setBarangays(barangaysArr);
    };

    updateOptions();
  }, [currentProvince, currentRegion, currentCity]);

  const onSubmit: SubmitHandler<BasicInfoData> = async (values) => {
    await createChurch(values);
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
          name='logo'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AvatarPicker
                  src={field.value}
                  label='Church Logo'
                  desc='Upload a church logo'
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
              name='region'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormDescription>Region</FormDescription>
                  <Autocomplete
                    searchText='Search region...'
                    placeholderText='Select a region'
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);

                      form.setValue("province", "");
                      form.setValue("city", "");
                      form.setValue("barangay", "");
                    }}
                    options={regions.map((i) => ({
                      value: i.region_code,
                      label: i.region_name,
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='province'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormDescription>Province</FormDescription>
                  <Autocomplete
                    searchText='Search province...'
                    placeholderText='Select a province'
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);

                      form.setValue("city", "");
                      form.setValue("barangay", "");
                    }}
                    options={provinces.map((i) => ({
                      value: i.province_code,
                      label: i.province_name,
                    }))}
                    disabled={!currentRegion}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col md:flex-row gap-4'>
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormDescription>Town</FormDescription>
                  <Autocomplete
                    searchText='Search town/city...'
                    placeholderText='Select a town/city'
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);

                      form.setValue("barangay", "");
                    }}
                    options={cities.map((i) => ({
                      value: i.city_code,
                      label: i.city_name,
                    }))}
                    disabled={!currentProvince}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='barangay'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormDescription>Barangay</FormDescription>
                  <Autocomplete
                    searchText='Search barangay...'
                    placeholderText='Select a barangay'
                    value={field.value}
                    onChange={field.onChange}
                    options={barangays.map((i) => ({
                      value: i.brgy_code,
                      label: i.brgy_name,
                    }))}
                    disabled={!currentCity}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='street'
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
          name='welcome_message'
          render={({ field }) => (
            <FormItem>
              <FormLabel optional>Welcome Message</FormLabel>
              <FormDescription>
                Greet your potential visitors with this message
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder='A welcome message for your potential guests'
                  {...field}
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

export default BasicInfoForm;
