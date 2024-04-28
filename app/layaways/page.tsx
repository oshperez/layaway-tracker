import { LayawayStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import LayawayActions from "./LayawayActions";
import ReminderSwitch from "./_components/ReminderSwitch";
import LayawayOutstandingProgress from "./_components/LayawayOutstandingProgress";

const Layaways = async () => {
  const layaways = await prisma.layaway.findMany({
    include: { customer: true },
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
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
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
                <LayawayOutstandingProgress layaway={layaway} />
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
