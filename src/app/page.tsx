"use client";

import Image from "next/image";
import { Grid2, Paper, Typography, Card, CardMedia, CardContent, CardActions, Button, Icon, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Opcao } from "./types/opcao";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function Home() {
  const [opcoes, setOpcoes] = useState([]);
  
  useEffect(() => {
    async function getOpcoes() {
      try {
        const response = await fetch("http://localhost:3000/opcoes");
        setOpcoes((await response.json()));
      } catch (error) {
        console.error("Erro ao buscar opções:", error);
      }
    }
    getOpcoes();
  }, []);

  return (
    <Grid2 container size={12} padding={0}>
      <Grid2 container size={12} >
        <Paper elevation={2} style={{width: "100%"}}>
          <Grid2 container size={12}>
            <Grid2 size={4} padding={1}>
              <Image
                src={"https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png"}
                alt="Picture of the author"
                width={90}
                height={90}
              />
            </Grid2>
            <Grid2 size={4} textAlign={'center'}>
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
            <Grid2 textAlign={'right'} size={4}>
              <table style={{width: "80%", height: "100%", float: 'right'}}>
                <tbody>
                  <tr>
                    <td>
                      <h6>User</h6>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </Grid2>
          </Grid2>
        </Paper>
        <Grid2 size={12} padding={2}>
          <Typography variant="h2" component="h2" color="black">Cardápio</Typography>
        </Grid2>
        {
          (opcoes.length > 0) ?
            <Grid2 container size={12}>
              {opcoes.map((opcao:Opcao, i) => (
                <Grid2 size={4} key={i} padding={1}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="150"
                      image={(opcao.foto) ? opcao.foto : "https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png"}
                      alt="green iguana"
                      style={{borderBottom: "0.1px solid rgb(0, 0, 0, 0.1)"}}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {opcao.nome}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        { (opcao.descricao) ? opcao.descricao : "Sem descrição" }
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                         R$ {opcao.preco}
                      </Typography>
                    </CardContent>
                    <hr></hr>
                    <CardActions>
                      <Grid2 size={12} style={{textAlign: "center"}}>
                        <Button variant="contained" endIcon={<AddShoppingCartIcon/>}> Adicionar ao carrinho</Button>
                      </Grid2>
                    </CardActions>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          :
              <CircularProgress/>
        }
      </Grid2>
    </Grid2>
  );
}
