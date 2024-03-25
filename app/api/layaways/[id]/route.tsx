import { layawaySchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { data } from "autoprefixer";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = layawaySchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const layaway = await prisma.layaway.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!layaway)
    return NextResponse.json({ error: "Invalid layaway" }, { status: 404 });

  const updatedLayaway = await prisma.layaway.update({
    where: { id: layaway.id },
    data: {
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      description: body.description,
    },
  });

  return NextResponse.json(updatedLayaway, { status: 200 });
}
