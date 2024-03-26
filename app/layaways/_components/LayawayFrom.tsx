"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { layawaySchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layaway } from "@prisma/client";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type LayawayFormData = z.infer<typeof layawaySchema>;

const LayawayForm = ({ layaway }: { layaway?: Layaway }) => {
  const [error, setError] = useState("");
  const [isSubmiting, setSubmiting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LayawayFormData>({
    resolver: zodResolver(layawaySchema),
  });

  const onSubmit: SubmitHandler<LayawayFormData> = async (data) => {
    try {
      setSubmiting(true);

      if (layaway) await axios.patch("/api/layaways/" + layaway.id, data);
      else await axios.post("/api/layaways", data);
      router.push("/layaways");
      router.refresh();
    } catch (error) {
      setSubmiting(false);
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
        <TextField.Root
          defaultValue={layaway?.customerName}
          placeholder="Full Name"
          {...register("customerName")}
        />
        <ErrorMessage>{errors.customerName?.message}</ErrorMessage>

        <TextField.Root
          defaultValue={layaway?.customerPhone}
          placeholder="Phone"
          {...register("customerPhone")}
        />
        <ErrorMessage>{errors.customerPhone?.message}</ErrorMessage>

        <TextArea
          defaultValue={layaway?.description}
          placeholder="Add a description"
          {...register("description")}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmiting}>
          {layaway ? "Update layaway" : "Submit new layaway"}{" "}
          {isSubmiting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default LayawayForm;
