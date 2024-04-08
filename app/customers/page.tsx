import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";

const customers = [
  {
    name: "Trevor Giggs",
    phone: "500-100-3300",
    layaways: 3,
    createdAt: "November 1, 2020",
  },
  {
    name: "Juan Bautista",
    phone: "588-100-2300",
    layaways: 1,
    createdAt: "Jaunary 20, 2019",
  },
  {
    name: "Paula Clerck",
    phone: "888-309-3355",
    layaways: 5,
    createdAt: "June 10, 2021",
  },
  {
    name: "Mark Bauer",
    phone: "599-099-1100",
    layaways: 1,
    createdAt: "September 21, 2021",
  },
];

const CustomerPage = () => {
  return (
    <>
      <Button mb="5">
        <Link href="/customers/new">Add customer</Link>
      </Button>
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
            <Table.Row key={customer.name}>
              <Table.Cell>{customer.name}</Table.Cell>
              <Table.Cell>{customer.phone}</Table.Cell>
              <Table.Cell>{customer.layaways}</Table.Cell>
              <Table.Cell>{customer.createdAt}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default CustomerPage;
