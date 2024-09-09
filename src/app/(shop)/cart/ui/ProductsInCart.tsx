'use client'

import { QuantitySelector } from "@/components"
import { useCartStore } from "@/store"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const ProductsInCart = () => {
    const updateProductQuantity = useCartStore( state => state.updateProductQuantity )
    const removeProduct = useCartStore( state => state.removeProduct )
    const [loaded, setLoaded] = useState(false)
    const productsInCart = useCartStore( state => state.cart ) //obtengo el carrito

    useEffect(() => { // uso esto para evitar el problema de rehidratacion
        setLoaded(true)
    }, [])

    if(!loaded){
        return (
            <div className="animate-pulse flex mb-5">
                {/* Placeholder para la imagen */}
                <div className="mr-5 bg-gray-300 rounded w-24 h-24"></div>

                <div className="flex-1 space-y-3">
                    {/* Placeholder para el título y el tamaño */}
                    <div className="bg-gray-300 rounded h-6 w-3/4"></div>
                    
                    {/* Placeholder para el precio */}
                    <div className="bg-gray-300 rounded h-5 w-1/4"></div>

                    {/* Placeholder para el selector de cantidad */}
                    <div className="bg-gray-300 rounded h-8 w-32"></div>

                    {/* Placeholder para el botón de eliminar */}
                    <div className="bg-gray-300 rounded h-6 w-20 mt-3"></div>
                </div>
            </div>

        )
    }


    return (
        <>
            {
                productsInCart.map( product => (
                    <div key={ `${ product.slug  } - ${ product.size }` } className="flex mb-5">
                    <Image src={`/products/${ product.image }`}
                        className="mr-5 rounded"
                        width={100} 
                        height={100}
                        style={{
                        width: '100px',
                        height: '100px'
                        }}
                        alt={ product.title }
                    /> 
                    <div>
                        <Link href={`/product/${product.slug }`} className="hover:underline">
                        { `${ product.size } - ${ product.title }` }
                        </Link>
                        <p>${ product.price }</p>
                        <QuantitySelector quantity={ product.quantity } onQuantityChange={ (quantity) => updateProductQuantity( product, quantity ) }/>
                        <button onClick={ () => removeProduct( product ) } className="underline mt-3">Remover</button>
        
                    </div>
        
                    </div>
        
                ))
            }
        </>
    )
    }

export default ProductsInCart