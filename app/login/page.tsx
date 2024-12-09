"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface FormValues {
  email: string;
  username: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  username: Yup.string().required("Username is required"),
});

const allowedUsers = [
  { email: "user1@example.com", username: "user1", role: "admin" },
  { email: "user2@example.com", username: "user2", role: "user" },
  { email: "user3@example.com", username: "user3", role: "user" },
];

export default function LoginPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      username: "",
    },
  });

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
  };

  const onSubmit = (data: FormValues) => {
    setIsPending(true);
    setErrorMsg(null);

    const userFound = allowedUsers.find(
      (user) =>
        user.email.toLowerCase() === data.email.toLowerCase() &&
        user.username.toLowerCase() === data.username.toLowerCase()
    );

    if (userFound) {
      setIsPending(false);
      alert("Logged in successfully!");

      setCookie("user_details", JSON.stringify(userFound), 7);

      router.push("/");
    } else {
      setIsPending(false);
      setErrorMsg("Invalid email or username. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#4880FF",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "400px",
          maxWidth: "90%",
          textAlign: "center",
          borderRadius: "14px",
        }}
      >
        <Stack spacing={4}>
          <Typography variant="h4" fontSize={{ xs: "", md: "24px" }}>
            Login to Account
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.email)}>
                    <InputLabel>Email address</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Email address"
                      type="email"
                    />
                    {errors.email && (
                      <FormHelperText>{errors.email.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.username)}>
                    <InputLabel>Username</InputLabel>
                    <OutlinedInput {...field} label="Username" type="text" />
                    {errors.username && (
                      <FormHelperText>{errors.username.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              {errorMsg && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {errorMsg}
                </Alert>
              )}

              <Button
                disabled={isPending}
                type="submit"
                variant="contained"
                sx={{ width: "100%", textTransform: "capitalize" }}
              >
                {isPending ? "Signing in..." : "Sign in"}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Box>
  );
}
