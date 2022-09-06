import { Card, Grid, Textarea } from "@nextui-org/react"
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { GlobalService } from "../../api/services/GlobalService";
const services = new GlobalService();
import { context } from "../context/providerSpinner";

const ApiSql = () => {


    const [text, setText] = useState("");
    const [value, setValue] = useState("");
    const { setState }: any = useContext(context);

    const ejecutarComando = () => {
        setState(true);
        services.apiSql(value).subscribe((res: any) => {
            setState(false);
            if (res.DataBeanProperties.ObjectValue.DataBeanProperties) {
                setText("response")
            } else {
                toast.error("No se encontró la tabla")
                setText(res.DataBeanProperties.ObjectValue)

            }

        })
    }

    return (

        <section style={{ height: "100%", width: "70%", margin: "auto", display: "flex", alignItems: "center" }}>


            <Grid.Container gap={3}>
                <Grid sm={5} css={{ overflow: "hidden" }}>
                    <div style={{ width: "100%", marginTop: "16px" }}>
                        <h3 style={{ color: "white", width: "100%" }}>Comandos</h3>
                        <Card placeholder="comandos sql" css={{ width: "100%", height: "400px", borderRadius: "10px", padding: "20px" }}>
                            <Textarea value={value} style={{ width: "100%", height: "400px", fontSize: "18px" }} onChange={(e: any) => { setValue(e.target.value) }}></Textarea>
                        </Card>
                        <button style={{ width: "100%", cursor: "pointer", fontSize: "20px", background: "orange", marginTop: "38px", border: "none", borderRadius: "6px", padding: "12px", color: "white", backgroundColor: "orange" }} onClick={ejecutarComando}>Ejecutar comando</button>
                    </div>
                </Grid>




                <Grid sm={7} css={{ overflow: "hidden" }}>
                    <div style={{ width: "100%" }}>
                        <h3 style={{ color: "white" }}>Respuesta</h3>
                        <div className="card-glass" style={{ width: "100%", padding: "40px", height: "500px", overflow: "hidden", overflowY: "auto" }}>
                            {text}
                        </div>
                    </div>
                </Grid>


            </Grid.Container>
        </section >





    );

}


export default ApiSql;