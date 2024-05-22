"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { paymentFormDataSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Dialog,
  Flex,
  RadioGroup,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type PaymentData = z.infer<typeof paymentFormDataSchema>;

interface Props {
  layawayId: number;
  customerId: number;
}

const PaymentDialog = ({ layawayId, customerId }: Props) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PaymentData>({
    defaultValues: {
      paymentMethod: "UNKNOWN",
    },
    resolver: zodResolver(paymentFormDataSchema),
  });
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const onSubmit: SubmitHandler<PaymentData> = async ({
    amount,
    paymentMethod,
  }) => {
    const payload = {
      amount,
      paymentMethod: paymentMethod === "UNKNOWN" ? null : paymentMethod,
      layawayId,
      customerId,
    };

    try {
      setSubmitting(true);
      await axios.post("/api/payments", payload);
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
    reset();
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger onClick={handleOpen}>
        <Button>Make payment</Button>
      </Dialog.Trigger>
      <Dialog.Content onKeyDown={handleKeyDown}>
        <Dialog.Title>New Payment</Dialog.Title>
        <Dialog.Description mb="4">
          Make a payment to this layaway
        </Dialog.Description>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <Text as="label">
              <Text as="div" size="2" mb="1" weight="bold">
                Amount
              </Text>
              <TextField.Root
                type="number"
                placeholder="100"
                {...register("amount", { valueAsNumber: true })}
              >
                <TextField.Slot>
                  <Text color="gray">$</Text>
                </TextField.Slot>
              </TextField.Root>
            </Text>
            <ErrorMessage>{errors.amount?.message}</ErrorMessage>
            <Box>
              <Text as="div" size="2" weight="bold" mb="1">
                Select payment method
              </Text>
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RadioGroup.Root
                    value={value}
                    onValueChange={onChange}
                    // Check default radio
                    defaultValue="UNKNOWN"
                  >
                    <RadioGroup.Item value="UNKNOWN">
                      Not specified
                    </RadioGroup.Item>
                    <RadioGroup.Item value="CASH">Cash</RadioGroup.Item>
                    <RadioGroup.Item value="CARD">Card</RadioGroup.Item>
                  </RadioGroup.Root>
                )}
              />
            </Box>
          </Flex>
          <Flex mt="3" gap="3" justify="end">
            <Button variant="soft" color="gray" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Make Payment{isSubmitting && <Spinner />}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default PaymentDialog;
