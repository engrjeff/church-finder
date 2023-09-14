"use server";

import { nextAUthOptions } from "@/lib/auth";
import db from "@/lib/db";

import {
  type BasicInfoData,
  type ChurchProfileData,
  type ChurchContactData,
  basicInfoSchema,
  churchProfileSchema,
  churchContactSchema,
  PastorProfileData,
  pastorProfileSchema,
} from "@/lib/schema/church";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createChurch(churchData: BasicInfoData) {
  const session = await getServerSession(nextAUthOptions);

  if (!session) {
    redirect("/signin");
  }

  if (!session.user.id) {
    redirect("/signin");
  }
  // validate
  const result = basicInfoSchema.safeParse(churchData);

  if (result.success) {
    const church = await db.church.create({
      data: {
        ...result.data,
        status: "DRAFT",
        user_id: session.user.id,
        steps_completed: ["basic-info"],
      },
    });

    revalidatePath("/listings");

    return { status: "success", data: church };
  }

  if (result.error) {
    return { status: "error", error: result.error.format() };
  }
}

export async function updateChurch(
  id: string,
  churchData: Partial<BasicInfoData>
) {
  const session = await getServerSession(nextAUthOptions);

  if (!session) {
    redirect("/signin");
  }

  if (!session.user.id) {
    redirect("/signin");
  }
  // validate
  const result = basicInfoSchema.safeParse(churchData);

  if (result.success) {
    const church = await db.church.update({
      where: {
        id,
      },
      data: churchData,
    });

    revalidatePath("/listings");

    return { status: "success", data: church };
  }

  if (result.error) {
    return { status: "error", error: result.error.format() };
  }
}

export async function createChurchProfile(
  church_id: string,
  churchProfle: ChurchProfileData
) {
  const session = await getServerSession(nextAUthOptions);

  if (!session) {
    redirect("/signin");
  }

  if (!session.user.id) {
    redirect("/signin");
  }
  // validate
  const result = churchProfileSchema.safeParse(churchProfle);

  if (result.success) {
    const churchProfile = await db.churchProfile.create({
      data: {
        church_id,
        ...result.data,
      },
    });

    // update completed steps
    await db.church.update({
      where: {
        id: church_id,
      },
      data: {
        steps_completed: {
          push: "church-profile",
        },
      },
    });

    revalidatePath("/listings");

    return { status: "success", data: churchProfile };
  }

  if (result.error) {
    return { status: "error", error: result.error.format() };
  }
}

export async function updateChurchProfile(
  church_profile_id: string,
  churchProfle: ChurchProfileData
) {
  const session = await getServerSession(nextAUthOptions);

  if (!session) {
    redirect("/signin");
  }

  if (!session.user.id) {
    redirect("/signin");
  }
  // validate
  const result = churchProfileSchema.safeParse(churchProfle);

  if (result.success) {
    const churchProfile = await db.churchProfile.update({
      where: {
        id: church_profile_id,
      },
      data: result.data,
    });

    revalidatePath("/listings");

    return { status: "success", data: churchProfile };
  }

  if (result.error) {
    return { status: "error", error: result.error.format() };
  }
}

export async function createChurchContact(
  church_id: string,
  churchContact: ChurchContactData
) {
  const session = await getServerSession(nextAUthOptions);

  if (!session) {
    redirect("/signin");
  }

  if (!session.user.id) {
    redirect("/signin");
  }
  // validate
  const result = churchContactSchema.safeParse(churchContact);

  if (result.success) {
    const churchContact = await db.churchContact.create({
      data: {
        church_id,
        ...result.data,
      },
    });

    // update completed steps
    await db.church.update({
      where: {
        id: church_id,
      },
      data: {
        steps_completed: {
          push: "church-contact-info",
        },
      },
    });

    revalidatePath("/listings");

    return { status: "success", data: churchContact };
  }

  if (result.error) {
    return { status: "error", error: result.error.format() };
  }
}

export async function updateChurchContact(
  churchContactId: string,
  churchContact: ChurchContactData
) {
  const session = await getServerSession(nextAUthOptions);

  if (!session) {
    redirect("/signin");
  }

  if (!session.user.id) {
    redirect("/signin");
  }
  // validate
  const result = churchContactSchema.safeParse(churchContact);

  if (result.success) {
    const churchContact = await db.churchContact.update({
      where: {
        id: churchContactId,
      },
      data: result.data,
    });

    revalidatePath("/listings");

    return { status: "success", data: churchContact };
  }

  if (result.error) {
    return { status: "error", error: result.error.format() };
  }
}

export async function createPastorProfile(
  churchId: string,
  pastorData: PastorProfileData
) {
  const session = await getServerSession(nextAUthOptions);

  if (!session) {
    redirect("/signin");
  }

  if (!session.user.id) {
    redirect("/signin");
  }
  // validate
  const result = pastorProfileSchema.safeParse(pastorData);

  if (result.success) {
    const pastor = await db.pastor.create({
      data: {
        church_id: churchId,
        ...result.data,
      },
    });

    // update completed steps
    await db.church.update({
      where: {
        id: churchId,
      },
      data: {
        steps_completed: {
          push: "pastor-profile",
        },
      },
    });

    revalidatePath("/listings");

    return { status: "success", data: pastor };
  }

  if (result.error) {
    return { status: "error", error: result.error.format() };
  }
}

export async function updatePastorProfile(
  pastorProfileId: string,
  pastorData: PastorProfileData
) {
  const session = await getServerSession(nextAUthOptions);

  if (!session) {
    redirect("/signin");
  }

  if (!session.user.id) {
    redirect("/signin");
  }
  // validate
  const result = pastorProfileSchema.safeParse(pastorData);

  if (result.success) {
    const pastor = await db.pastor.update({
      where: {
        id: pastorProfileId,
      },
      data: result.data,
    });

    revalidatePath("/listings");

    return { status: "success", data: pastor };
  }

  if (result.error) {
    return { status: "error", error: result.error.format() };
  }
}
