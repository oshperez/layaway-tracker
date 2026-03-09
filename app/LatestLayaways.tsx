import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import { LayawayStatusBadge } from "./components";

const LatestLayaways = async () => {
  const layaways = await prisma.layaway.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      customer: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return (
    <Card size="3">
      <Heading size="5" mb="5">
        Latest layaways
      </Heading>
      <Table.Root>
        <Table.Body>
          {layaways.map((layaway) => (
            <Table.Row key={layaway.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link
                      href={`layaways/${layaway.id}`}
                      className="font-medium text-base"
                    >
                      {layaway.item}
                    </Link>
                    <Text weight="light">
                      belongs to {layaway.customer.name}
                    </Text>
                  </Flex>
                  <Link href={`customers/${layaway.customer.id}`}>
                    <LayawayStatusBadge status={layaway.status} />
                  </Link>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestLayaways;
