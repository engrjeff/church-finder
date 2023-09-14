import { nextAUthOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const getChurchListingOfUser = async () => {
  try {
    const session = await getServerSession(nextAUthOptions);

    if (!session) {
      redirect("/signin");
    }

    if (!session.user.id) {
      redirect("/signin");
    }

    const data = await db.church.findMany();

    return data ? data : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getChurchById = async (id: string) => {
  try {
    const result = await db.church.findFirst({
      where: {
        id,
      },
      include: {
        profile: true,
        pastor_details: true,
        contact_details: true,
        // add more later
      },
    });

    if (!result) return null;

    const { profile, contact_details, pastor_details, ...basicInfo } = result;

    return { profile, contact_details, pastor_details, basicInfo };
  } catch (error) {
    console.log(error);
  }
};

export type ChurchFormData = Awaited<ReturnType<typeof getChurchById>>;
