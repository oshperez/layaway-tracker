import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const LayawayActions = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/layaways/new">New layaway</Link>
      </Button>
    </div>
  );
};

export default LayawayActions;
