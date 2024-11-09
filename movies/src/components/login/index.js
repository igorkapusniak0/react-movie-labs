import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/db-api";

const styles = {
  root: {
    height: "100vh", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "100%",
    maxWidth: "400px", 
    "& > * ": {
      marginTop: 2,
    },
  },
  textField: {
    width: "100%", 
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  snack: {
    width: "50%",
    "& > * ": {
      width: "100%",
    },
  },
};

const LoginForm = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSnackClose = () => {
    setOpen(false);
    navigate("/"); 
  };

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm(defaultValues);

  const onSubmit = (data) => {
    try {
        const result = loginUser(data);
        if (result.success) {
          setOpen(true);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3" align="center">
        Login
      </Typography>
      <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackClose}
      >
        <MuiAlert
          severity="success"
          variant="filled"
          onClose={handleSnackClose}
        >
          <Typography variant="h4">Login successful!</Typography>
        </MuiAlert>
      </Snackbar>

      <form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter a valid email address",
            },
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={styles.textField}
              variant="outlined"
              margin="normal"
              required
              onChange={onChange}
              value={value}
              id="email"
              label="Email"
              name="email"
              autoFocus
            />
          )}
        />
        {errors.email && (
          <Typography variant="h6" component="p" align="center">
            {errors.email.message}
          </Typography>
        )}

        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters long" },
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={styles.textField}
              variant="outlined"
              margin="normal"
              required
              name="password"
              value={value}
              onChange={onChange}
              label="Password"
              type="password"
              id="password"
            />
          )}
        />
        {errors.password && (
          <Typography variant="h6" component="p" align="center">
            {errors.password.message}
          </Typography>
        )}

        <Box sx={styles.buttons}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            onClick={() => {
              reset({
                email: "",
                password: "",
              });
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
