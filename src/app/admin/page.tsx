"use client";

import Image from "next/image";	
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, Card, CardContent, Grid, Grid2, Modal, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { getEstabelecimentos, getOpcoesByEstabelecimento } from '../api/estabelecimentos';
import { Estabelecimento } from '@/lib/types/estabelecimentos';
import FormOpcao from "./components/FormOpcao";
import { Opcao } from "../../lib/types/opcao";

export default function AdminDashboard() {
    const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);
    const [opcoes, setOpcoes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    
    const [selectedOption, setSelectedOption] = useState<any>(null);

    const handleEditOption = (option: Opcao, estabelecimento: Estabelecimento) => {
        option.estabelecimento = 1;
        option.categoria = 1;
        setSelectedOption(option);
        handleOpen();
    };

    const handleAddOption = () => {
        const newOption = {
            id: null,
            nome: '',
            descricao: '',
            preco: 0,
            estabelecimento: null
        };
        setSelectedOption(newOption);
        handleOpen();
    }

    async function fetch() {
        getEstabelecimentos().then((data:any) => {
            setEstabelecimentos(data);
            console.log(estabelecimentos);
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
                                                <AccordionSummary>
                                                    <Grid2 container size={12}>
                                                        <Grid2 size={9}>
                                                            <Typography variant="h6">{estabelecimento.nome}</Typography>
                                                        </Grid2>
                                                        <Grid2 size={3}>
                                                            <Button variant="contained">EDITAR</Button>
                                                        </Grid2>
                                                    </Grid2>
                                                </AccordionSummary>
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
                                                                                    <Button variant="contained" color="error" onClick={() => handleEditOption(opcao, estabelecimento)}>EXCLUIR</Button>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        );
                                                                    })
                                                                    :
                                                                    <p>Loading...</p>
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
                            <Button variant="contained">NOVO</Button>
                        </Grid2>
                    </CardContent>
                </Card>
            </Grid2>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <FormOpcao opcao={selectedOption} close={handleClose}/>
            </Modal>
        </Grid2>
    );
};