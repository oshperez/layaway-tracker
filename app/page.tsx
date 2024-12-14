import prisma from "@/prisma/client";
import LatestLayaways from "./LatestLayaways";
import LayawaysBarChart from "./LayawaysBarChart";
import LayawaysSummary from "./LayawaysSummary";

export default async function Home() {
  const open = await prisma.layaway.count({ where: { status: "OPEN" } });
  const closed = await prisma.layaway.count({ where: { status: "CLOSED" } });
  const overdue = await prisma.layaway.count({ where: { status: "OVERDUE" } });
  const paid = await prisma.layaway.count({ where: { status: "PAID" } });

  return (
    // <LayawaysBarChart
    //   open={open}
    //   closed={closed}
    //   overdue={overdue}
    //   paid={paid}
    // />
    <LayawaysSummary
      open={open}
      closed={closed}
      overdue={overdue}
      paid={paid}
    />
  );
}
