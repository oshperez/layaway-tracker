import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const CustomerActions = () => {
  return (
    <div>
      <Button mb="5">
        <Link href="/customers/new">Add customer</Link>
      </Button>
    </div>
  );
};

export default CustomerActions;
