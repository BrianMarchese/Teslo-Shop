import { Size } from "@/interfaces"
import clsx from "clsx"

interface Props {
    selectedSize: Size
    avaibleSizes: Size[]
}


export const SizeSelector = ({ selectedSize, avaibleSizes }: Props) => {
    return (
        <div className="my-5">
            <h3 className="font-bold mb-4">Talles disponibles</h3>

            <div className="flex">
                {
                    avaibleSizes.map( size => 
                        ( <button 
                                key={size} 
                                className={ 
                                    clsx(
                                        "mx-2 hover:underline text-lg",
                                        {
                                            'underline': size === selectedSize
                                        }
                                    )
                                }>
                                { size }
                           </button> ))
                }

            </div>

        </div>
    )
}