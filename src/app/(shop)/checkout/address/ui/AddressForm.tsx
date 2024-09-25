'use client'

import { Country } from "@/interfaces"
import { useAddressStore } from "@/store"
import clsx from "clsx"
import { useEffect } from "react"
import { useForm } from "react-hook-form"


type FormInputs = {
  firstName: string
  lastName: string
  address: string
  address2?: string
  postalCode: string
  city: string
  country: string
  phone: string
}

interface Props {
  countries: Country[]
}

const AddressForm = ({ countries }: Props) => {

  const { handleSubmit, register, formState: { isValid }, reset } = useForm<FormInputs>()
  
  const setAddress = useAddressStore( state => state.setAddres ) // funcion que me va a guardar los datos en el localStorage
  const address = useAddressStore( state => state.address )

  useEffect(() => {
    if ( address.firstName ) {
      reset(address)
    }
  }, [address])
  

  const onSubmit = ( data: FormInputs ) => {
    console.log({data})

    setAddress(data)
  }

  return (
    <form onSubmit={ handleSubmit( onSubmit ) } className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">

    <div className="flex flex-col mb-2">
      <span>Nombres</span>
      <input 
        type="text" 
        className="p-2 border rounded-md bg-gray-200"{ ...register('firstName', { required: true }) }/>
    </div>

    <div className="flex flex-col mb-2">
      <span>Apellidos</span>
      <input 
        type="text" 
        className="p-2 border rounded-md bg-gray-200"{ ...register('lastName', { required: true }) }/>
    </div>

    <div className="flex flex-col mb-2">
      <span>Dirección</span>
      <input 
        type="text" 
        className="p-2 border rounded-md bg-gray-200"{ ...register('address', { required: true }) }/>
    </div>

    <div className="flex flex-col mb-2">
      <span>Dirección 2 (opcional)</span>
      <input 
        type="text" 
        className="p-2 border rounded-md bg-gray-200"{ ...register('address2') }/>
    </div>


    <div className="flex flex-col mb-2">
      <span>Código postal</span>
      <input 
        type="text" 
        className="p-2 border rounded-md bg-gray-200"{ ...register('postalCode', { required: true }) }/>
    </div>

    <div className="flex flex-col mb-2">
      <span>Ciudad</span>
      <input 
        type="text" 
        className="p-2 border rounded-md bg-gray-200"{ ...register('city', { required: true }) }/>
    </div>

    <div className="flex flex-col mb-2">
      <span>País</span>
      <select 
        className="p-2 border rounded-md bg-gray-200"{ ...register('country', { required: true }) }>
        <option value="">[ Seleccione ]</option>
        {
          countries.map( country => (
            <option key={ country.id } value={ country.id }>{ country.name }</option>
          ))
        }
      </select>
    </div>

    <div className="flex flex-col mb-2">
      <span>Teléfono</span>
      <input 
        type="text" 
        className="p-2 border rounded-md bg-gray-200"{ ...register('phone', { required: true }) }/>
    </div>


    <div className="flex flex-col mb-2 sm:mt-1">
        <div className="inline-flex items-center mb-10">
        </div>
      <button 
        type="submit"
        /* href='/checkout' */
       /*  className="btn-primary flex w-full sm:w-1/2 justify-center" */
       className={ clsx({
        'btn-primary': isValid,
        'btn-disabled': !isValid,
       })}
       >
        Siguiente
      </button>
    </div>

  </form>
  )
}

export default AddressForm