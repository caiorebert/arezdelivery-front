"use client";

import Image from "next/image";
import { Grid2, Paper, Typography, Card, CardMedia, CardContent, CardActions, Button, Icon, CircularProgress, AppBar, IconButton, Toolbar, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { useRouter } from 'next/router';
import { verifyToken } from "../api/auth";


export default function Login() {

  const [user, setUser] = useState({
    login: null,
    senha: null
  });
  const [loading, setLoading] = useState(false);

  if (!loading && (user.login==null && user.senha==null)) {
    // setLoading(true);
    // verifyToken().then((result) => {
    //   if (result) {
        
    //     alert("logado");
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
            {
              (loading) ? 
              <CircularProgress /> 
              : 
              <Grid2 container size={12} padding={1}>
                <Grid2 size={12} padding={1}>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Login
                  </Typography>
                </Grid2>
                <Grid2 size={12} padding={1}>
                  <TextField id="filled-basic" label="Login" variant="filled" style={{width: "100%"}}/>
                </Grid2>
                <Grid2 size={12} padding={1}>
                  <TextField id="filled-basic" label="Senha" variant="filled" style={{width: "100%"}}/>
                </Grid2>
                <Grid2 size={12} padding={1}>
                  <Button variant="contained" style={{width: "100%"}}>Entrar</Button>
                </Grid2>
              </Grid2>
            }
        </Paper>
      </Grid2>
    </Grid2>
  );
}
