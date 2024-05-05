import prisma from "@/prisma/client";
import { CopyIcon } from "@radix-ui/react-icons";
import {
  Box,
  Card,
  Code,
  DataList,
  Flex,
  Grid,
  Heading,
  IconButton,
  Separator,
  Text,
} from "@radix-ui/themes";
import { DeleteButton, LayawayStatusBadge, Link } from "@/app/components";
import { notFound } from "next/navigation";
import { BiDiamond } from "react-icons/bi";
import LayawayOutstandingProgress from "../_components/LayawayOutstandingProgress";
import ReminderSwitch from "../_components/ReminderSwitch";
import EditLayawayDialog from "./EditLayawayDialog";
import PaymentDialog from "./PaymentDialog";

interface Props {
  params: { id: string };
}

const LayawayDetailPage = async ({ params }: Props) => {
  const layaway = await prisma.layaway.findUnique({
    where: { id: parseInt(params.id) },
    include: { customer: true },
  });

  if (!layaway) notFound();

  return (
    <Grid columns="5" gap="3">
      <Box className="col-span-3">
        <Grid columns="10" gap="3">
          <Box className="col-span-10">
            <Card size="3">
              <Grid rows="repeat(2, auto)" gap="6">
                <Flex justify="between">
                  <Flex gap="3" align="center">
                    <BiDiamond size="40" />
                    <Box>
                      <Text as="div" size="5" weight="bold">
                        {layaway.item}
                      </Text>
                      <Text color="gray" size="2">
                        Last update {layaway.updatedAt.toLocaleDateString()}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex gap="2">
                    <EditLayawayDialog layaway={layaway} />
                    <DeleteButton target={layaway} variant="outline" />
                  </Flex>
                </Flex>
                <Separator size="4" />
                <DataList.Root>
                  <DataList.Item>
                    <DataList.Label>Description</DataList.Label>
                    <DataList.Value>
                      {layaway.description ? (
                        layaway.description
                      ) : (
                        <Text color="gray">Empty</Text>
                      )}
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Customer</DataList.Label>
                    <DataList.Value>
                      <Link href={`/customers/${layaway.customerId}`}>
                        {layaway.customer.name}
                      </Link>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Package Code</DataList.Label>
                    <DataList.Value>
                      <Flex align="center" gap="2">
                        <Code variant="ghost">{layaway.packageCode}</Code>
                        <IconButton
                          size="1"
                          aria-label="Copy value"
                          variant="ghost"
                          color="gray"
                        >
                          <CopyIcon />
                        </IconButton>
                      </Flex>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Status</DataList.Label>
                    <DataList.Value>
                      <LayawayStatusBadge status={layaway.status} />
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Created at</DataList.Label>
                    <DataList.Value>
                      {layaway.createdAt.toLocaleString("us-en", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Value</DataList.Label>
                    <DataList.Value>${layaway.value.toString()}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Reminder</DataList.Label>
                    <DataList.Value>
                      <ReminderSwitch layaway={layaway} size="1" />
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item align="center">
                    <DataList.Label>Outstanding</DataList.Label>
                    <DataList.Value>
                      <LayawayOutstandingProgress layaway={layaway} />
                    </DataList.Value>
                  </DataList.Item>
                </DataList.Root>
              </Grid>
            </Card>
          </Box>
        </Grid>
      </Box>
      <Card className="col-span-2" size="3">
        <Flex justify="between">
          <Heading size="4">Payment history</Heading>
          <PaymentDialog
            layawayId={layaway.id}
            customerId={layaway.customerId}
          />
        </Flex>
      </Card>
    </Grid>
  );
};

export default LayawayDetailPage;
