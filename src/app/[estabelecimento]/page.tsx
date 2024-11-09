"use client";

import Image from "next/image";	
import { Box, Button, CardActions, CircularProgress, Grid2, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCategoriasByEstabelecimento, getEstabelecimentoByName, getOpcoesByEstabelecimento } from "../api/estabelecimentos";
import { Estabelecimento } from "@/lib/types/estabelecimentos";
import { Categoria } from "@/lib/types/categoria";
import { Card, CardContent, CardMedia } from "@mui/material";
import { get } from "http";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function opcoesByCategoria(opcoes: any[], categoria: string) {
  return opcoes.filter(opcao => opcao.categoria === categoria);
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function EstabelecimentoPage({
  params,
}: {
  params: Promise<{ estabelecimento: string }>;
}) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [estabelecimento, setEstabelecimento] = useState<Estabelecimento>({
    id: 0,
    nome: "",
    endereco: "",
    telefone: "",
    cnpj: "",
    email: "",
    tagnome: "",
    opcoes: [],
  });
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getEstabelecimento(){
      setEstabelecimento((await getEstabelecimentoByName((await params).estabelecimento)));
    }
    getEstabelecimento();
  }, []);

  useEffect(() => {
    async function getCategorias(){
      const categorias = await getCategoriasByEstabelecimento(estabelecimento.id);
      setCategorias(categorias);
    }
    getCategorias();
  }, [estabelecimento]);

  return (
    <Grid2 container size={12} padding={0}>
      <Paper elevation={2} style={{width: "100%"}}>
        <Grid2 container size={12}>
          <Grid2 size={2} padding={1}>
            <Button variant='contained'>
              VOLTAR
            </Button>
          </Grid2>
          <Grid2 size={8} textAlign={'center'}>
            <table style={{width: '100%', height: '100%'}}>
              <tbody>
                <tr>
                  <td>
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid2>
          <Grid2 container textAlign={'right'} size={2}>
            <Grid2 size={6}>
              <table style={{width: "100%", height: "100%"}}>
                <tbody>
                  <tr>
                    <td>
                      <Button onClick={() => window.location.href = "/login"} variant="contained" color="primary">ENTRAR</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid2>
            <Grid2 size={6}>
              <table style={{width: "100%", height: "100%"}}>
                <tbody>
                  <tr>
                    <td>
                      <Button variant="outlined" color="secondary">CADASTRAR</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid2>
          </Grid2>
        </Grid2>
      </Paper>
      <Grid2 marginTop={5} container size={12}>
        {
          (estabelecimento.id === 0) 
          ? 
            <CircularProgress/>

          :
          <div style={{width: '100%'}}>
            <Grid2 container size={12} position={'relative'}>
              <Grid2 size={12} bgcolor={'black'} style={{height: "300px", textAlign: 'center', position: 'relative', margin: 'auto', marginBottom: 40}}>
                <div className="imgBackground" >
                  <img
                    style={{width: '20%', height: '100%'}} 
                    src={"https://conteudo.imguol.com.br/c/entretenimento/8c/2018/04/18/fast-food-lanche-1524056858988_v2_1183x887.jpg"}
                  />
                </div>
              </Grid2>
              <Grid2 size={12} bgcolor={'white'} textAlign={'center'}>
                <div style={{ textAlign: 'left', width: '100%', position: 'absolute', bottom: 0, backgroundColor: 'white'}}>
                  <Image
                    style={{marginTop: -50, border: '1px solid rgb(0, 0, 0, 0.2)', backgroundColor: 'white', borderRadius: 10, padding: 10, marginLeft: 10}}
                    src={(estabelecimento.foto!=null) ? estabelecimento.foto : "https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png"}
                    loader={({ src }) => src}
                    alt="Picture of the author"
                    width={90}
                    height={90}
                  />
                  <Typography style={{marginLeft: 10}} variant="h4" color="black">{estabelecimento.nome}</Typography>
                </div>
              </Grid2>
            </Grid2>
            <Grid2 size={12}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  {
                    categorias.map((categoria, i) => (
                      <Tab label={categoria.nome} {...a11yProps(i)} />
                    ))
                  }
                </Tabs>
              </Box>
              {
                categorias.map((categoria, i) => (
                  <CustomTabPanel value={value} index={i}>
                    <h6>{categoria.nome}</h6>
                    <Grid2 container size={12}>
                      {
                        opcoesByCategoria(estabelecimento.opcoes || [], categoria.nome).map((opcao, i) => (
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
                                <Typography gutterBottom variant="h5" component="div">
                                  {opcao.nome}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {opcao.descricao}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button size="small">Adicionar</Button>
                              </CardActions>
                            </Card>
                          </Grid2>
                        ))
                      }
                    </Grid2>
                  </CustomTabPanel>
                ))
              }
            </Box>
            </Grid2>
          </div> 
        }
        </Grid2>
    </Grid2>
  );
}
