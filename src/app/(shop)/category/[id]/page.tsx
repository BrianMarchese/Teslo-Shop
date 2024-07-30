import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

const seedProducts = initialData.products;

interface Props {
  params: {
    id: Category;
  }
}

export default function({ params }: Props) {
  const { id } = params
  const products = seedProducts.filter( product =>  product.gender === id );

  const labels: Record<Category, string> = { // hago un tipado de los labels, es de tipo category y apunta a un string
    'men': 'para Hombres',
    'women': 'para Mujeres',
    'kid': 'para Niños',
    'unisex': 'para Todos'
  }

  const labelsSubtitle: Record<Category, string> = {
    'men': 'para el',
    'women': 'para ellas',
    'kid': 'para los mas chicos',
    'unisex': 'para todos'
  }

/*   if (id === "kids"){
    notFound()
  } */

  return (
    <>
    <Title title={`Artículos ${labels[id]}`} subtitle={`Ropa ${labelsSubtitle[id]}`} className="mb-2" />

    <ProductGrid products={ products }/>
  </>
  );
}