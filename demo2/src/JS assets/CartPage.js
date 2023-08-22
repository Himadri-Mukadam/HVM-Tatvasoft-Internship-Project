import * as React from 'react';
import Box from '@mui/material/Box';

import { Button, Card, CardMedia, CardContent, CardActions, Typography } from "@mui/material";
import CartContext from '../services/CartContext';
import { useContext } from 'react';
import { DeleteFromCartService } from '../services/DeleteFromCartService';
import { toast } from 'react-toastify';
import { UserInfo } from './MasterPage';
import { EditCartService } from '../services/EditCartService';
import { commonStyles } from '../CSS assets/commonStyles';
import { PlaceOrderService } from '../services/PlaceOrderService';
import { useNavigate } from 'react-router-dom';


export const CartPage = () => {

  //constant declarations------------------------------------------------------------
  const userCreds = useContext(UserInfo);
  const cartDetails = useContext(CartContext);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const useStyles = commonStyles();
  const navigate = useNavigate();

  //--------------------------------------------------------------------------------
  React.useEffect(() => {
    calcPrice();
  }, [cartDetails])

  //function to handle delete operation
  const handleRemove = async (bId) => {
    await DeleteFromCartService(Number(bId)).then((Response) => {
      toast.success("Item removed from cart", { position: 'bottom-right' });
      cartDetails.updateCart();
      calcPrice();
    }).catch(() => {
      toast.error("Item could not be removed", { position: 'bottom-right' })
    })
  }

  //function to calculate total Price
  const calcPrice = () => {
    var tp = 0;
    cartDetails.cartData.map((val) => {
      tp = tp + (val.quantity * val.book.price);
    });
    setTotalPrice(tp);
  }

  //function to handle Place Order operation
  const handlePlaceOrder = async() => {
    const cartIdArray = [];
    cartDetails.cartData.map((val) => {
      cartIdArray.push(val.id);
    })
    
    const cartid = cartIdArray;
    const payload = {
      userId: userCreds.userId,
      cartIds: cartid
    }

    await PlaceOrderService(payload).then((Response) => {
      if(Response && Response.status === 200){
        toast.success("Order placed successfully", {position: 'bottom-right'});
        cartDetails.emptyCart();
        navigate("/shop");
      }
    }).catch(() => {
      toast.error("Order cant't be placed", {position: 'bottom-right'});
    })
  }

  //function to handle quantity updates
  const handlUpdate = async (cart, inc = false) => {
    const count = cart.quantity;
    const quant = inc ? count + 1 : count - 1;

    if (quant === 0) {
      toast.error("Item cannot be zero", { position: 'bottom-right' })
      return;
    }

    const payload = {
      id: cart.id,
      bookId: cart.book.id,
      userId: userCreds.userId,
      quantity: quant
    }

    await EditCartService(payload).then((Response) => {
      if (Response && Response.status === 200) {
        cartDetails.updateCart();
        calcPrice();
        toast.success("Cart edited", { position: 'bottom-right' })
      }
    }).catch(() => {
      toast.error("Cart not edited", { position: 'bottom-right' })
    })
  }


  //----------Returnig Component------------------------------------------------
  return (
    <div className={useStyles.page_wrapper} >
      <div className="page">

        {/* -----------this is for search bar ------------------------------------------- */}

        <div style={{
          marginTop: '5%',
        }}>
          <Typography variant='h2' className='heading2'
            style={{
              marginLeft: '40%',
              color: 'rgb(249, 97, 103)'
            }}
          >
            Cart Page
          </Typography>

        </div>

        {/* -------------this is for total, filter and sort -----------------------------------------*/}
        <div className="loginWrapper" style={{
          width: '92%',
          display: 'flex',
          //alignItems: 'center',
          height: '10%',
          marginLeft: '1.5%',
          marginTop: '1.5%'
        }} >
          <Typography variant="h5" style={{ width: '100%' }}>
            <p style={{
              float: 'left',
              marginTop: '5px',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              Total Items: {cartDetails.cartData.length} Items
            </p>

            <p style={{
              float: 'right',
              marginTop: '5px',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              Total Price: &#8377; {totalPrice}
            </p>
          </Typography>

        </div>

        {/* -----------this is for grid of Books ------------------------------------------- */}
        <div style={{
          display: 'grid',
          //gridTemplateColumns: 'repeat(5, 2fr)',
          width: '100%',

        }} id='div1'>
          {cartDetails.cartData.map((cart, index) => (
            <Card sx={{
              display: 'flex',
              marginTop: '3%',
              marginLeft: '28%',
              width: '50%'
            }} raised='true' key={index}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={cart.book.base64image}
                alt="Live from space album cover"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    {cart.book.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    Category: {cart.book.category}
                  </Typography>
                  <div>
                    <Typography variant="subtitle1" component="div">
                      Description: {cart.book.description}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                      Price: &#8377; {cart.book.price}
                    </Typography>
                  </div>
                  <CardActions style={{
                    alignSelf: 'flex-end',
                    marginTop: '2%',
                  }}>
                    <Button variant='contained'
                      onClick={() => { handlUpdate(cart) }} style={{
                        marginRight: '1%', width: 'fit-content',
                        minWidth: '5px'
                      }}
                    >  -  </Button>
                    <span> {cart.quantity} </span>
                    <Button variant='contained'
                      onClick={() => { handlUpdate(cart, true) }}
                      style={{
                        width: 'fit-content',
                        minWidth: '5px'
                      }}
                    >  +  </Button>

                    <Button variant='contained'
                      onClick={() => { handleRemove(cart.id) }}
                      style={{
                        width: 'fit-content',
                        minWidth: '5px',
                        marginLeft: '50%'
                      }}
                    >  Remove  </Button>
                  </CardActions>

                </CardContent>
              </Box>

            </Card>
          ))}

        </div>
        {cartDetails.cartData.length !== 0 && (
          <Button variant='contained' className='button' style={{
            marginTop: '2%',
            marginLeft: '45%'
          }} onClick={() => {handlePlaceOrder()}}>
            Place Order
          </Button>
        )}
      </div >
      
    </div>

  );
}


