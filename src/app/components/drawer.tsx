import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { ShoppingCart } from '@mui/icons-material';
import { Opcao } from '@/lib/types/opcao';
import { Carrinho } from '@/lib/types/carrinho';
import { Pedido } from '@/lib/types/pedido';
import { ButtonGroup } from '@mui/material';

const drawerBleeding = 56;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  handleDrawerToggle: () => void;
  carrinho: Carrinho | undefined;
  setCarrinho: (Carrinho: Carrinho) => void;
  anchor: 'left' | 'top' | 'right' | 'bottom';
}

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: grey[100],
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.background.default,
  }),
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[800],
  }),
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[900],
  }),
}));

export default function SwipeableEdgeDrawer(props: Props) {
    const { window } = props;
    const [open, setOpen] = React.useState(false);
    const [carrinho, setCarrinho] = React.useState<Carrinho | undefined>(props.carrinho);
    const [pedidos, setPedidos] = React.useState<Pedido[] | undefined>(props.carrinho?.pedidos);

    React.useEffect(() => {
    }, [props.carrinho]);

    if (props.carrinho != carrinho) {
      setCarrinho(props.carrinho);
    }

    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };
  
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    // This is used only for the example
    const container = window !== undefined ? () => window().document.body : undefined;
  
    const diminuiQuantidade = (opcao: Opcao) => {
      let pedidos = carrinho?.pedidos?.map((pedido) => {
        if (pedido.quantidade === 1) {
          if (!confirm("Tem certeza que deseja excluir?")) {
            return pedido;
          } 
        }
        if (pedido.opcao.id === opcao.id) {
          pedido.quantidade -= 1;
        }
        return pedido;
      });

      pedidos = pedidos?.filter((pedido) => pedido.quantidade > 0);

      if (carrinho != undefined) {
        if (carrinho.pedidos != undefined) {
          let carrinho2 = {...carrinho};
          // @ts-ignore
          carrinho.pedidos = pedidos;
          setCarrinho(carrinho2);
          props.setCarrinho(carrinho);
        }
      }
    }

    const aumentaQuantidade = (opcao: Opcao) => {
      let pedidos = carrinho?.pedidos?.map((pedido) => {
        if (pedido.opcao.id === opcao.id) {
          pedido.quantidade += 1;
        }
        return pedido;
      });

      if (carrinho != undefined) {
        if (carrinho.pedidos != undefined) {
          let carrinho2 = {...carrinho};
          // @ts-ignore
          carrinho.pedidos = pedidos;
          setCarrinho(carrinho2);
          props.setCarrinho(carrinho);
        }
      }
    }

    return (
      <Root>
        <CssBaseline />
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: 'visible',
            },
          }}
        />
        <Button variant="contained" onClick={toggleDrawer(true)} style={{borderRadius: 0, zIndex: 50, position: 'fixed', left: 0, right: 0, bottom: 0}}>
          Carrinho
          <ShoppingCart />
        </Button>
        <SwipeableDrawer
          disableBackdropTransition={!iOS} disableDiscovery={iOS}
          container={container}
          anchor={props.anchor}
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={true}
          ModalProps={{
            keepMounted: false,
          }}
        >
          <StyledBox
            sx={{
              backgroundColor: "primary.main",
              position: 'absolute',
              textAlign: 'center',
              top: -drawerBleeding - 5,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: 'visible',
              right: '0%',
              left: '0%',
            }}
          >
            <Puller />
            <Typography variant="h6" sx={{ p: 2, color: 'white' }}>Carrinho</Typography>
          </StyledBox>
          <StyledBox sx={{ px: 2, pb: 2, pt: 2, height: '100%', overflow: 'auto' }}>
            <table style={{width: "100%", height: "100%"}}>
              <tbody>
                  {
                    (carrinho != undefined && carrinho.pedidos.length>0) ? 
                    carrinho?.pedidos.map((item:Pedido, index) => (
                      <tr key={index}>
                        <td style={{paddingRight: 10}}>
                          {item.opcao.nome}
                          <hr></hr>
                          R$ {item.opcao.preco}
                        </td>
                        <td style={{width: "10%"}}>
                          <label>Quant.</label><br></br>
                          <label>{item.quantidade}</label><br></br>
                          <ButtonGroup variant="contained" sx={{width: "100%"}} aria-label="Basic button group">
                            <Button sx={{width:"50%"}} onClick={() => diminuiQuantidade(item.opcao)}>-</Button>
                            <Button sx={{width:"50%"}} onClick={() => aumentaQuantidade(item.opcao)}>+</Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))
                    :
                    <tr>
                      <td>
                        <label>Sem produtos</label>
                      </td>
                    </tr>
                  }
              </tbody>
            </table>
          </StyledBox>
          <StyledBox>
            <Button variant="contained" style={{borderRadius: 0, zIndex: 50, position: 'fixed', left: 0, right: 0, bottom: 0}}>
              Finalizar
            </Button>
          </StyledBox>
        </SwipeableDrawer>
      </Root>
    );
  }