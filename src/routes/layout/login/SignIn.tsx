import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import StickyFooter from "../../../component/StickyFooter";
import StickyHeader from "../../../component/StickyHeader";
import { useRecoilState } from "recoil";
import { authAtom } from "../../../atoms";
import { useHistory } from "react-router-dom";

const theme = createTheme();

function SignIn() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [jwt, setJwt] = useRecoilState(authAtom);
  let history = useHistory();

  const fetchLoginApi = () => {
    fetch(`http://119.203.225.3:8081/admin/login?email=${id}&password=${pw}`)
      .then((response) => {
        if (!response.ok) {
          alert("error alert");
          throw new Error();
        } else {
          return response.json();
        }
      })
      .then((data) => {
        localStorage.setItem("accessToken", data.accessToken);
        setJwt(data.accessToken);
      })
      .then(() => history.push("/dashboard"));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setId((formData.get("id") + "").toString());
    setPw((formData.get("password") + "").toString());

    fetchLoginApi();
  };
  return (
    <ThemeProvider theme={theme}>
      <StickyHeader />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            pl: 2,
            pr: 2,
            pt: 6,
            pb: 2,
            borderRadius: 2,
            boxShadow: 2,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="Id"
              name="id"
              autoComplete="id"
              autoFocus
              onChange={(event) => setId(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPw(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      <StickyFooter />
    </ThemeProvider>
  );
}

export default SignIn;
