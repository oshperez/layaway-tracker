import { Layaway } from "@prisma/client";
import { Flex, Progress, Box } from "@radix-ui/themes";
import React from "react";
interface Props {
  layaway: Layaway;
}
const LayawayOutstandingProgress: React.FC<
  Props & React.ComponentProps<typeof Progress>
> = ({ layaway, ...props }) => {
  const total = Number(layaway.value);
  const downPayment = Number(layaway.downPayment);
  const fakePaymentAmount = Math.floor(Math.random() * total - downPayment);
  const outstanding: number = total - downPayment - fakePaymentAmount;
  const percentage = ((downPayment + fakePaymentAmount) / total) * 100;

  return (
    <Flex width="90%" gap="2" align="center">
      <Box flexGrow="1">
        <Progress value={percentage} {...props} />
      </Box>
      <Box>${outstanding}</Box>
    </Flex>
  );
};

export default LayawayOutstandingProgress;
