"use client";

import { ErrorMessage } from "@/app/components";
import { customerSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Callout, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type CustomerFormData = z.infer<typeof customerSchema>;

const NewCustomerPage = () => {
  const [submissionError, setSubmissionError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });
  const router = useRouter();

  const addCustomer: SubmitHandler<CustomerFormData> = async (data) => {
    try {
      await axios.post("/api/customers", data);
      router.push("/customers");
      router.refresh();
    } catch (error) {
      setSubmissionError("An unexpected error has occured");
    }
  };

  return (
    <Box className="lg: max-w-lg">
      {submissionError && (
        <Callout.Root className="mb-5">
          <Callout.Text color="red" className="mb-5">
            {submissionError}
          </Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(addCustomer)}>
        <Flex direction="column" gap="4">
          <Box>
            <label className="text-zinc-600">Name:</label>
            <TextField.Root
              size="3"
              placeholder="John Doe"
              mt="2"
              {...register("name")}
            />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </Box>
          <Box>
            <label className="text-zinc-600">Phone:</label>
            <TextField.Root
              size="3"
              placeholder="800-400-000"
              mt="2"
              {...register("phone")}
            />
            <ErrorMessage>{errors.phone?.message}</ErrorMessage>
          </Box>
        </Flex>
        <Button size="3" type="submit" mt="4" className="!cursor-pointer">
          Add customer
        </Button>
      </form>
    </Box>
  );
};

export default NewCustomerPage;
