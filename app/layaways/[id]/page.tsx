import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const LayawayDetailPage = async ({ params }: Props) => {
  const layaway = await prisma.layaway.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!layaway) notFound();

  return (
    <div>
      <p>{layaway.customerName}</p>
      <p>{layaway.customerPhone}</p>
      <p>{layaway.description}</p>
      <p>{layaway.status}</p>
      <p>{layaway.createdAt.toDateString()}</p>
    </div>
  );
};

export default LayawayDetailPage;
