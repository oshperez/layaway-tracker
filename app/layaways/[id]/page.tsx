import { LayawayStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { CopyIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  Box,
  Card,
  Code,
  DataList,
  Flex,
  Grid,
  Heading,
  IconButton,
  Progress,
  Switch,
  Text,
} from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { BiDiamond } from "react-icons/bi";
import DeleteLayawayButton from "./DeleteLayawayButton";
import EditLayawayButton from "./EditLayawayButton";

interface Props {
  params: { id: string };
}

const LayawayDetailPage = async ({ params }: Props) => {
  const session = await getServerSession();

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
            <Grid rows="auto auto" gap="3">
              <Card>
                <Grid rows="repeat(2, auto)" gap="6">
                  <Flex justify="between">
                    <Flex gap="3" align="center">
                      <BiDiamond size="30" />
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
                      <EditLayawayButton layawayId={layaway.id} />
                      <DeleteLayawayButton layawayId={layaway.id} />
                    </Flex>
                  </Flex>
                  <DataList.Root>
                    <DataList.Item>
                      <DataList.Label>Description</DataList.Label>
                      <DataList.Value>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Et minus eum ad illum delectus, quam mollitia dolore
                        odio accusamus illo.
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
                      <DataList.Value>
                        ${layaway.value.toString()}
                      </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.Label>Reminder</DataList.Label>
                      <DataList.Value>
                        <Switch defaultChecked size="1" />
                      </DataList.Value>
                    </DataList.Item>
                    <DataList.Item align="center">
                      <DataList.Label>Outstanding</DataList.Label>
                      <DataList.Value>
                        <Flex width="90%" gap="2" align="center">
                          <Box flexGrow="1">
                            <Progress value={25} />
                          </Box>
                          <Box>$1500</Box>
                        </Flex>
                      </DataList.Value>
                    </DataList.Item>
                  </DataList.Root>
                </Grid>
              </Card>
            </Grid>
          </Box>
        </Grid>
      </Box>
      <Card className="col-span-2">
        <Heading size="4">Payment history</Heading>
      </Card>
    </Grid>
  );
};

export default LayawayDetailPage;
