"use client";

import Image from "next/image";	
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Grid, Grid2, Modal, Paper, Tab, Table, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { getEstabelecimentos, getOpcoesByEstabelecimento } from '../api/estabelecimentos';
import { Estabelecimento } from '@/lib/types/estabelecimentos';
import FormOpcao from "./components/FormOpcao";
import { Opcao } from "@/lib/types/opcao";

export default function AdminDashboard() {
    const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);
    const [opcoes, setOpcoes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const [selectedOption, setSelectedOption] = useState<any>(null);

    const handleEditOption = (option: any) => {
        setSelectedOption(option);
        handleOpen();
    };

    useEffect(() => {
        getEstabelecimentos().then((data:any) => {
            setEstabelecimentos(data);

            estabelecimentos.map((estabelecimento:Estabelecimento) => {
                const opcoes:Opcao[] = getOpcoesByEstabelecimento(estabelecimento.id);
                estabelecimento.opcoes = opcoes;
            });
        });
    }, []);

    return (
        <Grid2 container size={12} padding={0}>
            <Typography variant="h6">Admin Dashboard</Typography>
            <Grid2 container size={12} spacing={2}>
                <Card>
                    <CardContent>    
                        <Typography variant="h3">Estabelecimentos</Typography>
                        {
                            (estabelecimentos.length > 0) ?
                                estabelecimentos.map((estabelecimento, i) => {
                                    return (
                                        <Grid2 size={12} marginBottom={2} key={i}>
                                            <Accordion>
                                                <AccordionSummary>
                                                    <Typography variant="h6">{estabelecimento.nome}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    {
                                                        (estabelecimento.opcoes) ?
                                                            estabelecimento.opcoes.map((opcao, j) => {
                                                                return (
                                                                    <Grid2 container size={12} key={j}>
                                                                        <Grid2 size={8}>
                                                                            <Typography variant="h6">{opcao.nome}</Typography>
                                                                        </Grid2>
                                                                        <Grid2>
                                                                            <Button variant="outlined" color="secondary" onClick={() => handleEditOption(opcao)}>EDITAR</Button>
                                                                        </Grid2>
                                                                    </Grid2>
                                                                );
                                                            })
                                                        :
                                                            <p>Loading...</p>
                                                    }
                                                    <Button variant="contained">ADICIONAR OPÇÃO</Button>
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
                <FormOpcao opcao={selectedOption} />
            </Modal>
        </Grid2>
    );
};