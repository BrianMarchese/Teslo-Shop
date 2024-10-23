import { getCategory, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
    params: {
      slug: string
    }
}

export default async function productPage({ params }: Props) {

  const { slug } = params

  const [ product, categories  ] = await Promise.all([ // las ejecuto en simultaneo porque no se vinculan y asi no tengo que esperar que primero se ejecute una y luego otra
    getProductBySlug(slug),
    getCategory()
  ])


  if ( !product && slug !== "new" ) {
    redirect("/admin/products")
  }

  const title = (slug === "new") ? "Nuevo producto" : "Editar producto"

  return (
    <>
      <Title title={ title } />

      <ProductForm product={ product ?? {} } categories={ categories } />
    </>
  );
}