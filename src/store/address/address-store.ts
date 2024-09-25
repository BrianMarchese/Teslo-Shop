import { create } from "zustand"
import { persist } from "zustand/middleware"


interface State {

    address: {
        firstName: string
        lastName: string
        address: string
        address2?: string
        postalCode: string
        city: string
        country: string
        phone: string
    }

    //metodos
    setAddres: (address: State['address']) => void;
}

export const useAddressStore = create<State>()(
    persist(
        (set, get) => ({
            address: {
                firstName: "",
                lastName: "",
                address: "",
                address2: "",
                postalCode: "",
                city: "",
                country: "",
                phone: "",
            },
            setAddres: (address) => { // le paso el address al set para que lo cargue
                set({ address })
            }
        }),
        {
            name: 'address-storage', // aca se va a grabar con este nombre en el localStorage
        }
    )
)