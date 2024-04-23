"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { layawaySchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layaway } from "@prisma/client";
import {
  Box,
  Button,
  Callout,
  Flex,
  Grid,
  Switch,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import LayawayCustomerSelect from "./LayawayCustomerSelect";

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
      setReminder: true,
    },
    resolver: zodResolver(layawaySchema),
  });

  // Handle submit event
  const onSubmit: SubmitHandler<LayawayFormData> = async (data) => {
    console.log({ data });
    try {
      // setSubmiting(true);
      // if (layaway) await axios.patch("/api/layaways/" + layaway.id, data);
      // else await axios.post("/api/layaways", data);
      // router.push("/layaways");
      // router.refresh();
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid rows="repeat(2, auto)" columns="repeat(2, 1fr)" gap="5">
            <Flex direction="column" gap="3">
              <Box>
                <Text as="div" mb="1" size="2" weight="bold">
                  Item:
                </Text>
                <TextField.Root
                  type="text"
                  defaultValue={layaway?.item}
                  placeholder="Add item here"
                  {...register("item")}
                />
                <ErrorMessage>{errors.item?.message}</ErrorMessage>
              </Box>
              <Box>
                <Text as="div" mb="1" size="2" weight="bold">
                  Value
                </Text>
                <TextField.Root
                  type="number"
                  defaultValue={layaway?.value.toString()}
                  placeholder="Add item value here"
                  {...register("value", { valueAsNumber: true })}
                >
                  <TextField.Slot>
                    <Text color="gray">$</Text>
                  </TextField.Slot>
                </TextField.Root>
                <ErrorMessage>{errors.value?.message}</ErrorMessage>
              </Box>
              <Box>
                <Text as="div" mb="1" size="2" weight="bold">
                  Down Payment
                </Text>
                <TextField.Root
                  type="number"
                  defaultValue={layaway?.downPayment.toString()}
                  placeholder="Add down payment here"
                  {...register("downPayment", { valueAsNumber: true })}
                >
                  <TextField.Slot>
                    <Text color="gray">$</Text>
                  </TextField.Slot>
                </TextField.Root>
                <ErrorMessage>{errors.downPayment?.message}</ErrorMessage>
              </Box>
              <Box>
                <Text as="div" mb="1" size="2" weight="bold">
                  Package code
                </Text>
                <TextField.Root
                  type="text"
                  defaultValue={layaway?.packageCode}
                  placeholder="Add package code here"
                  {...register("packageCode")}
                />
                <ErrorMessage>{errors.packageCode?.message}</ErrorMessage>
              </Box>
            </Flex>
            <Flex direction="column" gap="3">
              <Box ml="auto">
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
              <Box>
                <Text as="div" mb="1" size="2" weight="bold">
                  Description
                </Text>
                <TextArea
                  defaultValue={layaway?.description}
                  placeholder="Add a description"
                  {...register("description")}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
              </Box>
              <Controller
                name="setReminder"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Text as="label">
                    <Flex gap="2">
                      <Switch
                        checked={value}
                        onCheckedChange={onChange}
                        defaultChecked
                      />
                      Remind customer when payment is overdue
                    </Flex>
                  </Text>
                )}
              />
            </Flex>

            <Box className="col-start-1 row-start-2">
              <Button disabled={isSubmiting} type="submit">
                {layaway ? "Update layaway" : "Submit layaway"}{" "}
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
