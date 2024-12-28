"use client";

import Image from "next/image";	
import { Accordion, AccordionDetails, AccordionSummary, Alert, AppBar, Box, Button, Card, CardContent, Grid, Grid2, Modal, Paper, Snackbar, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { getEstabelecimentos, getOpcoesByEstabelecimento } from '../api/estabelecimentos';
import { Estabelecimento } from '@/lib/types/estabelecimentos';
import FormOpcao from "./components/FormOpcao";
import FormEstabelecimento from "./components/FormEstabelecimento";
import { Opcao } from "../../lib/types/opcao";
import { deleteOpcao } from "../api/opcoes";
import { deleteEstabelecimento } from "../api/estabelecimentos";
import { SnackBarAlerta } from "@/lib/types/utils";

function SnackBarAviso(snackBar:SnackBarAlerta | undefined) {
    switch (snackBar?.tipo) {
        case 1:
            return (
                <Box
                    sx={{
                        width: '100%',
                        '& > * + *': {
                            marginTop: 2,
                        },
                    }}
                >
                    <Snackbar color="red" open={true} autoHideDuration={6000}>
                        {
                            (snackBar?.severity === "success") ?
                                <Alert severity="success">{snackBar?.retorno}</Alert>
                            :
                                <Alert severity="error">{snackBar?.retorno}</Alert>
                        }
                    </Snackbar>
                </Box>
            );
        default:
            return null;
    }
}

export default function AdminDashboard() {
    const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);
    const [opcoes, setOpcoes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [snackBar, setSnackBar] = useState<SnackBarAlerta | undefined>();

    const [selectedOption, setSelectedOption] = useState<any>(null);

    const handleEditOption = (option: Opcao, estabelecimento: Estabelecimento) => {
        option.estabelecimento = 1;
        option.categoria = 1;
        const opcao = new Opcao(
            option.id,
            option.nome,
            (option.descricao) ? option.descricao : '',
            option.preco,
            option.foto,
            option.estabelecimento,
            option.categoria
        )
        setSelectedOption(opcao);
        handleOpen();
    };

    const handleEditEstabelecimento = (estabelecimento: Estabelecimento) => {
        const estab = new Estabelecimento(
            estabelecimento.id,
            estabelecimento.nome,
            estabelecimento.endereco,
            estabelecimento.telefone,
            estabelecimento.cnpj,
            estabelecimento.tagnome,
            estabelecimento.email,
            (estabelecimento.horarioFuncionamento) ? estabelecimento.horarioFuncionamento : '',
            (estabelecimento.categoria) ? estabelecimento.categoria : '',
            (estabelecimento.descricao) ? estabelecimento.descricao : '',
            (estabelecimento.foto) ? estabelecimento.foto : '',
            (estabelecimento.website) ? estabelecimento.website : '',
            (estabelecimento.opcoes) ? estabelecimento.opcoes : []
        );
        setSelectedOption(estab);
        handleOpen();
    }

    const handleAddEstabelecimento = () => {
        setSelectedOption(new Estabelecimento(
            0,
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            []
        ));
        handleOpen();
    }

    const handleAddOption = () => {
        setSelectedOption(new Opcao(
            0,
            '',
            '',
            '',
            '',
            1,
        ));
        handleOpen();
    }

    const deletarOpcao = async (id: number) => {
        const response = await deleteOpcao(id);
        if (response.status === 204) {
            setSnackBar({
                tipo: 1,
                retorno: "Opção excluída com sucesso",
                severity: "success"
            });
    
            setTimeout(() => {
                setSnackBar({
                    tipo: 0,
                    retorno: "",
                    severity: ""
                });
            }, 6000);
        } else {
            setSnackBar({
                tipo: 1,
                retorno: "Erro ao excluir opção",
                severity: "error"
            });
    
            setTimeout(() => {
                setSnackBar({
                    tipo: 0,
                    retorno: "",
                    severity: ""
                });
            }, 6000);
        }
        fetch();
    }

    const deletarEstabelecimento = async (id: number) => {
        const response = await deleteEstabelecimento(id);
        if (response.status === 204) {
            setSnackBar({
                tipo: 1,
                retorno: "Estabelecimento excluído com sucesso",
                severity: "success"
            });
    
            setTimeout(() => {
                setSnackBar({
                    tipo: 0,
                    retorno: "",
                    severity: ""
                });
            }, 6000);
        } else {
            setSnackBar({
                tipo: 1,
                retorno: "Erro ao excluir estabelecimento",
                severity: "error"
            });
    
            setTimeout(() => {
                setSnackBar({
                    tipo: 0,
                    retorno: "",
                    severity: ""
                });
            }, 6000);
        }
        fetch();
    }

    async function fetch() {
        getEstabelecimentos().then((data:any) => {
            setEstabelecimentos(data);
            estabelecimentos.map( async (estabelecimento:Estabelecimento) => {
                const opcoes:Opcao[] = await getOpcoesByEstabelecimento(estabelecimento.id);
                estabelecimento.opcoes = opcoes;
            });
        });
    }
    
    useEffect(() => {
        fetch();
    }, []);

    const handleClose = () => {
        setOpen(false);
        fetch();
    }

    return (
        <Grid2 container size={12} padding={0}>
            <AppBar position="static">
                <Grid2 container size={12} padding={1}>
                    <Grid2 textAlign={'center'} size={12}>
                        <Typography variant="h6">Admin Dashboard</Typography>
                    </Grid2>
                </Grid2>
            </AppBar>
            <Grid2 container size={12} spacing={2} marginTop={2}>
                <Card style={{width: "100%"}}>
                    <CardContent>    
                        <Typography variant="h3">Estabelecimentos</Typography>
                        {
                            (estabelecimentos.length > 0) ?
                                estabelecimentos.map((estabelecimento, i) => {
                                    return (
                                        <Grid2 size={12} marginBottom={2} key={i}>
                                            <Accordion>
                                                <Grid2 container size={12}>
                                                    <Grid2 size={8}>
                                                        <AccordionSummary>
                                                            <Grid2 container size={12}>
                                                                <Grid2 size={9}>
                                                                    <Typography variant="h6">{estabelecimento.nome}</Typography>
                                                                </Grid2>
                                                            </Grid2>
                                                        </AccordionSummary>
                                                    </Grid2>
                                                    <Grid2 size={4}>
                                                        <table style={{width: "100%", height: "100%"}}>
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{textAlign: "center"}}>
                                                                        <Button variant="contained" onClick={() => handleEditEstabelecimento(estabelecimento)}>EDITAR</Button>
                                                                    </td>
                                                                    <td style={{textAlign: "center"}}>
                                                                        <Button variant="contained" color="error" onClick={() => { deletarEstabelecimento(estabelecimento.id) }}>EXCLUIR</Button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </Grid2>
                                                </Grid2>
                                                <AccordionDetails>
                                                    <TableContainer component={Paper}>
                                                        <Table>
                                                            <TableHead >
                                                                <TableRow>
                                                                    <TableCell>Nome</TableCell>
                                                                    <TableCell>Descrição</TableCell>
                                                                    <TableCell>Preço</TableCell>
                                                                    <TableCell>Editar</TableCell>
                                                                    <TableCell>Excluir</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {
                                                                (estabelecimento.opcoes) ?
                                                                    estabelecimento.opcoes.map((opcao, j) => {
                                                                        return (
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    <Typography variant="h6">{opcao.nome}</Typography>
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <Typography variant="h6">{opcao.descricao}</Typography>
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <Typography variant="h6">
                                                                                        R$ {opcao.preco.toLocaleString()}
                                                                                    </Typography>
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <Button variant="contained" color="secondary" onClick={() => handleEditOption(opcao, estabelecimento)}>EDITAR</Button>
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <Button variant="contained" color="error" onClick={() => deletarOpcao(opcao.id)}>EXCLUIR</Button>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        );
                                                                    })
                                                                    :
                                                                    <TableRow>
                                                                        <TableCell>
                                                                            <Typography variant="h6">Loading...</Typography>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                }
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                    <Grid2 size={12} padding={1}>
                                                        <Button variant="contained" onClick={() => handleAddOption()}>ADICIONAR OPÇÃO</Button>
                                                    </Grid2>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Grid2>
                                    );
                                }
                                )
                            :
                                <p>Loading...</p>
                        }
                        <Grid2 size={12}>
                            <Button variant="contained" onClick={() => handleAddEstabelecimento()}>NOVO</Button>
                        </Grid2>
                    </CardContent>
                </Card>
            </Grid2>
            {/* <Grid2 container size={12} spacing={2} marginTop={2}>
                <Card style={{width: "100%"}}>
                    <CardContent>
                        <Typography variant="h3">Categorias</Typography>
                        <Grid2 size={12}>
                            <Button variant="contained">NOVO</Button>
                        </Grid2>
                    </CardContent>
                </Card>
            </Grid2> */}
            {
                (snackBar?.tipo != 0) 
                ? 
                SnackBarAviso(snackBar)
                :
                null
            }
            <Modal
                open={open && (selectedOption instanceof Opcao)}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <FormOpcao opcao={selectedOption} close={handleClose}/>
            </Modal>

            <Modal 
                open={open && (selectedOption instanceof Estabelecimento)}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <FormEstabelecimento estabelecimento={selectedOption} close={handleClose}/>
            </Modal>
        </Grid2>
    );
};