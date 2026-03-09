"use client";

import { useState } from "react";
import { userSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage, Link } from "@/app/components";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { ImGoogle } from "react-icons/im";

type userFormData = z.infer<typeof userSchema>;

const AuthForm = ({ purpose }: { purpose: "signin" | "register" }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userFormData>({
    resolver: zodResolver(userSchema),
  });

  const submitUserForm: SubmitHandler<userFormData> = async (data) => {
    try {
      if (purpose === "register") {
        await axios.post("/api/register", data);
      }

      const { email, password } = data;
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
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
        <Card size="4" className="shadow-lg">
          <Flex direction="column" gap="7" justify="center">
            <Box className="text-center mt-3">
              <Heading size="8" className="mb-2">
                {purpose === "signin" && "Sign in"}
                {purpose === "register" && "Welcome"}
              </Heading>
              <Text>
                {purpose === "signin" && "Good to see you again!"}
                {purpose === "register" && "Let's create your account!"}
              </Text>
            </Box>
            <Box>
              <form onSubmit={handleSubmit(submitUserForm)}>
                <Flex gap="5" direction="column">
                  {purpose === "register" && (
                    <>
                      <TextField.Root
                        placeholder="Full name"
                        type="text"
                        size="3"
                        {...register("name")}
                      />
                      <ErrorMessage>{errors.name?.message}</ErrorMessage>
                    </>
                  )}

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
                  <Button size="3" className="!cursor-pointer" type="submit">
                    {purpose === "signin" && "Sign in"}
                    {purpose === "register" && "Register"}
                  </Button>
                </Flex>
              </form>
            </Box>
            <Box>
              <Flex justify="center" className="mb-8">
                <Text className="mr-2">
                  {purpose === "signin" && "Don't have an account?"}
                  {purpose === "register" && "Already have an account?"}
                </Text>
                {purpose === "signin" && (
                  <Link href="/auth/register">Register</Link>
                )}
                {purpose === "register" && (
                  <Link href="/auth/signin">Sign in</Link>
                )}
              </Flex>
              <Flex align="center">
                <Separator orientation="horizontal" size="4" />
                <Text className="text-zinc-500 mx-2">or</Text>
                <Separator orientation="horizontal" size="4" />
              </Flex>
            </Box>
            <Button
              size="3"
              variant="outline"
              onClick={() =>
                signIn("google", { redirect: true, callbackUrl: "/" })
              }
              className="!cursor-pointer"
            >
              <ImGoogle /> Sign in with Google
            </Button>
          </Flex>
        </Card>
      </Box>
    </>
  );
};

export default AuthForm;
