import { Box, Typography, Grid2, TextField, Button } from "@mui/material";
import { forwardRef, useState } from "react";
import Image from 'next/image';
import { Opcao } from "@/lib/types/opcao";

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
    opcao: Opcao
}

const FormOpcao = forwardRef((props:Props, ref:any) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    return (<Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
        Editar Opção
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Edite os detalhes da opção abaixo.
    </Typography>
    <TextField
        id="outlined-basic"
        label="Nome"
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        defaultValue={props.opcao.nome}
        onInput={(e:any) => props.opcao.nome = e.target.value}
    />
    <TextField
        id="outlined-basic"
        label="Descrição"
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        defaultValue={props.opcao.descricao}
        onInput={(e:any) => props.opcao.descricao = e.target.value}
    />
    <TextField
        id="outlined-basic"
        label="Preço"
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        defaultValue={props.opcao.preco}
        onChange={(e:any) => props.opcao.preco = e.target.value}
    />
    <TextField
        id="outlined-basic"
        label="Foto"
        variant="outlined"
        fullWidth
        margin="normal"
        size="small"
        defaultValue={props.opcao.foto}
        onChange={(e:any) => props.opcao.foto = e.target.value}
    />
    <Image src={props.opcao.foto || ""} loader={({src}) => src} width={200} height={200} alt={""} />
    <Button onClick={() => console.log(props.opcao)} variant="contained" color="primary">SALVAR</Button>
</Box>);
});

export default FormOpcao;