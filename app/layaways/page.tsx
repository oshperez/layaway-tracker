import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const Layaways = () => {
  return (
    <Button>
      <Link href="/layaways/new">New layaway</Link>
    </Button>
  );
};

export default Layaways;
