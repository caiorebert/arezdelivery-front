import { Box, Typography, Grid2, TextField, Button, CircularProgress, Alert, IconButton, Collapse } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import Image from 'next/image';
import { Opcao } from "../../../lib/types/opcao";
import { createOpcao, deleteOpcao, updateOpcao } from "../../api/opcoes";
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    color: 'black',
    p: 4,
  };

interface Props {
    opcao: Opcao,
    close: () => void
}

const CustomTextField = ({ label, field, value, onchange }: { label: string; field: keyof Opcao; value: any, onchange: any }) => (
    <TextField
        label={label}
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        value={value}
        onChange={(e) => onchange(field, e.target.value)}
    />
);

const AlertRetorno = ({retorno, severity, handle}:{retorno:string; severity: string, handle:any}) => {
    switch (severity) {
        case "success":
            return <Alert
                action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                    handle(false);
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
                }
                sx={{ mb: 2 }}
            >
                Alterado com sucesso!
            </Alert>;
        case "error":
            return <Alert
                action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                    handle(false);
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
                }
                sx={{ mb: 2 }}
            >
                Alterado com sucesso!
            </Alert>;
        default:
            return <Alert severity="info">Erro desconhecido</Alert>;
    }
}

const FormOpcao = forwardRef((props:Props, ref:any) => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState<Opcao>(props.opcao);
    const [showAlert, setShowAlert] = useState(false);
    const [severityAlert, setSeverityAlert] = useState("info");
    
    const handleChange = (field: keyof Opcao, value: any) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    async function save(opcao:Opcao) {
        let response = null;
        setLoading(true);
        if (opcao.id === null) {
            response = await createOpcao(opcao);
        } else {
            response = await updateOpcao(opcao.id.toString(), opcao);
        }
        setTimeout(() => {
            setLoading(false);
            setSeverityAlert((response.statusCode==200) ? "success" : "error");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }, 1000);
    }

    return (<Box sx={style}>
        <Grid2 container size={12} textAlign={'center'}>
            <Grid2 size={9}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Editar Opção
                </Typography>
            </Grid2>
            <Grid2 size={3}>
                <Button onClick={props.close} variant="contained" color="secondary" sx={{ mb: 2 }}>
                    Fechar
                </Button>
            </Grid2>
        </Grid2>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Edite os detalhes da opção abaixo.
    </Typography>
    
    <CustomTextField label="Nome" field="nome" value={formValues["nome"]} onchange={handleChange}/>
    <CustomTextField label="Descrição" field="descricao" value={formValues["descricao"]}  onchange={handleChange}/>
    <CustomTextField label="Preço" field="preco" value={formValues["preco"]}  onchange={handleChange}/>
    <CustomTextField label="Foto" field="foto" value={formValues["foto"]}  onchange={handleChange}/>
    <Grid2 container size={12} textAlign={'center'}>
        <Grid2 size={12}>
            <Typography variant="h6" component="h2">Thumb Foto</Typography>
        </Grid2>
        <Grid2 size={12}>
            {
                (formValues.foto == "" || formValues.foto == null) ?
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt3sPWjr5DgU2hzlm6MmFQhnck5YKjhmE6vQ&s" loader={({src}) => src} width={200} height={200} alt={""} />
                :
                <Image src={formValues.foto || ""} loader={({src}) => src} width={200} height={200} alt={""} />
            }
        </Grid2>
    </Grid2>
    {
        (loading) ?
        <CircularProgress />
        :
        <Button onClick={() => save(formValues)} variant="contained" color="primary">SALVAR</Button>
    }
    <Collapse in={showAlert}>
        <AlertRetorno retorno="Alterado com sucesso!" severity="success" handle={setShowAlert}/>
    </Collapse>
</Box>);
});

export default FormOpcao;