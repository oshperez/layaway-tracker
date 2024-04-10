import prisma from "@/prisma/client";
import { BackpackIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Button,
  Card,
  DataList,
  Flex,
  Grid,
  Table,
  Tabs,
  Text,
} from "@radix-ui/themes";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

// Dummy data
const layaways = [
  { item: "Gold chain", staus: "open", createdAt: new Date(2021, 10, 12) },
  { item: "Diamond necklace", staus: "open", createdAt: new Date(2020, 1, 5) },
  { item: "Earings", staus: "close", createdAt: new Date(2020, 2, 10) },
];

const CustomerDetailPage = async ({ params }: Props) => {
  const customer = await prisma.customer.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!customer) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap="3" minHeight="">
      <Grid rows="auto 1fr" width="auto" gap="3">
        <Grid columns="1.5fr 1fr" gap="3">
          <Card className="p-4">
            <Text as="div" weight="bold" size="5">
              {customer.name}
            </Text>
            <Text as="div" color="gray">
              Customer since{" "}
              {customer.createdAt.toLocaleDateString("en", {
                month: "long",
                year: "numeric",
              })}
            </Text>
          </Card>
          <Card>
            <Flex justify="between" align="center">
              <Box>
                <Text as="div" mb="2">
                  Total Layaways
                </Text>
                <Text size="5" weight="bold" align="center">
                  {Math.floor(Math.random() * 10)}
                </Text>
              </Box>
              <BackpackIcon width="30px" height="30px" />
            </Flex>
          </Card>
        </Grid>
        <Card>
          <Flex
            direction={{ initial: "column", xs: "row" }}
            justify="between"
            gap="5"
          >
            <DataList.Root size="3">
              <DataList.Item align="center">
                <DataList.Label>Phone</DataList.Label>
                <DataList.Value>{customer.phone}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Email</DataList.Label>
                <DataList.Value>Not provided</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Address</DataList.Label>
                <DataList.Value>Not provided</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Outstanding</DataList.Label>
                <DataList.Value>$500</DataList.Value>
              </DataList.Item>
            </DataList.Root>
            <Flex direction={{ xs: "column" }} gap="3">
              <Button>
                <Pencil2Icon />
                Edit
              </Button>
              <Button color="red">
                <TrashIcon />
                Delete
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Grid>
      <Card>
        <Tabs.Root defaultValue="layaway-list">
          <Tabs.List mb="3">
            <Tabs.Trigger value="layaway-list">Layaway list</Tabs.Trigger>
            <Tabs.Trigger value="payment-history">Payment history</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="layaway-list">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Item</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Created at</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {layaways.map((layaway, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{layaway.item}</Table.Cell>
                    <Table.Cell>
                      <Badge color={layaway.staus === "open" ? "green" : "red"}>
                        {layaway.staus}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>{layaway.createdAt.toDateString()}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Tabs.Content>
          <Tabs.Content value="payment-history">Payment history</Tabs.Content>
        </Tabs.Root>
      </Card>
    </Grid>
  );
};

export default CustomerDetailPage;
