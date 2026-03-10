import prisma from "@/prisma/client";
import LatestLayaways from "./LatestLayaways";
import LayawaysBarChart from "./LayawaysBarChart";
import LayawaysSummary from "./LayawaysSummary";
import { Flex, Grid } from "@radix-ui/themes";

export const dynamic = "force-dynamic";

export default async function Home() {
  const open = await prisma.layaway.count({ where: { status: "OPEN" } });
  const closed = await prisma.layaway.count({ where: { status: "CLOSED" } });
  const overdue = await prisma.layaway.count({ where: { status: "OVERDUE" } });
  const paid = await prisma.layaway.count({ where: { status: "PAID" } });

  const data = { open, closed, overdue, paid };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <LayawaysSummary data={data} />
        <LayawaysBarChart data={data} />
      </Flex>
      <LatestLayaways />
    </Grid>
  );
}
