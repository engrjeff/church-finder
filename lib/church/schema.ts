import * as z from "zod";

export const basicInfoSchema = z.object({
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
  welcome_message: z.string().optional(),
  logo: z.string().optional(),
});

export const churchProfileSchema = z.object({
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

export const churchContactSchema = z.object({
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

export const pastorProfileSchema = z.object({
  bio: z.string(),
  photo: z.string(),
});

// types
export type BasicInfoData = z.infer<typeof basicInfoSchema>;
export type ChurchProfileData = z.infer<typeof churchProfileSchema>;
export type ChurchContactData = z.infer<typeof churchContactSchema>;
export type PastorProfileData = z.infer<typeof pastorProfileSchema>;
