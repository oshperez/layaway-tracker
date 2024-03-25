import prisma from "@/prisma/client";
import LayawayForm from "../../_components/LayawayFrom";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const EditLayawayPage = async ({ params }: Props) => {
  const layaway = await prisma.layaway.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!layaway) notFound();

  console.log(params.id);
  return <LayawayForm layaway={layaway} />;
};

export default EditLayawayPage;
