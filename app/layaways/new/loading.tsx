import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingNewLayawayPage = () => {
  return (
    <Box className="max-w-xl space-y-3">
      <Skeleton count={2} />
      <Skeleton height="4rem" />
      <Skeleton width="12rem" height="2rem" />
    </Box>
  );
};

export default LoadingNewLayawayPage;
