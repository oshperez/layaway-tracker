import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  closed: number;
  overdue: number;
  paid: number;
}

function LayawaysSummary({ open, closed, overdue, paid }: Props) {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Layaways", value: open, status: "OPEN" },
    { label: "Closed Layaways ", value: closed, status: "CLOSED" },
    { label: "Overdue Layaways", value: paid, status: "OVERDUE" },
    { label: "Paid Layaways", value: overdue, status: "PAID" },
  ];
  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              href={`/layaways?status=${container.status}`}
              className="text-sm font-medium"
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}

export default LayawaysSummary;
