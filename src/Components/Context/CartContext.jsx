import axios from 'axios';
import React, { createContext, useState } from 'react'
import toast from 'react-hot-toast';




export const CartContext = createContext()
export default function CartContextProvider({children}) {
   const [numOfCartItems,setNumOfCartItems] =  useState()
   const [allCartItems,setAllCartItems] = useState([])
   const [totalPrice,setoTalPricet] = useState()
   const [cartId,setCartId] = useState()
   async function addToCart(productId){
    try{
        const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId},{
            headers:{
                token:localStorage.getItem('token')
            }
           })
           console.log(res);
           if(res.data.status =='success'){
            toast.success('Product has been added successfully!')
           }
           setNumOfCartItems(res.data.numOfCartItems)
    }catch(err){
        console.log(err,'error');
        toast.error('something went wrong ..')
    }
    }

   async function getCartItems(){
        try{
          const res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
                headers:{
                    token:localStorage.getItem('token')
                }
            })
        console.log(res);
        if(res.data.status == 'success'){
            setAllCartItems(res.data.data.products)
            setoTalPricet(res.data.data.totalCartPrice)
            setCartId(res.data.cartId)

        }
        
        }catch(err){
            console.log(err, 'errrrr');   
        }
        
        


    }
    async function updateItemCount(id,count){
        try{
            const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{
                headers:{
                    token:localStorage.getItem('token')
                }
            })
            console.log(res);
            if(res.data.status == 'success'){
                setAllCartItems(res.data.data.products)
                setoTalPricet(res.data.data.totalCartPrice)
                setNumOfCartItems(res.data.numOfCartItems)


            } 
        }catch(err){
            console.log(err,'errrr');
            
        }
     
    }

   async function deleteCartItem(id){
    try{
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            headers:{
                token:localStorage.getItem('token')
            }
        })
        console.log(res);
        if(res.data.status == 'success'){
            setAllCartItems(res.data.data.products)
            setoTalPricet(res.data.data.totalCartPrice)
            setNumOfCartItems(res.data.numOfCartItems)
        }
    }catch(err){
        console.log(err,'errrr');
        
    }
    
        
    }
  return <CartContext.Provider value={{addToCart,numOfCartItems,getCartItems,allCartItems,updateItemCount,setNumOfCartItems,totalPrice,deleteCartItem,cartId}}>{children}</CartContext.Provider>
}
