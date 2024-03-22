"use client";

import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLayawaySchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

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
        <ErrorMessage>{errors.customerName?.message}</ErrorMessage>
        <TextField.Input placeholder="Phone" {...register("customerPhone")} />
        <ErrorMessage>{errors.customerPhone?.message}</ErrorMessage>

        <TextArea
          placeholder="Add a description"
          {...register("description")}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>Submit new layaway</Button>
      </form>
    </div>
  );
};

export default NewLayawayPage;
