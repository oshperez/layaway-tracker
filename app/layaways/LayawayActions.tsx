import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import LayawayStatusFilter from "./_components/LayawayStatusFilter";

const LayawayActions = () => {
  return (
    <Flex mb="5" justify="between">
      <LayawayStatusFilter />
      <Button>
        <Link href="/layaways/new">New layaway</Link>
      </Button>
    </Flex>
  );
};

export default LayawayActions;
