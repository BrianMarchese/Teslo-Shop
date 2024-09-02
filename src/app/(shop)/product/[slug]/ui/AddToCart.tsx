'use client'

import { QuantitySelector, SizeSelector } from "@/components"
import { Product, Size } from "@/interfaces"
import { useState } from "react"

interface Props {
    product: Product
}

export const AddToCart = ({ product }: Props) => {

    const [size, setSize] = useState<Size | undefined>()
    const [quantity, setQuantity] = useState<number>(1)

    return (
        <>
            {/* selector de talles */}
            <SizeSelector selectedSize={ size } avaibleSizes={ product.sizes } onSizeChange={ (size) => setSize(size) } />

            {/* selector de cantidad */}
            <QuantitySelector quantity={ quantity } onQuantityChange={ setQuantity }/>

            <button className="btn-primary my-5">Agregar al carrito</button>
        </>
    )
}