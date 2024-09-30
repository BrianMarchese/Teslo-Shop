'use client'

import { useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import Image from "next/image"
import { useEffect, useState } from "react"

const ProductsInCart = () => {
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
                        <span>
                         { product.size } - { product.title } ({ product.quantity }) 
                        </span>

                        <p className="font-bold">{ currencyFormat( product.price * product.quantity ) }</p>
        
                    </div>
        
                    </div>
        
                ))
            }
        </>
    )
    }

export default ProductsInCart