"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { customerSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Customer } from "@prisma/client";
import { Box, Button, Callout, Flex, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type CustomerFormData = z.infer<typeof customerSchema>;

const CustomerForm = () => {
  const [submissionError, setSubmissionError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

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
      setSubmitting(true);
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
          <Text as="label">
            <Text as="div" mb="1" weight="bold" size="2">
              Name
            </Text>
            <TextField.Root placeholder="Name" mt="2" {...register("name")} />
          </Text>
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
          <Text as="label">
            <Text as="div" mb="1" weight="bold" size="2">
              Phone
            </Text>
            <TextField.Root placeholder="Phone" mt="2" {...register("phone")} />
          </Text>
          <ErrorMessage>{errors.phone?.message}</ErrorMessage>
        </Flex>
        <Button
          type="submit"
          mt="4"
          disabled={isSubmitting}
          className="!cursor-pointer"
        >
          Add customer
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Box>
  );
};

export default CustomerForm;
