import { paymentFormDataSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate request payload
  const validation = paymentFormDataSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const { layawayId, customerId, amount } = body;

  // Verify associated layaway
  const layaway = await prisma.layaway.findUnique({
    where: { id: layawayId },
  });

  if (!layaway) {
    return NextResponse.json({ error: "Invalid layaway" }, { status: 401 });
  }

  // Verify associated customer
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
  });

  if (!customer) {
    return NextResponse.json({ error: "Invalid customer" }, { status: 401 });
  }

  // Check that payment amount does not exceeds outstanding debt
  if (amount > layaway.outstandingDebt) {
    return NextResponse.json(
      { error: "Amount is greater than outstanding debt" },
      { status: 401 },
    );
  }

  // Update layaway to reflect new outstanding debt
  await prisma.layaway.update({
    where: { id: layaway.id },
    data: {
      outstandingDebt: layaway.outstandingDebt - amount,
      ...(layaway.outstandingDebt === amount && { status: "PAID" }),
    },
  });

  // Create payment record
  const payment = await prisma.payment.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json(payment, { status: 201 });
}
