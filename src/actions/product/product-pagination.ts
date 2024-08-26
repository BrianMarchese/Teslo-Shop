'use server'

import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client"



interface PaginationOptions {
    page?: number
    take?: number
    gender?: Gender
}

export const getPaginatedProductsWithImages = async({ 
    page = 1,
    take = 12,
    gender
 }: PaginationOptions) => {

    if( isNaN( Number(page) ) ) {
        page = 1
    }
    if( page < 1 ) {
        page = 1
    }

    try {
        // obtengo los productos
        const products = await prisma.product.findMany({
            take: take,
            skip: ( page -1 ) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            },
            // filtrado por genero
            where: {
                gender: gender
            }
        })
        
        // obtengo el total de paginas

        const totalCount = await prisma.product.count({
            where: {
                gender: gender
            }
        }) //cuento cuantos productos tengo
        const totalPages = Math.ceil( totalCount / take )// hago el calculo para saber cuantas paginas voy a tener

        return{
            currentPage: page,
            totalPages: totalPages,
            products: products.map( product => ({
                ...product,
                images: product.ProductImage.map( image => image.url )
            }))
        }
    } catch (error) {
        throw new Error('No se pudieron cargar los productos')
    }

}