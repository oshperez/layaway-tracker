import { Table } from "@radix-ui/themes";
import React from "react";
import CustomerActions from "./CustomerActions";
import { Skeleton } from "@/app/components";

const LoadingCustomerPage = () => {
  const customers = [1, 2, 3, 4, 5];

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
            <Table.Row key={customer}>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default LoadingCustomerPage;
