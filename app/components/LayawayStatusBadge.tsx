import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
  status: Status;
}

const statusMap: Record<Status, { label: string; color: "red" | "green" }> = {
  OPEN: { label: "Open", color: "green" },
  CLOSE: { label: "Close", color: "red" },
};

const LayawayStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default LayawayStatusBadge;
