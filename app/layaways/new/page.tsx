"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface layawayForm {
  customerName: string;
  customerPhone: string;
  description: string;
}

const NewLayawayPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<layawayForm>();

  const onSubmit: SubmitHandler<layawayForm> = async (data) => {
    await axios.post("/api/layaways", data);
    router.push("/layaways");
  };

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <TextField.Input placeholder="Full Name" {...register("customerName")} />
      <TextField.Input placeholder="Phone" {...register("customerPhone")} />
      <TextArea placeholder="Add a description" {...register("description")} />
      <Button>Submit new layaway</Button>
    </form>
  );
};

export default NewLayawayPage;
