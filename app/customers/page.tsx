import prisma from "@/prisma/client";
import { Button, Table, Text } from "@radix-ui/themes";
import delay from "delay";
import { Link } from "@/app/components";
import CustomerActions from "./CustomerActions";

const CustomerPage = async () => {
  const customers = await prisma.customer.findMany();

  if (!customers) return <Text>No customers to show</Text>;

  await delay(2000);

  return (
    <>
      <CustomerActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Layaways</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Member Since</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {customers.map((customer) => (
            <Table.Row key={customer.id}>
              <Table.Cell>
                <Link href={`/customers/${customer.id}`}>{customer.name}</Link>
              </Table.Cell>
              <Table.Cell>{customer.phone}</Table.Cell>
              <Table.Cell>{Math.floor(Math.random() * 10)}</Table.Cell>
              <Table.Cell>{customer.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default CustomerPage;
