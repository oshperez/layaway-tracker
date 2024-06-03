import { LayawayStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Layaway, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NexLink from "next/link";
import LayawayActions from "./LayawayActions";
import OutstandingDebtProgress from "./_components/OutstandingDebtProgress";
import ReminderSwitch from "./_components/ReminderSwitch";

interface Props {
  searchParams: { status: Status; sort: keyof Layaway; order: "asc" | "desc" };
}

const Layaways = async ({ searchParams }: Props) => {
  const isAscOrder: boolean = searchParams.order === "asc";

  const validStatuses = Object.values(Status);
  const status = validStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const validOrderParams = ["asc", "desc"];
  const orderBy =
    searchParams.sort === "createdAt" &&
    validOrderParams.includes(searchParams.order)
      ? { [searchParams.sort]: searchParams.order }
      : undefined;

  const layaways = await prisma.layaway.findMany({
    where: { status },
    orderBy,
    include: { customer: true, payments: { select: { amount: true } } },
  });

  return (
    <>
      <LayawayActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Item</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden lg:table-cell">
              Customer
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Package code</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Outstanding</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Reminder</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="flex gap-2">
              <NexLink
                href={{
                  query: {
                    ...searchParams,
                    sort: "createdAt",
                    order: isAscOrder ? "desc" : "asc",
                  },
                }}
              >
                Created
              </NexLink>
              {isAscOrder ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {layaways.map((layaway) => (
            <Table.Row key={layaway.id}>
              <Table.Cell>
                <Link href={`/layaways/${layaway.id}`}>{layaway.item}</Link>
                <div className="block md:hidden">
                  <LayawayStatusBadge status={layaway.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden lg:table-cell">
                {layaway.customer.name}
              </Table.Cell>
              <Table.Cell>{layaway.packageCode}</Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <LayawayStatusBadge status={layaway.status} />
              </Table.Cell>
              <Table.Cell>
                <OutstandingDebtProgress layaway={layaway} />
              </Table.Cell>
              <Table.Cell>
                <ReminderSwitch layaway={layaway} size="1" />
              </Table.Cell>
              <Table.Cell>
                {layaway.createdAt.toLocaleDateString("en-us", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export const dynamic = "force-dynamic";
export default Layaways;
