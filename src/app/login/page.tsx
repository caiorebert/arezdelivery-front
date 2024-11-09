"use client";

import { Grid2, Paper, Typography, Card, CardMedia, CardContent, CardActions, Button, Icon, CircularProgress, AppBar, IconButton, Toolbar, Box, TextField } from "@mui/material";
import { useState } from "react";
import { login } from "../api/auth";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    // login(email, senha).then((result) => {
    //   if (result !== null) {
    //     document.cookie = `token=${result.token}`;
    //     if () {

    //     }
    //     router.push("/");
    //   } else {
    //     alert("não logado");
    //   }
    //   setLoading(false);
    // });
  }

  return (
    <Grid2 container size={12} padding={0} textAlign={"center"}>
      <Grid2 container style={{height: "100vh", width: "100%", backgroundColor: "black"}}>
        <Paper 
          elevation={2}
          style={{
            position: "absolute",
            margin: "auto",
            backgroundColor: "white",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: "40%",
            height: "50%",
            overflow: 'hidden'
          }}>
            <Grid2 container size={12} padding={0}>
              <Box sx={{ flexGrow: 1 }}>
                <AppBar 
                  position="static" 
                >
                  <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                      Arez Delivery
                    </Typography>
                  </Toolbar>
                </AppBar>
              </Box>
            </Grid2>
              <Grid2 container size={12} padding={1}>
                <Grid2 size={12} padding={1}>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Login
                  </Typography>
                </Grid2>
                <Grid2 size={12} padding={1}>
                  <TextField id="filled-basic" onInput={(e) => setEmail(e.target.value)} label="Email" variant="filled" style={{width: "100%"}}/>
                </Grid2>
                <Grid2 size={12} padding={1}>
                  <TextField id="filled-basic" type="password" onInput={(e) => setSenha(e.target.value)} label="Senha" variant="filled" style={{width: "100%"}}/>
                </Grid2>
                <Grid2 size={12} padding={1}>
                  {
                  (loading) ? 
                  <CircularProgress /> 
                  : 
                  <Button variant="contained" onClick={() => submit()} style={{width: "100%"}}>Entrar</Button>
                  }
                </Grid2>
              </Grid2>
        </Paper>
      </Grid2>
    </Grid2>
  );
}
