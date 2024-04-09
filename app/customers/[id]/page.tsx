import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
interface Props {
  params: { id: string };
}
const CustomerDetailPage = async ({ params }: Props) => {
  const customer = await prisma.customer.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!customer) notFound();

  return (
    <div>
      <p>{customer.name}</p>
      <p>{customer.phone}</p>
      <p>{customer.createdAt.toDateString()}</p>
    </div>
  );
};

export default CustomerDetailPage;
