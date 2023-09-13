"use server";

import { nextAUthOptions } from "@/lib/auth";
import db from "@/lib/db";

import { basicInfoSchema, type BasicInfoData } from "@/lib/schema/church";
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
      },
    });

    revalidatePath("/listings");
    return { status: "success", data: church };
  }

  if (result.error) {
    return { status: "error", error: result.error.format() };
  }
}
