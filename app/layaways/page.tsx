import { LayawayStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import LayawayActions from "./LayawayActions";

const Layaways = async () => {
  const layaways = await prisma.layaway.findMany();
  return (
    <>
      <LayawayActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.RowHeaderCell>Name</Table.RowHeaderCell>
            <Table.RowHeaderCell className="hidden lg:table-cell">
              Description
            </Table.RowHeaderCell>
            <Table.RowHeaderCell className="hidden md:table-cell">
              Status
            </Table.RowHeaderCell>
            <Table.RowHeaderCell>Created</Table.RowHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {layaways.map((layaway) => (
            <Table.Row key={layaway.id}>
              <Table.Cell>
                <Link href={`/layaways/${layaway.id}`}>
                  {layaway.customerName}
                </Link>
                <div className="block md:hidden">
                  <LayawayStatusBadge status={layaway.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden lg:table-cell">
                {layaway.description}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <LayawayStatusBadge status={layaway.status} />
              </Table.Cell>
              <Table.Cell>{layaway.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default Layaways;
