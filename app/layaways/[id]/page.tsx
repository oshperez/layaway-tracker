import LayawayStatusBadge from "@/app/components/LayawayStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { FaPhoneAlt } from "react-icons/fa";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

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
        <Heading mb="2">{layaway.customerName}</Heading>
        <Flex gap="4">
          <LayawayStatusBadge status={layaway.status} />
          <Text>{layaway.createdAt.toDateString()}</Text>
        </Flex>
        <Flex gap="3" align="center" my="3">
          <FaPhoneAlt />
          <Text weight="medium" as="div">
            {layaway.customerPhone}
          </Text>
        </Flex>
        <Card>
          <Text as="div" weight="bold" size="2" mb="2">
            Description
          </Text>
          <Text color="gray">{layaway.description}</Text>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`layaways/${layaway.id}/edit`}>Edit layaway</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default LayawayDetailPage;
