"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteLayawayButton = ({ layawayId }: { layawayId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const deleteLayaway = async () => {
    try {
      await axios.delete("/api/layaways/" + layawayId);
      router.push("/layaways");
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
            Delete layaway
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm delation</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this layaway? This action can not be
            undone.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={deleteLayaway}>
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
            Layaway could not be deleted
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

export default DeleteLayawayButton;
