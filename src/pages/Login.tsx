// src/pages/Login.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { generateId } from "../utils/id";
import { saveCurrentUser } from "../utils/storage";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

type LoginForm = {
  name: string;
  email: string;
  password: string;
  remember: boolean;
};

const schema = yup.object({
  name: yup.string().required("נדרש שם").min(2, "לפחות 2 תווים"),
  email: yup.string().required("נדרש אימייל").email("פורמט אימייל לא תקין"),
  password: yup.string().required("נדרש סיסמה").min(6, "לפחות 6 תווים"),
  remember: yup.boolean().required(),
}).required();

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  async function onSubmit(data: LoginForm) {
    // create a simple user object and save it (no real backend here)
    const user = {
      id: generateId("user"),
      name: data.name,
      email: data.email,
      loggedAt: new Date().toISOString(),
    };
    saveCurrentUser(user, data.remember);
    navigate("/home");
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={6}>
      <Paper elevation={3} style={{ padding: 24, maxWidth: 480, width: "100%" }}>
        <Typography variant="h5" gutterBottom>כניסה למערכת</Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box mb={2}>
            <TextField
              label="שם"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message as string | undefined}
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="אימייל"
              type="email"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message as string | undefined}
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="סיסמה"
              type="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message as string | undefined}
            />
          </Box>

          <Box mb={2}>
            <FormControlLabel
              control={<Checkbox {...register("remember")} />}
              label="זכור אותי"
            />
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" disabled={isSubmitting}>התחבר</Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
