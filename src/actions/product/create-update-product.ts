'use server'

import prisma from '@/lib/prisma'
import { Gender, Product, Size } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL ?? "" )

const productSchema = z.object({ // esquema de validacion para pasar todo limpio a la BD
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce
        .number()
        .min(0)
        .transform( val => Number(val.toFixed(2)) ),
    inStock: z.coerce
        .number()
        .min(0)
        .transform( val => Number(val.toFixed(0)) ),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform( val => val.split(',') ),
    tags: z.string(),
    gender: z.nativeEnum(Gender),
})

export const createUpdateProduct = async( formData: FormData ) => {

    const data = Object.fromEntries( formData )
    const productParse = productSchema.safeParse( data )

    if (!productParse.success) {
        console.log( productParse.error )
        return { ok: false }
    }

    const product = productParse.data
    product.slug = product.slug.toLocaleLowerCase().replace(/ /g, '-').trim()

    const { id, ...rest } = product

    try {
        const prismaTx = await prisma.$transaction( async (tx) => {
    
            let product: Product
            const tagsArray = rest.tags.split(',')
    
            if ( id ) {
                // actualizo
                product = await prisma.product.update({
                    where: { id: id },
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[],
                        },
                        tags: {
                            set: tagsArray
                        }
                    }
                })
    
            }else{
                //creo
                product = await prisma.product.create({
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[],
                        },
                        tags: {
                            set: tagsArray
                        }
    
                    }
                })
            }
    
            // proceso de carga y guardado de las img
            if ( formData.getAll('images') ) {
               const images = await uploadImages(formData.getAll('images') as File[]) // url
               if (!images) {
                throw new Error('No se pudo cargar las imagenes')
               }

               await prisma.productImage.createMany({
                data: images.map( image => ({
                    url: image!,
                    productId: product.id
                }))
               })
            }
    
            return {
                product // devuelvo el producto en la transaccion de prisma
            }
        })

        // revalidacion de paths
        revalidatePath(`/admin/products`)
        revalidatePath(`/admin/product/${ product.slug }`)
        revalidatePath(`/products/${ product.slug }`)
        return {
            ok: true,
            product: prismaTx.product // retorno todo el producto 
        }
    } catch (error) {
        return {
            ok: false,
            message: "No se pudo actualizar/crear"
        }
    }
}



const uploadImages = async( images: File[] ) => {

    try {
        const uploadPromises = images.map( async( image ) => {
            try {
                // convertir la imagen en string para poder subirlo a cloudinary
                const buffer = await image.arrayBuffer()
                const base64image = Buffer.from(buffer).toString('base64')
    
                return cloudinary.uploader.upload(`data:image/png;base64,${ base64image }`) // subo la img a cloudinary
                    .then( r => r.secure_url ) // obtengo el url de la imagen que subo


            } catch (error) {
                console.log(error)
                return null
            }
        })

        const uploadedImages = await Promise.all( uploadPromises )
        return uploadedImages // retorno el array de la promesa de las imagenes subidas con la url de cada img

    } catch (error) {
        console.log(error)
        return null
    }
}