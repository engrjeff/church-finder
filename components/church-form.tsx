"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
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
import { Separator } from "@/components/ui/separator";
import { Cross1Icon } from "@radix-ui/react-icons";

const basicInfoSchema = z.object({
  name: z
    .string({ required_error: "Church name is required." })
    .nonempty({ message: "Church name is required." }),
  pastor_name: z
    .string({ required_error: "Pastor's name is required." })
    .nonempty({ message: "Pastor's name is required." }),
  address: z.object({
    region: z.string(),
    province: z.string(),
    town: z.string(),
    street: z.string(),
  }),
  welcome_message: z.string(),
  logo: z.string(),
});

const churchProfileSchema = z.object({
  church_size: z.number().int().positive(),
  communion_frequency: z.enum(["Weekly", "Monthly", "Occasionally"]),
  confessions: z.array(
    z.object({
      title: z.string(),
    })
  ),
  ministries: z.array(
    z.object({
      title: z.string(),
    })
  ),
  public_services: z.array(
    z.object({
      title: z.string(),
    })
  ),
  services: z
    .array(
      z.object({
        title: z
          .string({ required_error: "Service title is required." })
          .nonempty({ message: "Service title is required." }),
        day: z
          .string({ required_error: "Service day is required." })
          .nonempty({ message: "Service day is required." }),
        time: z
          .string({ required_error: "Service time is required." })
          .nonempty({ message: "Service time is required." }),
      })
    )
    .min(1, { message: "Enter at least 1 service schedule." }),
  mission: z.string(),
  vision: z.string(),
});

const churchContactSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }).optional(),
  website: z.string().url({ message: "Enter a valid website url." }).optional(),
  contactNumbers: z
    .array(
      z.object({
        value: z
          .string({ required_error: "Contact number is required." })
          .nonempty({ message: "Contact number is required." }),
      })
    )
    .min(1, { message: "Enter at least 1 contact number." }),
  socialLinks: z
    .array(
      z.object({
        url: z
          .string({ required_error: "Social link address is required." })
          .url({ message: "Enter a valid url." }),
        platform: z
          .string({ required_error: "Platform is required." })
          .nonempty({ message: "Platform is required." }),
      })
    )
    .optional(),
});

const pastorProfileSchema = z.object({
  bio: z.string(),
  photo: z.string(),
});

const churchSchema = basicInfoSchema
  .merge(churchProfileSchema)
  .merge(churchContactSchema)
  .merge(pastorProfileSchema);

type ChurchFormData = z.infer<typeof churchSchema>;

const churchFormSchema = z.object({
  name: z
    .string({ required_error: "Church name is required." })
    .nonempty({ message: "Church name is required." }),
  pastor_name: z
    .string({ required_error: "Pastor's name is required." })
    .nonempty({ message: "Pastor's name is required." }),
  address: z
    .string({ required_error: "Church address is required." })
    .nonempty({ message: "Church address is required." }),
  services: z
    .array(
      z.object({
        title: z
          .string({ required_error: "Service title is required." })
          .nonempty({ message: "Service title is required." }),
        day: z
          .string({ required_error: "Service day is required." })
          .nonempty({ message: "Service day is required." }),
        time: z
          .string({ required_error: "Service time is required." })
          .nonempty({ message: "Service time is required." }),
      })
    )
    .min(1, { message: "Enter at least 1 service schedule." }),
  contactNumbers: z
    .array(
      z.object({
        value: z
          .string({ required_error: "Contact number is required." })
          .nonempty({ message: "Contact number is required." }),
      })
    )
    .min(1, { message: "Enter at least 1 contact number." }),
  website: z.string().url({ message: "Enter a valid website url." }).optional(),
  socialLinks: z
    .array(
      z.object({
        url: z
          .string({ required_error: "Social link address is required." })
          .url({ message: "Enter a valid url." }),
        platform: z
          .string({ required_error: "Platform is required." })
          .nonempty({ message: "Platform is required." }),
      })
    )
    .optional(),
});

type ChurchFormValues = z.infer<typeof churchFormSchema>;

const defaultValues: ChurchFormValues = {
  name: "",
  pastor_name: "",
  address: "",
  services: [
    {
      title: "",
      day: "Sunday",
      time: "08:00:00",
    },
  ],
  contactNumbers: [{ value: "" }],
};

export default function ChurchForm() {
  const form = useForm<ChurchFormValues>({
    resolver: zodResolver(churchFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const services = useFieldArray({
    name: "services",
    control: form.control,
  });

  const contactNumbers = useFieldArray({
    name: "contactNumbers",
    control: form.control,
  });

  const socialLinks = useFieldArray({
    name: "socialLinks",
    control: form.control,
  });

  const onSubmit = (data: ChurchFormValues) => {
    console.log(data);
  };

  const onError = (errors: typeof form.formState.errors) => {
    console.log(errors);
  };

  return (
    <>
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
                name='address'
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
                name='address'
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
                name='address'
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
              name='address'
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

          <div className='space-y-3'>
            <Label>Services</Label>
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
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-[150px]'>
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
                    className={cn(index === 0 ? "mt-7" : "mt-2 self-start")}
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

          <div className='space-y-3'>
            <Label>Contact Numbers</Label>
            {contactNumbers.fields.map((field, index) => (
              <div key={field.id} className='flex flex-col md:flex-row gap-4'>
                <FormField
                  control={form.control}
                  name={`contactNumbers.${index}.value`}
                  render={({ field }) => (
                    <FormItem className='max-w-[300px] md:flex-1'>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Contact Number
                      </FormDescription>
                      <FormControl>
                        <Input
                          type='tel'
                          inputMode='tel'
                          placeholder='+639XXXXXXXXXX'
                          {...field}
                        />
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
                    className={cn(index === 0 ? "mt-7" : "mt-2 self-start")}
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

          <FormField
            control={form.control}
            name='website'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Church Website</FormLabel>
                <FormControl>
                  <Input
                    type='url'
                    inputMode='url'
                    placeholder='e.g. https://my-church.org'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='space-y-3'>
            <Label className='block'>Social Links</Label>
            {socialLinks.fields.map((field, index) => (
              <div key={field.id} className='flex flex-col md:flex-row gap-4'>
                <FormField
                  control={form.control}
                  name={`socialLinks.${index}.platform`}
                  render={({ field }) => (
                    <FormItem>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Platform
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value ? field.value : undefined}
                      >
                        <FormControl>
                          <SelectTrigger className='w-[200px]'>
                            <SelectValue placeholder='Select social platform' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["Facebook", "Instagram", "YouTube", "Twitter"].map(
                            (platform) => (
                              <SelectItem key={platform} value={platform}>
                                {platform}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`socialLinks.${index}.url`}
                  render={({ field }) => (
                    <FormItem className='max-w-[300px] md:flex-1'>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        URL
                      </FormDescription>
                      <FormControl>
                        <Input
                          type='url'
                          inputMode='url'
                          placeholder='e.g. https://fb.com/my-church'
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
                    className={cn(index === 0 ? "mt-7" : "mt-2 self-start")}
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
              onClick={() => socialLinks.append({ url: "", platform: "" })}
            >
              Add Social Link
            </Button>
          </div>

          <Button type='submit' className='ml-auto'>
            Next
          </Button>
        </form>
      </Form>
    </>
  );
}
