import { customerSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { name, phone } = await request.json();
  const validation = await customerSchema.safeParse({ name, phone });

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const customer = await prisma.customer.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!customer)
    return NextResponse.json({ error: "Invalid Customer" }, { status: 404 });

  const updatedCustomer = await prisma.customer.update({
    where: { id: customer.id },
    data: { name, phone },
  });

  return NextResponse.json(updatedCustomer, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const customer = await prisma.customer.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!customer)
    return NextResponse.json({ error: "Invalid customer" }, { status: 404 });

  await prisma.customer.delete({ where: { id: customer.id } });
  return NextResponse.json({});
}
