import { Box, Card, Grid, Text } from "@radix-ui/themes";
import CustomerForm from "../_components/CustomerForm";

const NewCustomerPage = () => {
  return (
    <Grid justify="center" columns="1" className="place-items-center">
      <Card size="3" className="md: w-[550px]">
        <Text as="div" size="6" weight="bold" mb="5">
          New Customer
        </Text>
        <CustomerForm />
      </Card>
    </Grid>
  );
};

export default NewCustomerPage;
