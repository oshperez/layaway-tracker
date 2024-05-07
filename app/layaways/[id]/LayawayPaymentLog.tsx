import PaymentLog from "@/app/components/PaymentLog";
import prisma from "@/prisma/client";

const LayawayPaymentLog = async ({ layawayId }: { layawayId: number }) => {
  const payments = await prisma.payment.findMany({
    where: { layawayId },
  });
  return <PaymentLog payments={payments} />;
};

export default LayawayPaymentLog;
