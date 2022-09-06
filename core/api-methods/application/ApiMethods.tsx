import { FC, useState, useContext, useEffect } from "react";
import { Card, Grid, Button, Textarea, Tooltip, Popover } from "@nextui-org/react";
import { Input } from '@nextui-org/react';
import { Text } from "@nextui-org/react";
import { Table } from '@nextui-org/react';
import toast from "react-hot-toast";
import 'animate.css';
import { DataBeanMethod } from "../domain/interfaces";
import { GlobalService } from "../../../api/services/GlobalService";
import { BiCaretLeft, BiCodeAlt } from "react-icons/bi";
import { FiCopy } from "react-icons/fi";
import { ImEye } from "react-icons/im";
import { handleCopy } from "../../../utils";
import { FcMediumPriority } from "react-icons/fc";
import { MethodTest } from "../../test/application/MethodTest";
import { context } from "../../context/providerSpinner";
import { contextTheme } from "../../context/providerTheme";

interface Props {
}


const _globalService = new GlobalService();

export const ApiMethods: FC<Props> = ({ }) => {

    const [quest, setQuest] = useState<string>("");
    const [list, setList] = useState<DataBeanMethod[] | undefined>([]);
    const [selection, setSelection] = useState<DataBeanMethod | null>(null);
    const [test, setTest] = useState<boolean>(false);
    const { stateTheme }: any = useContext(contextTheme);
    const { setState }: any = useContext(context);
    const [theme, setTheme] = useState("");


    useEffect(() => {

        if (stateTheme) {
            setTheme("card-glass1 animate__animated animate__animated animate__fadeInUp");
        } else {

            setTheme("card-glass2 animate__animated animate__animated animate__fadeInUp");
        }

    }, [stateTheme]);



    const getDataBeanMethodLikeName = (request: string) => {
        setState(true);
        _globalService.getDataBeanMethodLikeName(request).subscribe((resp) => {
            setState(false)
            if (resp.length > 0) {
                setList(resp);
            } else {
                toast('No se han encontrado coincidencias', { icon: <FcMediumPriority /> });
            }
        })
    }

    const toSelect = (item: DataBeanMethod) => {
        console.log(item)
        if (typeof item.Parametters !== "object") {
            item.Parametters = item.Parametters.split(',');
            console.log(item.Parametters);
            setSelection(item);
        } else {
            setSelection(item);
        }
    }

    const handleSubmit = (e: any) => {

        e.preventDefault();
        setSelection(null);
        getDataBeanMethodLikeName(quest);
    }

    const handleTest = () => {
        setTest(true)
    }
    return (
        <div>
            {selection === null &&
                <form onSubmit={handleSubmit}>
                    <h1 style={{ color: "white", position: "relative", left: "100px" }} className="animate__animated animate__fadeInUp">Metodos</h1>
                    <div className={theme}>
                        <Grid.Container gap={5}>
                            <Grid sm={12}
                                css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                                <input
                                    value={quest}
                                    className="input-ligth"
                                    type="text"
                                    placeholder="Escribe un metódo"
                                    aria-label={'Nombre del metodo'}
                                    onChange={(e) => {
                                        setQuest(e.target.value);
                                    }}
                                />
                                <Button type={"submit"} size={"lg"} color="warning"
                                    css={{ display: "block", fontSize: "16px" }}>
                                    Buscar
                                </Button>
                            </Grid>
                        </Grid.Container>
                    </div>
                </form>}

            {/* LISTA DE LOS DATOS */}
            {(list!.length > 0 && selection === null) &&
                <div className="animate__animated animate__fadeInUp">
                    <Card className={`card-glass`} css={{ overflowY: 'scroll', maxHeight: '250px' }}>
                        <ul>
                            {
                                list!.map((item: DataBeanMethod) => {
                                    return (
                                        <li key={item.IDDataBeanMethod} className='apiMethods__option' onClick={() => {
                                            toSelect(item);
                                        }}>
                                            <div>
                                                <Text color={"orange"} h4>{item.Method}</Text>
                                                <Text color={"white"} h5>{item.Hash}</Text>
                                            </div>
                                        </li>)
                                })
                            }
                        </ul>
                    </Card>
                </div>
            }
            {selection &&
                <div>
                    <div className="animate__animated animate__fadeInUp apiMethods__selection">
                        <Card className={" card-glass-op "}>
                            <Card.Body>
                                <Grid.Container>
                                    <Grid sm={2}>
                                        <Button size={"xs"} flat auto rounded color={'warning'}
                                            onClick={() => {
                                                setSelection(null);
                                                setTest(false);
                                            }}
                                        >
                                            <BiCaretLeft />
                                        </Button>
                                    </Grid>
                                    <Grid sm={10} css={{ display: 'flex', flexDirection: 'column' }}>
                                        <Text h4 color={"orange"}
                                            css={{ textAlign: "center" }}> {selection.Method}
                                        </Text>
                                        {/* <Text h6 color={"white"} css={{ textAlign: "center" }}
                                            onClick={() => { }}
                                        > {selection.Hash}
                                        </Text> */}
                                    </Grid>
                                </Grid.Container>
                            </Card.Body>
                        </Card>
                    </div>
                    <Table className="animate__animated animate__fadeIn card-glass-op" css={{ marginBottom: '20px' }}>
                        <Table.Header>
                            <Table.Column><Text b color={"white"}>ID</Text></Table.Column>
                            <Table.Column css={{ maxWidth: 350 }}><Text b
                                color={"white"}>Mathod/Hash</Text></Table.Column>
                            <Table.Column><Text b color={"white"}>Parametters</Text></Table.Column>
                            <Table.Column><Text b color={"white"}>ReturnType</Text></Table.Column>
                            <Table.Column><Text b color={"white"} css={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>JSON</Text></Table.Column>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row key={1}>
                                <Table.Cell>
                                    <Text size={16} color={"white"}>{selection.IDDataBeanInfo}</Text>
                                </Table.Cell>
                                <Table.Cell>
                                    <div style={{ wordBreak: 'break-word' }}>
                                        <Tooltip content={`Clic para copiar: ${selection.Hash}`}>
                                            <Text
                                                css={{ cursor: 'pointer' }}
                                                size={16}
                                                color={"orange"}
                                                h6
                                                onClick={() => {
                                                    handleCopy(selection.Hash, false)
                                                }}
                                            > {selection.Method}
                                            </Text>
                                        </Tooltip>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    {
                                        selection.Parametters.map((param: string, i: number) => {
                                            return (
                                                <Text key={i} size={16} color={"white"}>
                                                    {`${'󠁻󠁻󠁻󠁻🦧'} ${param}`}
                                                </Text>
                                            )
                                        })
                                    }
                                </Table.Cell>

                                <Table.Cell>
                                    <Text>{selection.ReturnType} </Text>
                                </Table.Cell>
                                <Table.Cell
                                    css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                                    <Button.Group color={'warning'} flat css={{ marginTop: '40px' }}>

                                        <Tooltip content={"Ver JSON"}>
                                            <Popover>
                                                <Popover.Trigger>
                                                    <Button size={'sm'} css={{ fontSize: 20, marginRight: 5 }}> <ImEye />
                                                    </Button>
                                                </Popover.Trigger>
                                                <Popover.Content>
                                                    <Textarea css={{ width: 450 }} rows={13}
                                                        value={JSON.stringify(JSON.parse(selection.Json), undefined, 4)}>
                                                    </Textarea>
                                                </Popover.Content>
                                            </Popover>
                                        </Tooltip>
                                        <Tooltip content={"Copiar JSON"}>
                                            <Button size={'sm'} css={{ fontSize: 20, marginRight: 5 }}
                                                onPress={() => handleCopy(selection.Json, true)}>
                                                <FiCopy />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip content={"Probar"}>
                                            <Button size={"sm"} css={{ fontSize: 20 }} onPress={handleTest}><BiCodeAlt />
                                            </Button>
                                        </Tooltip>
                                    </Button.Group>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            }
            {test && (
                <>
                    <MethodTest json={selection?.Json} />

                </>
            )

            }
        </div>
    )


}


export default ApiMethods;
