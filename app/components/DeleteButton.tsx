"use client";

import { Customer, Layaway } from "@prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, IconButton } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

interface Props {
  target: Layaway | Customer;
}

// Type guards
function isLayaway(obj: any) {
  return (
    typeof obj === "object" && obj !== null && "item" in obj && "value" in obj
  );
}
function isCustomer(obj: any) {
  return (
    typeof obj === "object" && obj !== null && "name" in obj && "phone" in obj
  );
}

const DeleteButton: React.FC<
  Props & React.ComponentProps<typeof IconButton>
> = ({ target, ...props }: Props) => {
  const targetId: number = target.id;
  let targetName: string = isLayaway(target)
    ? "layaway"
    : isCustomer(target)
    ? "customer"
    : "";

  const router = useRouter();
  const [error, setError] = useState(false);

  const deleteTarget = async () => {
    try {
      await axios.delete(`/api/${targetName}s/${targetId}`);
      router.push(`/${targetName}s`);
      router.refresh();
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <IconButton {...props}>
            <TrashIcon />
          </IconButton>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            {`Are you sure you want to delete this ${targetName}? This action can not be
            undone`}
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={deleteTarget}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            {`${targetName} could not been deleted`}
          </AlertDialog.Description>
          <Flex justify="end">
            <Button
              color="gray"
              variant="soft"
              mt="3"
              onClick={() => setError(false)}
            >
              OK
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteButton;
