'use client'

import { registerUser } from "@/actions"
import { login } from "@/actions/auth/login"
import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"


type FormInputs = {
    name: string
    email: string
    password: string
}


const RegisterForm = () => {


    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

    const [errorMessage, setErrorMessage] = useState("")

    const onSubmit = async(data: FormInputs) => {

        setErrorMessage("")
        const { name, email, password } = data

        // Server Action
        const resp = await registerUser( name, email, password )

        if (!resp.ok) { // obtengo el mensaje del error
            setErrorMessage( resp.message )
        }

        await login( email.toLocaleLowerCase(), password ) // hago el inicio de sesion automatico y lo redirecciono a el home
        window.location.replace("/")
    }

  return (
    <form onSubmit={ handleSubmit( onSubmit ) } className="flex flex-col">


        <label htmlFor="email">Nombre completo</label>
        <input
        className={
            clsx (
                "px-5 py-2 border bg-gray-200 rounded mb-5",
                {
                    "border-red-500": errors.name
                }
            )
        }
        type="text"
        autoFocus
        { ...register('name', { required: true }) } 
        />

        <label htmlFor="email">Correo electrónico</label>
        <input
        className={
            clsx (
                "px-5 py-2 border bg-gray-200 rounded mb-5",
                {
                    "border-red-500": errors.email
                }
            )
        }
        type="email"
        { ...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ }) } 
        />


        <label htmlFor="email">Contraseña</label>
        <input
        className={
            clsx (
                "px-5 py-2 border bg-gray-200 rounded mb-5",
                {
                    "border-red-500": errors.password
                }
            )
        }
        type="password"
        { ...register('password', { required: true, minLength: 6 }) }  
        />

        <span className="text-red-500">{ errorMessage }</span>

        <button
        
        className="btn-primary">
        Crear cuenta
        </button>


        {/* divisor l ine */ }
        <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
        href="/auth/login" 
        className="btn-secondary text-center">
        Ingresar
        </Link>

  </form>
  )
}

export default RegisterForm