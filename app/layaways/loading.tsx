import { Skeleton } from "@/app/components";
import { Table } from "@radix-ui/themes";
import LayawayActions from "./LayawayActions";

const LoadingLayawayPage = () => {
  const layaways = [1, 2, 3, 4, 5];

  return (
    <>
      <LayawayActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.RowHeaderCell>Name</Table.RowHeaderCell>
            <Table.RowHeaderCell className="hidden lg:table-cell">
              Description
            </Table.RowHeaderCell>
            <Table.RowHeaderCell className="hidden md:table-cell">
              Status
            </Table.RowHeaderCell>
            <Table.RowHeaderCell>Created</Table.RowHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {layaways.map((layaway) => (
            <Table.Row key={layaway}>
              <Table.Cell>
                <Skeleton />
                <div className="block md:hidden">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden lg:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default LoadingLayawayPage;
