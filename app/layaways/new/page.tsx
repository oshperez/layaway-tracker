import { Grid } from "@radix-ui/themes";
import LayawayForm from "../_components/LayawayFrom";
import LayawayCustomerSelect from "./LayawayCustomerSelect";

const NewLayawayPage = () => {
  return (
    <Grid columns="2fr 1fr">
      <LayawayForm />
      <LayawayCustomerSelect />
    </Grid>
  );
};

export default NewLayawayPage;
