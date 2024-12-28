"use client";

import Image from "next/image";	
import { Box, Button, CardActions, CircularProgress, Grid2, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCategoriasByEstabelecimento, getEstabelecimentoByName, getOpcoesByEstabelecimento } from "../api/estabelecimentos";
import { Estabelecimento } from "@/lib/types/estabelecimentos";
import { Categoria } from "@/lib/types/categoria";
import { Card, CardContent, CardMedia } from "@mui/material";
import styles from "./page.module.css";
import { useAppSelector } from "@/lib/store";
import SwipeableEdgeDrawer from "../components/drawer";
import { Carrinho } from "@/lib/types/carrinho";

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

const isMobile = () => {
  const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop|BlackBerry|webOS/i.test(userAgent);
};

export default function EstabelecimentoPage({
  params,
}: {
  params: Promise<{ estabelecimento: string }>;
}) {
  const [carrinho, setCarrinho] = useState<Carrinho | undefined>();
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

  const addCarrinho = (item: any) => {
    if (carrinho === undefined) {
      setCarrinho({pedidos: [{id: 1, opcao: item, quantidade: 1}]});
      return;
    }
    if (carrinho.pedidos.some(pedido => pedido.opcao.id === item.id)) {
      carrinho.pedidos.map(pedido => {
        if (pedido.opcao.id === item.id) {
          pedido.quantidade += 1;
        }
      });
      setCarrinho(carrinho);
    } else {
      carrinho.pedidos.push({id: 1, opcao: item, quantidade: 1});
      setCarrinho(carrinho);
    }
  };

  const removeItem = (item: any) => {
    if (carrinho === undefined) {
      return;
    }
    if (carrinho.pedidos.some(pedido => pedido.opcao.id === item.id)) {
      carrinho.pedidos.map(pedido => {
        if (pedido.opcao.id === item.id) {
          if (pedido.quantidade > 1) {
            pedido.quantidade -= 1;
          }
        }
        if (pedido.quantidade == 0) {
          carrinho.pedidos = carrinho.pedidos.filter(pedido => pedido.opcao.id !== item.id);
        }
      });
      setCarrinho(carrinho);
      return;
    }
  };

  return (
    <Grid2 container size={12} padding={0}>
      <Paper elevation={2} style={{width: "100%"}}>
        <Grid2 container size={12}>
          <Grid2 size={4} padding={1}>
            <Button variant='contained' onClick={() => window.location.href="/"}>
              VOLTAR
            </Button>
          </Grid2>
          <Grid2 size={4} textAlign={'center'}>
            <table style={{width: '100%', height: '100%'}}>
              <tbody>
                <tr>
                  <td>
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid2>
          <Grid2 size={4} textAlign={'right'} padding={1}>
            <Grid2 className={styles.menu} size={12}>
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
            <Grid2 className={styles.botoes} size={12}>
              <table style={{width: "100%", height: "100%"}}>
                <tbody>
                  <tr>
                    <td>
                      {
                        // (authState) ?
                        // <Button variant="contained" color="primary">PAINEL</Button>
                        // :
                        <Button onClick={() => window.location.href = "/cadastro"} variant="contained" color="primary">CADASTRE-SE</Button>
                      }
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
            <Grid2 size={12} textAlign={'center'}>
              <CircularProgress/>
            </Grid2>

          :
          <Grid2 container size={12} position={'relative'}>
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
                  <Typography style={{marginLeft: 10,}} variant="h4" color="black">{estabelecimento.nome}</Typography>
                </div>
              </Grid2>
            </Grid2>
            <Grid2 size={12}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  {
                    categorias.map((categoria, i) => (
                      <Tab key={i} label={categoria.nome} {...a11yProps(i)} />
                    ))
                  }
                </Tabs>
              </Box>
              {
                categorias.map((categoria, i) => (
                  <CustomTabPanel key={i} value={value} index={i}>
                    <Typography variant="h6" component="h2" color="black">{categoria.nome}</Typography>
                    <Grid2 container size={12}>
                      {
                        opcoesByCategoria(estabelecimento.opcoes || [], categoria.nome).map((opcao, i) => (
                          <Grid2 size={{ xs: 12, md:2 }} key={i} padding={1}>
                            <Card>
                              <CardMedia
                                component="img"
                                height="150"
                                image={(opcao.foto) ? opcao.foto : "https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png"}
                                alt=""
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
                                <Button variant="contained" size="small" onClick={() => addCarrinho(opcao)}>Pedir</Button>
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
          </Grid2>
        }
        <SwipeableEdgeDrawer anchor="bottom" carrinho={carrinho} setCarrinho={setCarrinho} handleDrawerToggle={function (): void {
          throw new Error("Function not implemented.");
        } }/>
        </Grid2>
    </Grid2>
  );
}
