"use client";

import { ErrorMessage } from "@/app/components";
import { userSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type userFormData = z.infer<typeof userSchema>;

const RegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userFormData>({
    resolver: zodResolver(userSchema),
  });
  const router = useRouter();

  const submitUserForm: SubmitHandler<userFormData> = async (data) => {
    try {
      await axios.post("/api/register", data);
      router.push("/");
      router.refresh();
    } catch (error) {
      setError("An unexpected error has occured");
    }
  };

  return (
    <>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Box className="w-full h-svh mx-auto sm:max-w-lg ">
        <Card size="4" className="h-[72.5%]">
          <Flex direction="column" gap="7" justify="center">
            <Box className="text-center mt-3">
              <Heading size="8" className="mb-2">
                Welcome
              </Heading>
              <Text>Let's create your account</Text>
            </Box>
            <Box>
              <form onSubmit={handleSubmit(submitUserForm)}>
                <Flex gap="5" direction="column">
                  <TextField.Root
                    placeholder="Full name"
                    type="text"
                    size="3"
                    {...register("name")}
                  />
                  <ErrorMessage>{errors.name?.message}</ErrorMessage>

                  <TextField.Root
                    placeholder="Email"
                    type="email"
                    size="3"
                    {...register("email")}
                  />
                  <ErrorMessage>{errors.email?.message}</ErrorMessage>

                  <TextField.Root
                    placeholder="Password"
                    type={passwordVisible ? "text" : "password"}
                    size="3"
                    {...register("password")}
                  >
                    <TextField.Slot side="right">
                      <Box
                        as="span"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="cursor-pointer"
                      >
                        {passwordVisible ? <EyeNoneIcon /> : <EyeOpenIcon />}
                      </Box>
                    </TextField.Slot>
                  </TextField.Root>
                  <ErrorMessage>{errors.password?.message}</ErrorMessage>
                  <Button size="3" className="!cursor-pointer">
                    Submit
                  </Button>
                </Flex>
              </form>
            </Box>
          </Flex>
        </Card>
      </Box>
    </>
  );
};

export default RegisterPage;
