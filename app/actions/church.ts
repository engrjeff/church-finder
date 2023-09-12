"use server";

import db from "@/lib/db";

import { basicInfoSchema, type BasicInfoData } from "@/lib/schema/church";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function createChurch(churchData: BasicInfoData) {
  try {
    const session = await getServerSession();

    if (!session) {
      return redirect("/");
    }

    if (!session.user.id) {
      return redirect("/");
    }
    // validate
    const data = basicInfoSchema.parse(churchData);

    const church = await db.church.create({
      data: {
        ...data,
        status: "DRAFT",
        user_id: session?.user.id,
      },
    });

    console.log(session, church);
  } catch (error) {
    console.log(error);
  }
}
