import type { CartProduct } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
    cart: CartProduct[]

    getTotalItems: () => number

    getSummaryInformation: () => {
        subTotal: number;
        impuestos: number;
        total: number;
        itemsInCart: number;
    }

    addProductToCart: ( product: CartProduct ) => void

    updateProductQuantity: ( product: CartProduct, quantity: number ) => void

    removeProduct: ( product: CartProduct ) => void

    clearCart: () => void
}

export const useCartStore  = create<State>()( 
    // con persist hago que se vea todo en el localstorage
    persist(
        (set, get) => ({

            cart: [],

            //Metodos
            getTotalItems: () => {
                const { cart } = get()
                return cart.reduce(( total, item ) => total + item.quantity , 0)
            },

            getSummaryInformation: () => {
                const { cart } = get()

                const subTotal = cart.reduce(
                    (subTotal, product) => (product.quantity * product.price) + subTotal,
                    0
                )

                const impuestos = subTotal * 0.21
                const total = subTotal + impuestos
                const itemsInCart = cart.reduce(( total, item ) => total + item.quantity , 0)

                return {
                    subTotal,
                    impuestos,
                    total,
                    itemsInCart
                }
            },

            addProductToCart: ( product: CartProduct ) => {
                const { cart } = get() //obtengo el carrito
    
                //1. REVISAR SI EL PRODUCTO EXISTE EN EL CARRITO CON EL TALLE SELECCIONADO
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size == product.size)
                )
    
                if (!productInCart) {
                    set({ cart: [...cart, product] }) // hago el spread de el Cart e inserto el nuevo producto
                    return
                }
    
                //2. SE QUE EL PRODUCTO EXISTE POR TALLE ENTONCES TENGO QUE INCREMENTARLO
                const updatedCartProducts = cart.map( (item) => {
                    if( item.id === product.id && item.size === product.size ) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }
    
                    return item
                })
    
                set({ cart: updatedCartProducts })
            },
            updateProductQuantity: ( product: CartProduct, quantity: number ) => {
                const { cart } = get()
                
                const updatedCartProducts = cart.map( item => {
                    if (item.id === product.id && item.size === product.size) {
                        return {...item, quantity: quantity  }
                    }

                    return item
                })

                set({ cart: updatedCartProducts })
            },
            removeProduct: ( product: CartProduct ) => { //filtro los productos que no tienen el mismo id y el mismo tamaño
                const { cart } = get()

                const updatedCartProducts = cart.filter( (item) => item.id !== product.id || item.size !== product.size )

                set({ cart: updatedCartProducts })
            },

            clearCart: () => {
                set({ cart: [] })
            },
    
        }),

        {
            name: "shopping-cart",
        }
    )
)