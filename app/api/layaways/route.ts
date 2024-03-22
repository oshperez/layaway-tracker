import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createLayawaySchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createLayawaySchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newLayaway = await prisma.layaway.create({
    data: {
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      description: body.description,
    },
  });

  return NextResponse.json(newLayaway, { status: 201 });
}
