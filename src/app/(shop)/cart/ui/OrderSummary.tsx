'use client'

import { useEffect, useState } from "react"
import { useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import { redirect } from "next/navigation"

const OrderSummary = () => {
    const [loaded, setLoaded] = useState(false)
    const { subTotal, impuestos, total, itemsInCart } = useCartStore( state => state.getSummaryInformation() )

    useEffect(() => {
        setLoaded(true)
    }, [])

    if(!loaded) {
        return <p>Cargando...</p>
    }

    if(itemsInCart === 0) { // PUEDE FALLAR
        redirect("/empty")
    }

  return (
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
  )
}

export default OrderSummary