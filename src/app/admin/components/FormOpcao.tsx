import { Box, Typography, Grid2, TextField, Button, CircularProgress } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import Image from 'next/image';
import { Opcao } from "@/lib/types/opcao";
import { createOpcao, updateOpcao } from "../../api/opcoes";

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


const FormOpcao = forwardRef((props:Props, ref:any) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState<Opcao>(props.opcao);


    const CustomTextField = ({ label, field }: { label: string; field: keyof Opcao }) => (
        <TextField
            label={label}
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            value={formValues[field]}
            onChange={(e) => handleChange(field, e.target.value)}
        />
    );

    const handleChange = (field: keyof Opcao, value: any) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    function save(opcao:Opcao) {
        setLoading(true);
        if (opcao.id === null) {
            createOpcao(opcao);
        } else {
            updateOpcao(opcao.id.toString(), opcao);
        }
        setTimeout(() => {
            setLoading(false);
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
    <CustomTextField label="Nome" field="nome" />
    <CustomTextField label="Descrição" field="descricao" />
    <CustomTextField label="Preço" field="preco" />
    <CustomTextField label="Foto" field="foto" />
    <Grid2 container size={12} textAlign={'center'}>
        <Grid2 size={12}>
            <Typography variant="h6" component="h2">Thumb Foto</Typography>
        </Grid2>
        <Grid2 size={12}>
            <Image src={formValues.foto || ""} loader={({src}) => src} width={200} height={200} alt={""} />
        </Grid2>
    </Grid2>
    {
        (loading) ?
        <CircularProgress />
        :
        <Button onClick={() => save(formValues)} variant="contained" color="primary">SALVAR</Button>
    }
</Box>);
});

export default FormOpcao;