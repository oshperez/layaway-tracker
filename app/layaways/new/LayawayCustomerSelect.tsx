"use client";

import { Select } from "@radix-ui/themes";

// Dummy data
const actors = [
  { id: 1, name: "Tom Cruise" },
  { id: 2, name: "Nicolas Cage" },
  { id: 3, name: "Liam Neeson" },
  { id: 4, name: "John Smith" },
];

const LayawayCustomerSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Select customer" />
      <Select.Content position="popper">
        <Select.Group>
          <Select.Label>Customers</Select.Label>
          {actors.map((actor) => (
            <Select.Item key={actor.id} value={actor.id.toString()}>
              {actor.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default LayawayCustomerSelect;
