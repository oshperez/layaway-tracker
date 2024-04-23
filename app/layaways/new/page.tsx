import { Card, Grid, Text, Flex } from "@radix-ui/themes";
import LayawayForm from "../_components/LayawayFrom";

const NewLayawayPage = () => {
  return (
    <Card size="4">
      <Text as="div" size="6" weight="bold" mb="5">
        New Layaway
      </Text>
      <LayawayForm />
    </Card>
  );
};

export default NewLayawayPage;
