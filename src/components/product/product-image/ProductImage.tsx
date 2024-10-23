import Image from "next/image"
// componente para manejar el problema si al crear el producto no le ponen imagen

interface Props {
  src?: string
  alt: string
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className']
  width: number
  height: number 
}

export const ProductImage = ({ src, alt, className, width, height }: Props) => {

  const localSrc = ( src )
    ?  src.startsWith('http') // http://urlcompletodelaimagen.jpg
        ? src
        : `/products/${ src }`
    : '/imgs/placeholder.jpg'
  return (
    <Image 
        src={ localSrc } 
        width={ width } height={ height } 
        alt={ alt } 
        className={ className } 
    />
  )
}
