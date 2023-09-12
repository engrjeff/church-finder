import { nextAUthOptions } from "@/lib/auth";
import { basicInfoSchema } from "@/lib/schema/church";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(nextAUthOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const json = await req.json();

    const body = basicInfoSchema.parse(json);

    const church = await db.church.create({
      data: {
        ...body,
        status: "DRAFT",
        user_id: session.user.id,
      },
    });

    return NextResponse.json(church);
  } catch (error: any) {
    return new NextResponse(error.message || "Error", { status: 500 });
  }
}
