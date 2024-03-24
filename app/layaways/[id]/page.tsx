import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditLayawayButton from "./EditLayawayButton";
import LayawayDetails from "./LayawayDetails";

interface Props {
  params: { id: string };
}

const LayawayDetailPage = async ({ params }: Props) => {
  const layaway = await prisma.layaway.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!layaway) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <LayawayDetails layaway={layaway} />
      </Box>
      <Box>
        <EditLayawayButton layawayId={layaway.id} />
      </Box>
    </Grid>
  );
};

export default LayawayDetailPage;
