"use client";

import { ErrorMessage } from "@/app/components";
import { patchCustomerSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Customer } from "@prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  Flex,
  Text,
  IconButton,
  TextField,
  Button,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof patchCustomerSchema>;

const EditCustomerDialog = ({ customer }: { customer: Customer }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { name: customer.name, phone: customer.phone },
    resolver: zodResolver(patchCustomerSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.patch(`/api/customers/${customer.id}`, data);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton>
          <Pencil2Icon />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit customer</Dialog.Title>
        <Dialog.Description mb="4">
          Make changes to customer info
        </Dialog.Description>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="2">
            <Text as="label">
              <Text as="div" mb="1" weight="bold" size="2">
                Full name
              </Text>
              <TextField.Root type="text" {...register("name")} />
            </Text>
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
            <Text as="label">
              <Text as="div" mb="1" weight="bold" size="2">
                Phone number
              </Text>
              <TextField.Root type="text" {...register("phone")} />
            </Text>
            <ErrorMessage>{errors.phone?.message}</ErrorMessage>
          </Flex>
          <Flex gap="3" mt="3" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button type="submit">Save</Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditCustomerDialog;
