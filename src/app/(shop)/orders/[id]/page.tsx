import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

interface Props {
  params: {
    id: string
  }
}

export default function({ params }: Props) {
  const { id } = params
  
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">

        <Title title={`Orden #${ id }`}/>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}
          <div className="flex flex-col mt-5">
            <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": false,
                  "bg-green-700": true,
                }
              )
            }>
              <IoCardOutline size={ 30 } />
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">Orden pagada</span>

            </div>

          {/* items */}
          {
            productsInCart.map( product => (
              <div key={ product.slug } className="flex mb-5">
                <Image src={`/products/${ product.images[0] }`}
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
                  <p>{ product.title }</p>
                  <p>${ product.price } x 3</p>
                  <p className="font-bold">Subtotal: ${ product.price * 3 }</p>
                </div>

              </div>

            ))
          }
           </div>
          
          {/* resumen compra*/}
          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Brian Marquese</p>
              <p>Av. San Martín 1701</p>
              <p>Provincia de Santa Fé</p>
              <p>Rosario</p>
              <p>CP 2000</p>
              <p>123.123.1232</p>
            </div>

            {/* divisor */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Impuestos (%21)</span>
              <span className="text-right">$100</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-2xl mt-5 text-right">$100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <div className={
                    clsx(
                      "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                      {
                        "bg-red-500": false,
                        "bg-green-700": true,
                      }
                    )
                  }>
                <IoCardOutline size={ 30 } />
                {/* <span className="mx-2">Pendiente de pago</span> */}
                <span className="mx-2">Orden pagada</span>

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}