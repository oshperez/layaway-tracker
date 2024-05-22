import { Layaway } from "@prisma/client";
import { Flex, Progress, Box } from "@radix-ui/themes";
import React from "react";

interface Props {
  layaway: Layaway;
}

const OutstandingDebtProgress: React.FC<
  Props & React.ComponentProps<typeof Progress>
> = ({ layaway, ...props }) => {
  const { value: total, outstandingDebt: outstanding } = layaway;
  const percentage = ((total - outstanding) / total) * 100;

  return (
    <Flex width="90%" gap="2" align="center">
      <Box flexGrow="1">
        <Progress value={percentage} {...props} />
      </Box>
      <Box>${outstanding}</Box>
    </Flex>
  );
};

export default OutstandingDebtProgress;
