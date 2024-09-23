'use server'

import prisma from "@/lib/prisma"
import bcryptjs from "bcryptjs"


export const registerUser = async( name: string, email: string, password: string ) => {
  
    try {
        
        const user = await prisma.user.create({ // creo el usuario con sus datos
            data: {
                name: name,
                email: email.toLocaleLowerCase(),
                password: bcryptjs.hashSync( password ), // encripto la contra
            },
            select: { // selecciono lo que quiero que muestre
                id: true,
                name: true,
                email: true,
            }
        })

        return {
            ok: true,
            user: user,
            message: "Usuario creado correctamente",
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo crear el usuario'
        }
    }

}

