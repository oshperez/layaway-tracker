"use client";

import { Skeleton } from "@/app/components";
import { Customer } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  value: string;
  customerId?: string;
  onChange: (value: string) => void;
}

const LayawayCustomerSelect = ({ value, onChange, customerId }: Props) => {
  const {
    data: customers,
    error,
    isLoading,
  } = useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: () => axios.get("/api/customers").then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  if (error) return null;

  if (isLoading) return <Skeleton />;

  return (
    <Select.Root
      {...(customerId ? { defaultValue: customerId } : {})}
      value={value}
      onValueChange={onChange}
      disabled={customerId ? true : false}
    >
      <Select.Trigger placeholder="Select customer" />
      <Select.Content position="popper">
        <Select.Group>
          <Select.Label>Customers</Select.Label>
          {customers?.map((customer) => (
            <Select.Item key={customer.id} value={customer.id.toString()}>
              {customer.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default LayawayCustomerSelect;
