'use server'

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config( process.env.CLOUDINARY_URL ?? "" )


export const deleteProductImage = async( imageId: number, imageUrl: string ) => {

    if ( !imageUrl.startsWith('http') ) {
        return {
            ok: false,
            message: "No se pueden borrar imagenes de FS"
        }
    }

    const imageName = imageUrl // recorto la url de la imagen para obtener solo el nombre para poder eliminar en cloudinary
        .split('/')
        .pop()
        ?.split('.')[0] ?? ''

    try {
      await cloudinary.uploader.destroy( imageName ) // elimino la imagen en cloudinary
      const deletedImage = await prisma.productImage.delete({ // la elimino en mi bd
        where: {
            id: imageId
        },
        select: {
            product: {
                select: {
                    slug: true // selecciono el slug para poder revalidar el path
                }
            }
        }
      })
      
      
      //revalidacion de paths
      revalidatePath(`/admin/products`)
      revalidatePath(`/admin/product/${ deletedImage.product.slug }`)
      revalidatePath(`/product/${ deletedImage.product.slug }`)

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "No se pudo eliminar la imagen"
        }
        
    }
}