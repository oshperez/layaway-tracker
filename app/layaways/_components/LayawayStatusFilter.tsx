"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "Paid", value: "PAID" },
  { label: "Overdue", value: "OVERDUE" },
];

const LayawayStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (status?: Status) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const { status: _, page: __, ...otherParams } = currentParams;
    const updatedParams = { ...(status && { status }), ...otherParams };

    const params = new URLSearchParams(updatedParams);
    const query = params.size ? `?${params.toString()}` : "";
    router.push("/layaways" + query);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
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
