import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditLayawayButton from "./EditLayawayButton";
import LayawayDetails from "./LayawayDetails";
import DeleteLayawayButton from "./DeleteLayawayButton";
import { getServerSession } from "next-auth";

interface Props {
  params: { id: string };
}

const LayawayDetailPage = async ({ params }: Props) => {
  const session = await getServerSession();

  const layaway = await prisma.layaway.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!layaway) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <LayawayDetails layaway={layaway} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="3">
            <EditLayawayButton layawayId={layaway.id} />
            <DeleteLayawayButton layawayId={layaway.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default LayawayDetailPage;
