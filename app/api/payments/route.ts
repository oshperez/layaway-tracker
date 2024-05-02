import { paymentSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate request payload
  const validation = paymentSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const { layawayId, customerId } = body;

  // Verify associated layaway
  const layaway = await prisma.layaway.findUnique({
    where: { id: parseInt(layawayId) },
  });

  if (!layaway) {
    return NextResponse.json({ error: "Invalid layaway" }, { status: 401 });
  }

  // Verify associated customer
  const customer = await prisma.customer.findUnique({
    where: { id: parseInt(customerId) },
  });

  if (!customer) {
    return NextResponse.json({ error: "Invalid customer" }, { status: 401 });
  }

  // Create payment record
  const payment = await prisma.payment.create({
    data: {
      ...body,
      layawayId: layaway.id,
      customerId: customer.id,
    },
  });

  return NextResponse.json(payment, { status: 201 });
}
