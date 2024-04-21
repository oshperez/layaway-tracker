"use client";

import { Pencil2Icon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const EditLayawayButton = ({ layawayId }: { layawayId: number }) => {
  const router = useRouter();

  return (
    <IconButton
      variant="solid"
      onClick={() => router.push(`/layaways/${layawayId}/edit`)}
    >
      <Pencil2Icon />
    </IconButton>
  );
};

export default EditLayawayButton;
