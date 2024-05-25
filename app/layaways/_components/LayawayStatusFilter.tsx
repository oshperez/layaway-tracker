"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "Paid", value: "PAID" },
  { label: "Overdue", value: "OVERDUE" },
];

const LayawayStatusFilter = () => {
  const router = useRouter();

  const handleChange = (status?: Status) => {
    const query = status ? `?status=${status}` : "";
    router.push("/layaways" + query);
  };

  return (
    <Select.Root
      onValueChange={(value: Status | "ALL") =>
        handleChange(value !== "ALL" ? value : undefined)
      }
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || "ALL"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default LayawayStatusFilter;
