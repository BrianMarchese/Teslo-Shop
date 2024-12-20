'use client'

import { logout } from "@/actions"
import { useUIStore } from "@/store"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoManOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline, IoWomanOutline } from "react-icons/io5"
import { TbMoodKid } from "react-icons/tb"


export const SideBar = () => {

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen)
    const closeMenu = useUIStore(state => state.closeSideMenu)

    const { data: session } = useSession()
    
    const isAuthenticated = !!session?.user;
    const isAdmin = (session?.user.role === 'admin')

    const refresh = () => {
        window.location.replace('/')
        logout()
        closeMenu()
    }
    return (
        <div>
            {/*BLACK BACKGROUND */}
            {
                isSideMenuOpen && (

                    <div
                        className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" 
                    />
                )
            }

            {/* BLUR */}
            {
                isSideMenuOpen && (

                    <div
                        onClick={ () => closeMenu() }
                        className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" 
                    />
                )
            }

            {/*SIDE MENU */}
            <nav className={
                clsx(
                    "fixed p-5 right-0 top-0 md:w-[500px] w-[250px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-y-auto",
                    {
                        "translate-x-full": !isSideMenuOpen
                    }
                )

            }>

                <IoCloseOutline size={40} className="absolute top-5 right-5 cursor-pointer" onClick={ () => closeMenu() } />
                
                {/* INPUT */}
                <div className="relative mt-14">
                    <IoSearchOutline size={20} className="absolute top-2 left-2"/>
                    <input type="text" placeholder="Buscar" className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500" />
                </div>
                {/* CATEGORÍAS */}
                <div className="w-full h-px bg-gray-200 my-10 block md:hidden" />
                <div className="block md:hidden">
                    <Link
                        href={"/gender/men"}
                        onClick={() => closeMenu()}
                        className="p-2 hover:bg-gray-100 rounded transition-all  text-xl flex items-center"
                    >
                        <IoManOutline size={30}/>
                        <span className="ml-3">Hombres</span>
                    </Link>
                    <Link
                        href={"/gender/women"}
                        onClick={() => closeMenu()}
                        className="p-2 hover:bg-gray-100 rounded transition-all  text-xl flex items-center mt-10"
                    >   <IoWomanOutline size={30}/>
                        <span className="ml-3">Mujeres</span>
                    </Link>
                    <Link
                        href={"/gender/kid"}
                        onClick={() => closeMenu()}
                        className="p-2 hover:bg-gray-100 rounded transition-all text-xl flex items-center mt-10"
                    >   <TbMoodKid size={30}/>
                        <span className="ml-3">Niños</span>
                    </Link>
                </div>
                <div className="w-full h-px bg-gray-200 my-10 block md:hidden" />

                {
                    isAuthenticated && (
                        <>
                            {/* MENU */}

                            <Link href={"/profile"} onClick={ () => closeMenu() } className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"> 
                                <IoPersonOutline size={30}/>
                                <span className="ml-3 text-xl">Perfil</span>   
                            </Link>

                            <Link href={"/orders"} onClick={ () => closeMenu() } className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"> 
                                <IoTicketOutline size={30}/>
                                <span className="ml-3 text-xl">Ordenes</span>
                            </Link>
                        </>
                    )
                }
                

                {
                    isAuthenticated && (
                        <button onClick={ () => refresh() } className="flex items-center w-full mt-10 p-2 hover:bg-gray-100 rounded transition-all"> 
                            <IoLogOutOutline size={30}/>
                            <span className="ml-3 text-xl">Salir</span>
                        </button>
                    )
                }

                {
                    !isAuthenticated && (  
                        <Link href={"/auth/login"} onClick={ () => closeMenu() } className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"> 
                            <IoLogInOutline size={30}/>
                            <span className="ml-3 text-xl">Ingresar</span>
                        </Link>
                    )
                }


                {
                    isAdmin && (
                        <>
                            {/* SEPARADOR DE LINEA */}
                            <div className="w-full h-px bg-gray-200 my-10"/>

                            <Link href={"/admin/products"} onClick={ () => closeMenu() } className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"> 
                                <IoShirtOutline size={30}/>
                                <span className="ml-3 text-xl">Productos</span>
                            </Link>
                            
                            <Link href={"/admin/orders"} onClick={ () => closeMenu() } className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"> 
                                <IoTicketOutline size={30}/>
                                <span className="ml-3 text-xl">Ordenes</span>
                            </Link>

                            <Link href={"/admin/users"} onClick={ () => closeMenu() } className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"> 
                                <IoPeopleOutline size={30}/>
                                <span className="ml-3 text-xl">Usuarios</span>
                            </Link>
                        </>
                    )
                }




            </nav>
        </div>
    )
} 