import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "red" | "green" | "violet" | "blue" }
> = {
  OPEN: { label: "Open", color: "green" },
  PAID: { label: "Paid", color: "violet" },
  OVERDUE: { label: "Overdue", color: "red" },
  CLOSED: { label: "Close", color: "blue" },
};

const LayawayStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default LayawayStatusBadge;
