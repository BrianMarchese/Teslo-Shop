import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string
  }
}


export default function({ params }: Props) {
  const { slug } = params
  const product = initialData.products.find( product => product.slug === slug )

  if(!product){
    notFound()
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      {/* carrete */}
      
      <div className="col-span-1 md:col-span-2">
        {/* carrete mobile */}
        <ProductMobileSlideShow title={ product.title } images={ product.images } className="block md:hidden" />

        {/* carrete de escritorio */}
        <ProductSlideShow title={ product.title } images={ product.images } className="hidden md:block" />
      </div>

      {/* detalles */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          { product.title }
        </h1>
        <p className="text-lg mb-5">
          ${ product.price }
        </p>

        {/* selector de talles */}
        <SizeSelector selectedSize={ product.sizes[0] } avaibleSizes={ product.sizes }/>

        {/* selector de cantidad */}
        <QuantitySelector quantity={ 2 }/>

        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          { product.description }
        </p>

      </div>
    </div>
  );
}