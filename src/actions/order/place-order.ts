'use server'

import prisma from "@/lib/prisma"
import { auth } from "@/auth.config"
import { Size, Address } from "@/interfaces"

interface ProductToOrder {
    productId: string
    quantity: number
    size: Size
}



export const placeOrder = async( productIds: ProductToOrder[], address: Address ) => {

    const session = await auth() // obtengo la session
    const userId = session?.user.id

    // verifico la session de usuario
    if (!userId) { // si no hay session de usuario tiro el error y sino lo imprimo
        return {
            ok: false,
            message: "Usuario no autenticado"
        }
    }


    //obtener info de los productos: (acordarse que puedo llevar 2 o mas productos con el mismo ID)
    const products = await prisma.product.findMany({ // busco todos los productos de mi DB que tengan el mismo id con el de mi carrito
        where: {
            id: {
              in: productIds.map( p => p.productId )
            }
        }
    })

    // calcular montos
    const itemsInOrder = productIds.reduce( ( count, p ) => count + p.quantity, 0 )
    
    // calcular el total (impuestos, subTotal y total)
    const { subTotal, impuestos, total } = productIds.reduce( (totals, item) => {

        const productQuantity = item.quantity
        const product = products.find( product => product.id === item.productId )

        if ( !product ) throw new Error(`${ item.productId } no existe - 500`)
        
        const subTotal = product.price * productQuantity

        totals.subTotal += subTotal
        totals.impuestos += subTotal * 0.21
        totals.total += subTotal * 1.21
        
        return totals
    }, { subTotal: 0, impuestos: 0, total: 0 })


    // crear transaccion en base de datos
    try {
        const prismaTx = await prisma.$transaction( async(tx) =>{

            // 1- Actualizar el stock de los productos
            const updatedProductsPromises = products.map( ( product ) => {
    
                //acumulacion de  valores (agarro los valores de los distintos items dependiendo de si es el mismo con otro talle)
                const productQuantity = productIds.filter( 
                    p => p.productId === product.id
                ).reduce( ( acc, item ) => item.quantity + acc, 0 )
    
                if ( productQuantity === 0 ) {
                    throw new Error(`${ product.id } no tiene una cantidad definida`)
                }
    
                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                })
            })
    
            const updatedProducts = await Promise.all( updatedProductsPromises )
            // verifico valores negativos en el stock
            updatedProducts.forEach( product => { // cuando encuentre un producto sin stock se corta el forEach
                if ( product.inStock < 0 ) {
                    throw new Error(`${ product.title } no tiene stock suficiente`)
                }
            })
    
            // 2- Crear la orden - Encabezado - Detalles
            const order = await tx.order.create({
                data: { // encabezado
                    userId: userId,
                    itemsInOrder: itemsInOrder, // cantidad de productos
                    subTotal: subTotal,
                    tax: impuestos,
                    total: total,
                    isPaid: false,
    
                    OrderItem: { // detalle
                        createMany: {
                            data: productIds.map( p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find( product => product.id === p.productId )?.price ?? 0
                            }))
                        }
                    }
                }
            })
    
            // 3- Crear la direccion de la orden
            const { country, ...restAddress } = address
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...restAddress,
                    countryId: country,
                    orderId: order.id
        
                }
            })
    
            return {
                order: order,
                updatedProducts: updatedProducts,
                orderAddress: orderAddress
            }
        })

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx,
        }
    } catch (error: any) {
        return {
            ok: false,
            message: error?.message
        }
    }

}