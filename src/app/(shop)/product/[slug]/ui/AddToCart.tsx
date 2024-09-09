'use client'

import { QuantitySelector, SizeSelector } from "@/components"
import { CartProduct, Product, Size } from "@/interfaces"
import { useCartStore } from "@/store"
import { useState } from "react"

interface Props {
    product: Product
}

export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore( state => state.addProductToCart )

    const [size, setSize] = useState<Size | undefined>()
    const [quantity, setQuantity] = useState<number>(1)
    const [posted, setPosted] = useState(false)

    const addToCart = () => {
        setPosted(true)

        if (!size) return

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0]
        }

        addProductToCart(cartProduct)

        setPosted(false) // luego de que se agrega el producto seteo el formulario
        setQuantity(1)
        setSize(undefined)
    }

    return (
        <>

            {
                posted && !size && (
                    <span className="mt-2 text-red-500">
                        Debes seleccionar un talle*
                    </span>
                )
            }
    

            {/* selector de talles */}
            <SizeSelector selectedSize={ size } avaibleSizes={ product.sizes } onSizeChange={ (size) => setSize(size) } />

            {/* selector de cantidad */}
            <QuantitySelector quantity={ quantity } onQuantityChange={ setQuantity }/>

            <button onClick={ addToCart } className="btn-primary my-5">Agregar al carrito</button>
        </>
    )
}