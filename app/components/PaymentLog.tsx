import { Payment as PrismaPayment } from "@prisma/client";
import { Table, Text } from "@radix-ui/themes";

interface Payment extends PrismaPayment {
  layaway?: { item: string };
}

interface Props {
  payments: Payment[];
}

const PaymentLog = async ({ payments }: Props) => {
  if (payments.length === 0)
    return (
      <Text color="gray" size="2">
        No payment history yet.
      </Text>
    );

  let itemColumnHeaderCell;
  if ("layaway" in payments[0]) {
    itemColumnHeaderCell = (
      <Table.ColumnHeaderCell>Item</Table.ColumnHeaderCell>
    );
  }

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {itemColumnHeaderCell}
          <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Payment Method</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {payments.map((payment) => (
          <Table.Row key={payment.id}>
            {payment?.layaway?.item && (
              <Table.Cell>{payment.layaway.item}</Table.Cell>
            )}
            <Table.Cell>${payment.amount}</Table.Cell>
            <Table.Cell>{payment.paymentMethod ?? "Not specified"}</Table.Cell>
            <Table.Cell>
              {payment.date.toLocaleDateString("en", { dateStyle: "medium" })}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default PaymentLog;
