"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

interface Props {
  targetId: string;
  target: "layaway" | "customer";
  children?: ReactNode;
}
const DeleteButton = ({ targetId, target, children }: Props) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const deleteTarget = async () => {
    try {
      await axios.delete(`/api/${target}s/${targetId}`);
      router.push(`/${target}s`);
      router.refresh();
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">
            <TrashIcon height="16" width="16" />
            {children || "Delete"}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            {`Are you sure you want to delete this ${target}? This action can not be
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
            {`${target} could not been deleted`}
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
