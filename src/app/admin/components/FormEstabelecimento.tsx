import { Box, Typography, Grid2, TextField, Button, CircularProgress, Alert, IconButton, Collapse } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import Image from 'next/image';
import { Opcao } from "../../../lib/types/opcao";
import { createOpcao, deleteOpcao, updateOpcao } from "../../api/opcoes";
import { createEstabelecimento, updateEstabelecimento } from "../../api/estabelecimentos";
import CloseIcon from '@mui/icons-material/Close';
import { Estabelecimento } from "@/lib/types/estabelecimentos";

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
    estabelecimento: Estabelecimento,
    close: () => void
}

const CustomTextField = ({ label, field, value, onchange }: { label: string; field: keyof Estabelecimento; value: any, onchange: any }) => (
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
                {retorno}
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
                {retorno}
            </Alert>;
        default:
            return <Alert severity="info">Erro desconhecido</Alert>;
    }
}

const FormEstabelecimento = forwardRef((props:Props, ref:any) => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState<Estabelecimento>(props.estabelecimento);
    const [showAlert, setShowAlert] = useState(false);
    const [severityAlert, setSeverityAlert] = useState("info");
    
    const handleChange = (field: keyof Opcao, value: any) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    async function save(estabelecimento:Estabelecimento) {
        let response = null;
        setLoading(true);
        if (estabelecimento.id === 0) {
            response = await createEstabelecimento(estabelecimento);
        } else {
            response = await updateEstabelecimento(estabelecimento.id.toString(), estabelecimento);
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
                    Editar Estabelecimento
                </Typography>
            </Grid2>
            <Grid2 size={3}>
                <Button onClick={props.close} variant="contained" color="secondary" sx={{ mb: 2 }}>
                    Fechar
                </Button>
            </Grid2>
        </Grid2>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        { formValues.id == 0 ? "Adicione um novo estabelecimento." : "Edite os detalhes do estabelecimento abaixo."}
    </Typography>
    
    <CustomTextField label="Nome" field="nome" value={formValues["nome"]} onchange={handleChange}/>
    <CustomTextField label="Descrição" field="descricao" value={formValues["descricao"]}  onchange={handleChange}/>
    <CustomTextField label="Endereço" field="endereco" value={formValues["endereco"]}  onchange={handleChange}/>
    <CustomTextField label="Telefone" field="telefone" value={formValues["telefone"]}  onchange={handleChange}/>
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
        <AlertRetorno retorno={(formValues.id == 0) ? "Criado com sucesso!" : "Alterado com sucesso!"} severity="success" handle={setShowAlert}/>
    </Collapse>
</Box>);
});

export default FormEstabelecimento;