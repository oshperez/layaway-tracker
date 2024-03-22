"use client";

import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface layawayForm {
  customerName: string;
  customerPhone: string;
  description: string;
}

const NewLayawayPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { register, handleSubmit } = useForm<layawayForm>();

  const onSubmit: SubmitHandler<layawayForm> = async (data) => {
    try {
      await axios.post("/api/layaways", data);
      router.push("/layaways");
    } catch (error) {
      setError("An unexpected error has occurred.");
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Input
          placeholder="Full Name"
          {...register("customerName")}
        />
        <TextField.Input placeholder="Phone" {...register("customerPhone")} />
        <TextArea
          placeholder="Add a description"
          {...register("description")}
        />
        <Button>Submit new layaway</Button>
      </form>
    </div>
  );
};

export default NewLayawayPage;
