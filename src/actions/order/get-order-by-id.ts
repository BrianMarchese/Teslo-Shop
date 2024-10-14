'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma";

export const getOrderById = async( id: string ) => {
  const session = await auth();

  if ( !session?.user ) {
    return {
        ok: false, 
        message: "Debe estar autenticado"
    }
  }
    
  try {
    
    const order = await prisma.order.findUnique({ // me traigo toda la info del producto para mostrarla
        where: { id }, // el id va a ser igual al id que recibo
        include: {
           OrderAddress: true,
           OrderItem: {
            select: {
                price: true,
                quantity: true,
                size: true,

                product: {
                    select: {
                        title: true,
                        slug: true,

                        ProductImage: {
                            select: {
                                url: true
                            },
                            take: 1
                        }
                    }

                }
            }
           }
        }
    })

    if ( !order ) throw `${ id } no existe`

    if ( session.user.role === 'user' ) {
        if ( session.user.id !== order.userId ) {
            throw `${id} no es de ese usuario`
        }
    }

    return {
        ok: true,
        order: order
    }

  } catch (error) {
    console.log(error)

    return {
        ok: false,
        message: 'Orden no existe'
    }
  }

}

export default getOrderById