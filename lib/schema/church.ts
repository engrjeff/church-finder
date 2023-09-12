import * as z from "zod";

export const basicInfoSchema = z.object({
  name: z
    .string({ required_error: "Church name is required." })
    .nonempty({ message: "Church name is required." }),

  address: z.object({
    region: z
      .string({ required_error: "Region is required." })
      .nonempty({ message: "Region is required." }),

    province: z
      .string({ required_error: "Province is required." })
      .nonempty({ message: "Province is required." }),

    town: z
      .string({ required_error: "Town/City is required." })
      .nonempty({ message: "Town/City is required." }),

    barangay: z
      .string({ required_error: "Barangay is required." })
      .nonempty({ message: "Barangay is required." }),

    street: z
      .string({ required_error: "Street Address is required." })
      .nonempty({ message: "Street Address is required." }),
  }),
  welcome_message: z.string().optional(),
  logo: z.string().optional(),
});

export const churchProfileSchema = z.object({
  church_size: z
    .number({ required_error: "Church size is required" })
    .int({ message: "Please enter a whole number" })
    .positive(),
  communion_frequency: z.enum(["Weekly", "Monthly", "Occasionally"]),
  confessions: z
    .array(
      z.object({
        title: z
          .string({ required_error: "Confession title is required." })
          .nonempty({ message: "Confession title is required." }),
      })
    )
    .optional(),
  ministries: z
    .array(
      z.object({
        title: z
          .string({ required_error: "Ministry title is required." })
          .nonempty({ message: "Ministry title is required." }),
      })
    )
    .min(3, { message: "Provide at least 3 ministries" }),
  public_services: z
    .array(
      z.object({
        title: z
          .string({ required_error: "Public service title is required." })
          .nonempty({ message: "Public service title is required." }),
      })
    )
    .min(1, { message: "Provide at least 1 public service" }),
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

export const churchContactSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }).optional(),
  website: z.string().url({ message: "Enter a valid website url." }).optional(),
  contact_numbers: z
    .array(
      z.object({
        value: z
          .string({ required_error: "Contact number is required." })
          .nonempty({ message: "Contact number is required." }),
      })
    )
    .min(1, { message: "Enter at least 1 contact number." }),
  social_links: z
    .array(
      z.object({
        url: z
          .string({ required_error: "Social link url is required." })
          .nonempty({ message: "Enter a valid url" })
          .url({ message: "Enter a valid url." }),
        platform: z
          .string({ required_error: "Platform is required." })
          .nonempty({ message: "Platform is required." }),
      })
    )
    .optional(),
});

export const pastorProfileSchema = z.object({
  pastor_name: z
    .string({ required_error: "Pastor's name is required." })
    .nonempty({ message: "Pastor's name is required." }),
  bio: z.string(),
  photo: z.string(),
});

export const churchMediaSchema = z.object({
  gallery: z
    .array(
      z.object({
        name: z.string(),
        size: z.number(),
        type: z.string(),
        url: z.string(),
      })
    )
    .optional(),
});

// types
export type BasicInfoData = z.infer<typeof basicInfoSchema>;
export type ChurchProfileData = z.infer<typeof churchProfileSchema>;
export type ChurchContactData = z.infer<typeof churchContactSchema>;
export type PastorProfileData = z.infer<typeof pastorProfileSchema>;
export type ChurchMediaData = z.infer<typeof churchMediaSchema>;
