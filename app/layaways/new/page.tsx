"use client";

import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLayawaySchema } from "@/app/validationSchemas";
import { z } from "zod";

type LayawayForm = z.infer<typeof createLayawaySchema>;

const NewLayawayPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LayawayForm>({
    resolver: zodResolver(createLayawaySchema),
  });

  const onSubmit: SubmitHandler<LayawayForm> = async (data) => {
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
        {errors.customerName && (
          <Text color="red" as="p">
            {errors.customerName.message}
          </Text>
        )}
        <TextField.Input placeholder="Phone" {...register("customerPhone")} />
        {errors.customerPhone && (
          <Text color="red" as="p">
            {errors.customerPhone.message}
          </Text>
        )}

        <TextArea
          placeholder="Add a description"
          {...register("description")}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button>Submit new layaway</Button>
      </form>
    </div>
  );
};

export default NewLayawayPage;
