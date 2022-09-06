import { FC, useContext, useEffect, useState } from "react";
import {
    Button,
    Textarea,
    Card,
    Grid
} from "@nextui-org/react";
import { GlobalService } from "../../../api/services/GlobalService";
import { context } from "../../context/providerSpinner";
import { contextTheme } from "../../context/providerTheme";

interface Props {
    json?: string
}

const _globalService = new GlobalService();


export const MethodTest: FC<Props> = ({ json }) => {

    const [method, setMetod] = useState<string>("");
    const [response, setResponse] = useState<any>();
    const { setState }: any = useContext(context);
    const [color, setColor] = useState("");
    const { stateTheme }: any = useContext(contextTheme);


    useEffect(() => {
        if (json) {
            setMetod(json)
        }
    }, [])


    const handleText = (e: any) => {
        setMetod(e.target.value);
    }
    const handleFormat = () => {
        try {
            const obj = JSON.parse(method);
            setMetod(JSON.stringify(obj, undefined, 2))
        } catch (err) {
            console.log(err)
        }
    }
    const handleTest = () => {
        setState(true);
        _globalService.serviceTest(method).subscribe((resp) => {
            setResponse(JSON.stringify(resp, null, 2));
            setState(false);
        })
    }
    const handleClean = () => {
        setMetod("");
    }
    const handleCleanResp = () => {
        setResponse("");
    }

    useEffect(() => {

        if (stateTheme) {
            setColor("black");
        } else {
            setColor("white");
        }

    }, [stateTheme]);


    useEffect(() => {

        const tema = localStorage.getItem("tema");
        if (tema === "true") {
            setColor("black")
        } else {
            setColor("white")
        }

    }, []);





    const [url, setUrl] = useState<string>("")
    return (
        <>
            <div>
                <div className={"methodTest__nav"} >
                    <Grid.Container>

                        <Grid sm={6}>

                            <div style={{ display: 'flex', gap: '20px', width: "100%", alignItems: "flex-end" }}>

                                <div>
                                    <label style={{ display: "block", color: color }}>Url seleccionada</label>
                                    <input readOnly className={"methodTest__selector"} value={url} />
                                </div>


                                <select placeholder={"seleccione una url"} name="select" className={"methodTest__selector"} onChange={(e: any) => {
                                    setUrl(e.target.value);
                                }}>
                                    <option value="value0" selected> Seleccione una opción</option>
                                    <option value="value1" >Value 1</option>
                                    <option value="value2" >Value 2</option>
                                    <option value="value3">Value 3</option>
                                </select>
                            </div>
                        </Grid>

                        <Grid sm={6}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0px 25px", width: "100%", marginTop: "20px" }}>
                                <button style={{ width: "100%", fontSize: "20px", border: "none", borderRadius: "5px", padding: "8px", backgroundColor: "orange", color: "white" }}>
                                    Enviar petición
                                </button>
                            </div>

                        </Grid>


                    </Grid.Container>
                </div>
            </div>

            {/*Cuerpo*/}
            <div style={{ display: 'flex', gap: 20, justifyContent: "center", alignItems: 'center', marginBottom: "25px" }}>
                <div style={{
                    display: 'flex',
                    flexDirection: "column",
                    gap: 25,
                    justifyContent: "flex-start",
                    alignItems: 'center',
                    width: "40%"
                }}>
                    <Card>
                        <Card.Body>
                            <Textarea rows={25} css={{ width: "100%" }} value={method} onChange={handleText}
                                aria-label={"metodo"}>
                            </Textarea>
                        </Card.Body>
                        <Card.Footer>
                            <div style={{ width: "100%", display: 'flex', gap: 10, justifyContent: "flex-end", alignItems: 'center' }}>
                                <Button size={"md"} color={"warning"}
                                    onPress={handleClean}>Limpiar
                                </Button>
                                <Button size={"md"} color={"warning"} onPress={handleFormat}>
                                    Formatear
                                </Button>
                            </div>
                        </Card.Footer>
                    </Card>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: "column",
                    gap: 25,
                    justifyContent: "flex-start",
                    alignItems: 'center',
                    width: "40%"

                }}>

                    <Card>
                        <Card.Body>
                            <Textarea rows={25} css={{ width: "100%", color: "orange" }}
                                value={response} aria-label={"response"}>
                            </Textarea>
                        </Card.Body>
                        <Card.Footer>
                            <div style={{ display: 'flex', gap: 10, justifyContent: "flex-end", alignItems: 'center', width: "100%" }}>
                                <Button size={"md"} color={"warning"} onPress={handleCleanResp}>
                                    Limpiar
                                </Button>
                            </div>
                        </Card.Footer>
                    </Card>



                </div>

            </div>


        </>
    )
}

