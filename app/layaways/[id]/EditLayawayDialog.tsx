"use client";

import { patchLayawaySchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layaway } from "@prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Switch,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type EditLayawayData = z.infer<typeof patchLayawaySchema>;

const EditLayawayDialog = ({ layaway }: { layaway: Layaway }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<EditLayawayData>({
    defaultValues: {
      item: layaway.item,
      value: Number(layaway.value),
      downPayment: Number(layaway.downPayment),
      packageCode: layaway.packageCode,
      description: layaway.description,
      setReminder: layaway.setReminder,
    },
    resolver: zodResolver(patchLayawaySchema),
  });

  const onSubmit: SubmitHandler<EditLayawayData> = async (data) => {
    if (isDirty) {
      try {
        await axios.patch(`/api/layaways/${layaway.id}`, data);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton variant="solid">
          <Pencil2Icon />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Edit layaway</Dialog.Title>
        <Dialog.Description mb="4">
          Make changes to this layaway.
        </Dialog.Description>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <Text as="label">
              <Text as="div" size="2" mb="1" weight="bold">
                Item
              </Text>
              <TextField.Root
                type="text"
                placeholder="Enter item"
                {...register("item")}
              />
            </Text>
            <Text as="label">
              <Text as="div" size="2" mb="1" weight="bold">
                Value
              </Text>
              <TextField.Root
                placeholder="Enter item value"
                type="number"
                {...register("value", { valueAsNumber: true })}
              >
                <TextField.Slot>
                  <Text color="gray">$</Text>
                </TextField.Slot>
              </TextField.Root>
            </Text>
            <Text as="label">
              <Text as="div" size="2" mb="1" weight="bold">
                Down Payment
              </Text>
              <TextField.Root
                placeholder="Enter down payment"
                type="number"
                {...register("downPayment", { valueAsNumber: true })}
              >
                <TextField.Slot>
                  <Text color="gray">$</Text>
                </TextField.Slot>
              </TextField.Root>
            </Text>
            <Text as="label">
              <Text as="div" size="2" mb="1" weight="bold">
                Package Code
              </Text>
              <TextField.Root
                placeholder="Enter package code"
                type="text"
                {...register("packageCode")}
              />
            </Text>
            <Text as="label">
              <Text as="div" size="2" mb="1" weight="bold">
                Description
              </Text>
              <TextArea
                placeholder="Enter item description"
                {...register("description")}
              />
            </Text>
            <Controller
              name="setReminder"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Text as="label" size="2">
                  <Flex gap="2">
                    <Switch
                      size="1"
                      checked={value}
                      onCheckedChange={onChange}
                    />
                    Remind customer when payment is overdue
                  </Flex>
                </Text>
              )}
            />
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

export default EditLayawayDialog;
