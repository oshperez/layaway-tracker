import { Pagination } from "@/app/components";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import LayawayActions from "./LayawayActions";
import LayawayTable, { LayawayQueryParams } from "./LayawayTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: LayawayQueryParams;
}

const Layaways = async ({ searchParams }: Props) => {
  const validStatuses = Object.values(Status);
  const status = validStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };
  const validOrderParams = ["asc", "desc"];
  const orderBy =
    searchParams.sort === "createdAt" &&
    validOrderParams.includes(searchParams.order)
      ? { [searchParams.sort]: searchParams.order }
      : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const layaways = await prisma.layaway.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: { customer: true, payments: { select: { amount: true } } },
  });

  const layawayCount = await prisma.layaway.count({ where });

  return (
    <Flex direction="column" gap="5">
      <LayawayActions />
      <LayawayTable searchParams={searchParams} layaways={layaways} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={layawayCount}
        className="w-fit mx-auto"
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
export default Layaways;
