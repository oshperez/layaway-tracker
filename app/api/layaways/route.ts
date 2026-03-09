import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { layawaySchema } from "../../validationSchemas";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

const isAuthDisabled = process.env.NEXT_PUBLIC_AUTH_DISABLED === "true";

export async function POST(request: NextRequest) {
  // Authorize request
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });
  if (!isAuthDisabled) {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const body = await request.json();

  // Validate payload
  const validation = layawaySchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // Check that associated customer exists
  const customer = await prisma.customer.findUnique({
    where: { id: parseInt(body.customerId) },
  });

  if (!customer)
    return NextResponse.json({ error: "Invalid customer" }, { status: 401 });

  // Initialize outstanding debt
  const { value, downPayment } = body;
  const outstandingDebt = value - downPayment;

  // Create record
  const newLayaway = await prisma.layaway.create({
    data: {
      ...body,
      outstandingDebt,
      customerId: customer.id,
    },
  });

  return NextResponse.json(newLayaway, { status: 201 });
}
