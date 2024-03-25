import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

const DeleteLayawayButton = ({ layawayId }: { layawayId: number }) => {
  return (
    <Button color="red">
      <TrashIcon height="16" width="16" />
      Delete layaway
    </Button>
  );
};

export default DeleteLayawayButton;
