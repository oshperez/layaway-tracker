"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import LayawayCustomerSelect from "./LayawayCustomerSelect";
import { layawaySchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layaway } from "@prisma/client";
import {
  Box,
  Button,
  Callout,
  Flex,
  Grid,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type LayawayFormData = z.infer<typeof layawaySchema>;

const LayawayForm = ({ layaway }: { layaway?: Layaway }) => {
  const [error, setError] = useState("");
  const [isSubmiting, setSubmiting] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LayawayFormData>({
    defaultValues: {
      customerId: layaway?.customerId.toString() || "",
    },
    resolver: zodResolver(layawaySchema),
  });

  // Handle submit event
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
    <>
      <Box>
        {error && (
          <Callout.Root color="red" className="mb-5">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <Grid rows="2" gap="5">
            <Flex gap="9" justify="between">
              <Flex direction="column" gap="3" flexGrow="1" maxWidth="600px">
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
              </Flex>
              <Box>
                <Controller
                  name="customerId"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <LayawayCustomerSelect
                      value={value}
                      onChange={onChange}
                      {...(layaway
                        ? { customerId: String(layaway.customerId) }
                        : {})}
                    />
                  )}
                />
                <ErrorMessage>{errors.customerId?.message}</ErrorMessage>
              </Box>
            </Flex>
            <Box>
              <Button disabled={isSubmiting} type="submit">
                {layaway ? "Update layaway" : "Submit new layaway"}{" "}
                {isSubmiting && <Spinner />}
              </Button>
            </Box>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default LayawayForm;
