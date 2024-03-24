import { LayawayStatusBadge } from "@/app/components";
import { Layaway } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { FaPhoneAlt } from "react-icons/fa";

const LayawayDetails = ({ layaway }: { layaway: Layaway }) => {
  return (
    <>
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
    </>
  );
};

export default LayawayDetails;
