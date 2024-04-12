import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import CustomerForm from "../../_components/CustomerForm";

const EditCustomerPage = async ({ params }: { params: { id: string } }) => {
  const customer = await prisma.customer.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!customer) notFound();

  return (
    <div>
      <CustomerForm customer={customer} />
    </div>
  );
};

export default EditCustomerPage;
