import { LayawayStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";

const LayawayList = async ({ customerId }: { customerId: number }) => {
  const layaways = await prisma.layaway.findMany({ where: { customerId } });

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Item</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created at</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {layaways?.map((layaway, index) => (
          <Table.Row key={index}>
            <Table.Cell>{layaway.item}</Table.Cell>
            <Table.Cell>
              <LayawayStatusBadge status={layaway.status} />
            </Table.Cell>
            <Table.Cell>
              {layaway.createdAt.toLocaleDateString("en", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default LayawayList;
