import { DeleteButton } from "@/app/components";
import prisma from "@/prisma/client";
import { BackpackIcon } from "@radix-ui/react-icons";
import { Box, Card, DataList, Flex, Grid, Tabs, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditCustomerDialog from "./EditCustomerDialog";
import LayawayList from "./LayawayList";

interface Props {
  params: { id: string };
}

const CustomerDetailPage = async ({ params }: Props) => {
  const customer = await prisma.customer.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      layaways: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!customer) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap="3" minHeight="">
      <Grid rows="auto 1fr" width="auto" gap="3">
        <Grid columns="1.5fr 1fr" gap="3">
          <Card className="p-4" size="2">
            <Text as="div" weight="bold" size="5">
              {customer.name}
            </Text>
            <Text as="div" color="gray" size="2">
              Customer since{" "}
              {customer.createdAt.toLocaleDateString("en", {
                month: "long",
                year: "numeric",
              })}
            </Text>
          </Card>
          <Card size="2">
            <Flex justify="between" align="center">
              <Box>
                <Text as="div" mb="2">
                  Total Layaways
                </Text>
                <Text size="5" weight="bold" align="center">
                  {customer.layaways.length}
                </Text>
              </Box>
              <BackpackIcon width="30px" height="30px" />
            </Flex>
          </Card>
        </Grid>
        <Card size="2">
          <Flex
            direction={{ initial: "column", xs: "row" }}
            justify="between"
            gap="5"
          >
            <DataList.Root size="2">
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
            <Flex gap="3">
              <EditCustomerDialog customer={customer} />
              <DeleteButton target={customer} variant="outline" />
            </Flex>
          </Flex>
        </Card>
      </Grid>
      <Card size="2">
        <Tabs.Root defaultValue="layaway-list">
          <Tabs.List mb="3">
            <Tabs.Trigger value="layaway-list">Layaway list</Tabs.Trigger>
            <Tabs.Trigger value="payment-history">Payment history</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="layaway-list">
            <LayawayList customerId={customer.id} />
          </Tabs.Content>
          <Tabs.Content value="payment-history">Payment history</Tabs.Content>
        </Tabs.Root>
      </Card>
    </Grid>
  );
};

export const dynamic = "force-dynamic";
export default CustomerDetailPage;
