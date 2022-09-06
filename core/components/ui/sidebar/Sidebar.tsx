import { useState, useEffect, useContext } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { Avatar } from '@nextui-org/react';
import { Tooltip } from "@nextui-org/react";
import { FiLogIn } from "react-icons/fi";
import { BiCodeCurly, BiCubeAlt, BiCodeAlt, BiData } from "react-icons/bi";
import { Switch } from '@nextui-org/react';
import logo from '../../../../public/logo-amc.png'
import { useRouter } from "next/router";
import { eliminarCookies } from "../../../../utils";
import Footer from "../../../../modules/footer/footer";
import { contextTheme } from "../../../context/providerTheme";

export const Sidebar = ({ children }: any) => {
    const router = useRouter()
    const [position, setPosition] = useState("40px");
    const [radio, setRadio] = useState(true);
    const [containerClass, setContainerClass] = useState("container-sidebar1");
    const { setStateTheme, stateTheme }: any = useContext(contextTheme);
    const [layoutClass, setLayoutClass] = useState("moduleLayout__container1");
    var tema;
    const path = useRouter();



    //CAMBIA EL TEMA CUANDO DETECTA UN CAMBIO EN EL PROVIDER
    useEffect(() => {
        if (stateTheme) {
            setLayoutClass("moduleLayout__container1")
        } else {
            setLayoutClass("moduleLayout__container2");
        }
    }, [stateTheme]);




    //CARGA EL TEMA CUANDO SE CARGA EL COMPONENTE POR PRIMERA VEZ
    useEffect(() => {
        tema = localStorage.getItem("tema");
        if (tema === "true") {
            setLayoutClass("moduleLayout__container1")
        } else if (tema === "false") {
            setLayoutClass("moduleLayout__container2");
        } else {
            setLayoutClass("moduleLayout__container1");
        }
    }, []);




    //CARGAR EL FONDO DEPENDIENDO DEL TEMA Y AJUSTA EL SIDERBAR DEACUERDO A LA RUTA
    useEffect(() => {
        tema = localStorage.getItem("tema");
        if (tema === "true") {
            setRadio(true)
            setContainerClass("container-sidebar2");

        } else if (tema === "false") {
            setRadio(false)
            setContainerClass("container-sidebar1");

        } else {
            setRadio(true)
            setContainerClass("container-sidebar2");
        }

        if (router.pathname === "/dashboard/metodos") {
            setPosition("40px");
        } else if (router.pathname === "/dashboard/objetos") {

            setPosition("93px");
        } else if (router.pathname === "/dashboard/test") {

            setPosition("145px");
        } else if (router.pathname === "/dashboard/sql") {
            setPosition("200px");
        }

    }, [])


    const closeSession = () => {
        sessionStorage.removeItem("user");
        eliminarCookies();
        router.push("/");
    }



    //GUARDA EL TEMA Y CAMBIA EL COLOR DE FONDO
    const cambio = (state: any) => {

        if (state.target.checked) {
            localStorage.setItem("tema", "true");
            setRadio(true);
            setContainerClass("container-sidebar2");
            setStateTheme(true);

        } else {
            localStorage.setItem("tema", "false");
            setRadio(false);
            setContainerClass("container-sidebar1")
            setStateTheme(false);

        }
    }



    return (
        <div className={containerClass}>
            <div className="caja-glass" style={{ cursor: "pointer" }}>

                <div className="card-tema">
                    <Switch checked={radio} className="switch" onChange={cambio} />
                </div>

                <Avatar
                    className="avatar"
                    squared
                    src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                <div className="logo-siderbar">
                    <Image src={logo} width={50}
                        height={40} alt='img'
                    />
                </div>
                <ul className="lista-iconos">
                    <p style={{ fontSize: "15px", position: "relative", top: "50px", padding: "5px", color: "beige" }}>
                        Menu
                    </p>
                    <span className="select" style={{ top: position }}></span>
                    <Tooltip content="Api metódos" color="warning" placement="right">
                        <li className="item-list">
                            <Link href="/dashboard/metodos">
                                <a><BiCodeCurly size={35} color="white" onClick={() => { setPosition("40px") }} /></a>
                            </Link>
                        </li>
                    </Tooltip>
                    <Tooltip content="Api objetos" color="warning" placement="right">
                        <li className="item-list">
                            <Link href="/dashboard/objetos">


                                <a><BiCubeAlt size={35} color="white" onClick={() => { setPosition("93px") }} /></a>


                            </Link>
                        </li>
                    </Tooltip>
                    <Tooltip content="Test" color="warning" placement="right">
                        <li className="item-list">
                            <Link href="/dashboard/test">


                                <a><BiCodeAlt size={35} color="white" onClick={() => { setPosition("145px") }} /></a>


                            </Link>
                        </li>
                    </Tooltip>
                    <Tooltip content="SQL" color="warning" placement="right">
                        <li className="item-list">
                            <Link href="/dashboard/sql">
                                <a><BiData size={35} color="white" onClick={() => { setPosition("200px") }} /></a>
                            </Link>
                        </li>
                    </Tooltip>
                    <Tooltip content="Salir" color="warning" placement="right">
                        <li className="item-list">
                            <FiLogIn size={35} color="white" onClick={() => {

                                closeSession();
                            }} />
                        </li>
                    </Tooltip>
                </ul>
            </div>
            <div className={path.pathname === "/login" ? "container-login" : layoutClass} >
                {children}
            </div>

            <div className="footer">
                <Footer />
            </div>
        </div>
    )
}

