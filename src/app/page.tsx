"use client";

import { Grid2, Paper, Typography, Card, CardMedia, CardContent, CardActions, Button, Icon, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { getEstabelecimentos } from "./api/estabelecimentos";
import { Estabelecimento } from "../lib/types/estabelecimentos";
import { useAppSelector } from "@/lib/store";
import { useRouter } from 'next/navigation';

export default function Home() {
  const authState = useAppSelector((state) => state.auth.authState);
  const [estabelecimentos, setEstabelecimentos] = useState([]);

  useEffect(() => {
    setEstabelecimentos([]);
    async function list() {
      getEstabelecimentos().then((data) => {
        setEstabelecimentos(data);
      });
    }
    list();
  }, []);

  return (
    <Grid2 container size={12} padding={0}>
      <Grid2 container size={12} >
        <Paper elevation={2}>
          <Grid2 container size={12}>
            <Grid2 size={2} padding={1}></Grid2>
            <Grid2 size={8} textAlign={'center'}>
              <table style={{width: '100%', height: '100%'}}>
                <tbody>
                  <tr>
                    <td>
                      <h1>ArezDelivery</h1>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid2>
            <Grid2 container textAlign={'right'} size={2}>
              {
                (authState) ?
                <Grid2 size={12} padding={1}>
                  <Button variant='contained' onClick={() => window.location.href="/login"}>
                    {authState ? 'Painel' : 'Login'}
                  </Button>
                </Grid2>
                :
                <Grid2 size={12} padding={1}>
                  <Button variant='contained' onClick={() => window.location.href="/cadastro"}>
                    Cadastre-se
                  </Button>
                </Grid2>
              }
            </Grid2>
          </Grid2>
        </Paper>
        <Grid2 size={12} padding={2}>
          <Typography variant="h6" component="h2" color="black">Estabelecimentos</Typography>
        </Grid2>
        {
          (Array.isArray(estabelecimentos) && estabelecimentos.length > 0) ?
            <Grid2 container size={12}>
              {estabelecimentos.map((estabelecimento:Estabelecimento, i) => (
                <Grid2 size={{ xs: 12, md: 4 }} key={i} padding={1}>
                  <Card onClick={() => window.location.href= "/" + estabelecimento.tagnome}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={(estabelecimento.foto) ? estabelecimento.foto : "https://www.dlinkmea.com/images/no-product.png"}
                      style={{borderBottom: "0.1px solid rgb(0, 0, 0, 0.1)"}}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {estabelecimento.nome}
                      </Typography>
                    </CardContent>
                    <CardActions style={{textAlign: 'center', borderTop: '1px solid rgb(0, 0, 0, 0.5)', backgroundColor: '#333'}}>
                      <Button variant='contained' style={{position: 'relative', margin: 'auto'}}>Ver Cardápio</Button>
                    </CardActions>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          :
            <Grid2 container size={12} justifyContent={'center'} alignItems={'center'}>
              <CircularProgress/>
            </Grid2>
        }
      </Grid2>
    </Grid2>
  );
}
