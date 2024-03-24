import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditLayawayButton = ({ layawayId }: { layawayId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`layaways/${layawayId}/edit`}>Edit layaway</Link>
    </Button>
  );
};

export default EditLayawayButton;
