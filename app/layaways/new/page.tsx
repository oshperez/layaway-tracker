"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewLayawayPage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Input placeholder="Customer's name" />
      <TextField.Input placeholder="Customer's phone" />
      <TextArea placeholder="Add a description" />
      <Button>Submit new layaway</Button>
    </div>
  );
};

export default NewLayawayPage;
