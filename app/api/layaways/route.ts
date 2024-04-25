import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { layawaySchema } from "../../validationSchemas";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = layawaySchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const customer = await prisma.customer.findUnique({
    where: { id: parseInt(body.customerId) },
  });

  if (!customer)
    return NextResponse.json({ error: "Invalid user" }, { status: 401 });

  const newLayaway = await prisma.layaway.create({
    data: {
      ...body,
      customerId: customer.id,
    },
  });

  return NextResponse.json(newLayaway, { status: 201 });
}
