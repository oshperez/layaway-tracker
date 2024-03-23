import { Box, Card, Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingLayawayDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton className="max-w-xl" />
      <Flex gap="4">
        <Skeleton width="3rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Flex gap="3" align="center" my="3">
        <Skeleton width="2rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card>
        <Skeleton width="5rem" />
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingLayawayDetailPage;
