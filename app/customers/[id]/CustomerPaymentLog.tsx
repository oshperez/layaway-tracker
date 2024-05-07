import PaymentLog from "@/app/components/PaymentLog";
import prisma from "@/prisma/client";

const CustomerPaymentLog = async ({ customerId }: { customerId: number }) => {
  const payments = await prisma.payment.findMany({
    where: { customerId },
    include: {
      layaway: {
        select: {
          item: true,
        },
      },
    },
  });

  return <PaymentLog payments={payments} />;
};

export default CustomerPaymentLog;
