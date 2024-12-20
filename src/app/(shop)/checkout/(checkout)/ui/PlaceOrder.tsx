'use client'

import { placeOrder } from "@/actions"
import { useAddressStore, useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const PlaceOrder = () => {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const address = useAddressStore( state => state.address )

  const { subTotal, impuestos, total, itemsInCart } = useCartStore( state => state.getSummaryInformation() )
  const cart = useCartStore(state => state.cart)
  const clearCart = useCartStore(state => state.clearCart)


  useEffect(() => { // para evitar problema de la rehidratacion
    setLoaded(true)
  }, [])


  const onPlaceOrder = async() => { // habilitar y deshabilitar el boton de orden para que no se dupliquen las ordenes y mando info en la funcion
    setIsPlacingOrder(true)
    
    const productsToOrder = cart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }))


    // server action
    const resp = await placeOrder( productsToOrder, address )
    if ( !resp.ok ) {
      setIsPlacingOrder(false)
      setErrorMessage( resp.message )
      return
    }

    // si viene acà salio todo bien
    clearCart()
    router.replace("/orders/" + resp.order?.id)
  }
  
  if (!loaded) {
    return <p>Cargando...</p>
  }


  return (
    <div className="bg-white rounded-xl shadow-xl p-7">

        <h2 className="text-2xl mb-2">Dirección de entrega</h2>
        <div className="mb-10">
            <p className="text-xl">{ address.firstName } { address.lastName }</p>
            <p>{ address.address }</p>
            <p>{ address.address2 }</p>
            <p>{ address.postalCode }</p>
            <p>{ address.city }, { address.country }</p>
            <p>{ address.phone }</p> 
        </div>

        {/* divisor */}
        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

        <h2 className="text-2xl mb-2">Resumen de orden</h2>

        <div className="grid grid-cols-2">
            <span>No. Productos</span>
            <span className="text-right">{ itemsInCart === 1 ? "1 artículo" : `${ itemsInCart } artículos`  }</span>

            <span>Subtotal</span>
            <span className="text-right">{ currencyFormat( subTotal ) }</span>

            <span>Impuestos (%21)</span>
            <span className="text-right">{ currencyFormat( impuestos ) }</span>

            <span className="text-2xl mt-5">Total:</span>
            <span className="text-2xl mt-5 text-right">{ currencyFormat( total ) }</span>
        </div>

        <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
            <span className="text-xs">
            Al hacer click en &quot;Hacer orden&quot;, aceptas nuestros <a href="" className="underline">términos y condiciones</a> y <a href="" className="underline">política de privacidad</a>
            </span>
        </p>

        <p className="text-red-500">{ errorMessage }</p>

        <button 
        //href="/orders/123"
        onClick={ onPlaceOrder }
        className={ clsx({
          'btn-primary': !isPlacingOrder,
          'btn-disabled': isPlacingOrder
          })}>
          Hacer orden
        </button>
        </div>

  </div>
  )
}

export default PlaceOrder