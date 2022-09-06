import { useContext, useEffect, useRef, useState } from 'react'


import { TabView, TabPanel } from 'primereact/tabview';
import { Button, Card, Collapse, Container, Grid, Input, Popover, Table, Text, Textarea, Tooltip } from '@nextui-org/react';
import { BeanInfoPattern } from '../../interfaces/bean-info-pattern';
import { GlobalService } from '../../api/services/GlobalService';
import { DataBeanMethod } from '../api-methods/domain/interfaces';
import { BiCaretLeft, BiCodeAlt } from 'react-icons/bi';
import { FcMediumPriority } from "react-icons/fc";
import { handleCopy } from '../../utils/copy-to-clipboard';
import { FiCopy } from 'react-icons/fi';
import { ImEye } from 'react-icons/im';
import { BsXSquare } from 'react-icons/bs';
import { BeanProperty } from '../../interfaces/bean-properties';
import toast from 'react-hot-toast';
import { context } from "../context/providerSpinner";
import { contextTheme } from "../context/providerTheme";

const _globalService = new GlobalService();

export const ApiObjects = () => {

    const [list, setList] = useState<BeanInfoPattern[]>([]);
    const [listMethods, setListMethods] = useState<DataBeanMethod[]>([]);
    const [listProperties, setListProperties] = useState<BeanProperty[]>([]);
    const [requestSearch, setRequestSearch] = useState('');
    const [activeIndex, setActiveIndex] = useState(1);
    const [item, setItem] = useState<BeanInfoPattern | null>(null);
    const { setState }: any = useContext(context);
    const { stateTheme }: any = useContext(contextTheme);
    const [theme, setTheme] = useState("card-glass1 animate__animated animate__animated animate__fadeInUp");


    useEffect(() => {

        if (stateTheme) {
            setTheme("card-glass1 animate__animated animate__animated animate__fadeInUp");
        } else {

            setTheme("card-glass2 animate__animated animate__animated animate__fadeInUp");
        }

    }, [stateTheme]);

    const searchInput = useRef(null);

    const getDataBeanObjectByPattern = (request: string) => {
        setState(true);
        _globalService.getDataBeanInfoByPattern(request).subscribe((resp) => {
            setState(false);
            if (resp.length > 0) {
                setList(resp);
            } else {
                toast('No se han encontrado coincidencias', { icon: <FcMediumPriority /> });
            }
        })
    }

    const getDataBeanPropertiesByName = (itemName: string) => {
        _globalService.getDataBeanPropertyByName(itemName)
            .subscribe((resp) => {
                console.log(resp);
                if (resp.length > 0) {
                    setListProperties(resp);
                } else {
                    toast('No se han encontrado coincidencias', { icon: <FcMediumPriority /> });
                }
            })
    }

    const getDataBeanMethodByName = (itemName: string) => {
        setState(true);
        _globalService.getDataBeanMethodByName(itemName).subscribe((resp) => {
            setState(false);
            if (resp.length > 0) {
                resp.map((item: DataBeanMethod) => {
                    item.Parametters = item.Parametters.split(',');
                })
                setListMethods(resp);
            } else {
                toast('No se han encontrado coincidencias', { icon: <FcMediumPriority /> });
            }
        })
    }

    const onSelect = (item: BeanInfoPattern) => {
        setItem(item);
        getDataBeanMethodByName(item.ClassForName);
        getDataBeanPropertiesByName(item.ClassForName);
    }

    const handleSubmit = (event: any) => {
        console.log(event);
        event.preventDefault();
        if (requestSearch !== '') {
            setItem(null);
            getDataBeanObjectByPattern(requestSearch);
        } else {
            setList([]);
            toast('Debe introducir un Objeto', { icon: <FcMediumPriority /> });
        }
    }

    return (
        <div>
            {item === null &&
                <>
                    <h1 style={{ color: "white", position: "relative", left: "100px" }} className="animate__animated animate__fadeInUp">Objetos</h1>
                    <div className={theme}>
                        <form onSubmit={handleSubmit}>
                            <Grid.Container gap={5}>
                                <Grid sm={12} css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                                    <input
                                        ref={searchInput}
                                        value={requestSearch}
                                        className="input-ligth"
                                        type="text"
                                        placeholder="Escribe un Objeto"
                                        aria-label={'Nombre del objeto'}
                                        onChange={(e) => {
                                            setRequestSearch(e.target.value);
                                        }}
                                    />
                                    <Button size={"md"} color="warning" css={{ display: "block", fontSize: "16px" }} type="submit">
                                        Buscar
                                    </Button>
                                </Grid>
                            </Grid.Container>
                        </form>
                    </div> </>}
            {
                (list!.length > 0 && item === null) &&
                <div className="animate__animated animate__fadeIn">
                    <Card className={'card-glass-op'} css={{ overflow: 'scroll', maxHeight: '250px' }}>
                        <ul>
                            {
                                list!.map((item: BeanInfoPattern) => {
                                    return (
                                        <li key={item.IDDataBeanInfo} className='apiMethods__option'
                                            onClick={() => { onSelect(item) }}>
                                            <div>
                                                <Text color={"orange"} h4>{item.ClassForName}</Text>
                                                <Text color={"white"} h5>{item.DataBeanTable || 'No table asigned'}</Text>
                                            </div>
                                        </li>)
                                })
                            }
                        </ul>
                    </Card>
                </div>
            }
            {item &&
                <div>
                    <div className="animate__animated animate__fadeIn apiMethods__selection">
                        <Card className="card-glass-op">
                            <Card.Body>
                                <Grid.Container className='text-break text-wrap'>
                                    <Grid sm={2}>
                                        <Button size={"xs"} flat auto rounded color={'warning'}
                                            onClick={() => {
                                                setItem(null);
                                            }}
                                        >
                                            <BiCaretLeft />
                                        </Button>
                                    </Grid>
                                    <Grid sm={10} css={{ display: 'flex', flexDirection: 'column' }}>
                                        <Text h4 color={"orange"} css={{ textAlign: "center" }}>
                                            {item.ClassForName}
                                        </Text>
                                        <Text h6 color={"white"} css={{ textAlign: "center" }}>
                                            {item.DataBeanTable}
                                        </Text>
                                    </Grid>
                                </Grid.Container>
                            </Card.Body>
                        </Card>
                    </div>
                    <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                        <TabPanel className={(activeIndex === 0) ? 'tab-select' : ''} header={'Propiedades'}>
                            <Table className='table'>
                                <Table.Header>
                                    <Table.Column><Text h5 >ID</Text></Table.Column>
                                    <Table.Column><Text h5 >Nombre</Text></Table.Column>
                                    <Table.Column><Text h5 >Tipo de Dato</Text></Table.Column>
                                    <Table.Column><Text h5 css={{ display: 'flex', justifyContent: 'center' }}>TableKey</Text></Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {listProperties.map((item: BeanProperty, i) => (
                                        <Table.Row key={i}>
                                            <Table.Cell>
                                                <Text size={16} >
                                                    {item.IDDataBeanProperty}
                                                </Text>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Text size={16} >
                                                    {item.Name}
                                                </Text>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Text size={16} >
                                                    {item.ClassForName}
                                                </Text>
                                            </Table.Cell>
                                            <Table.Cell css={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                                                {item.TableKey ? '🔑' : <BsXSquare color='red' />}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                    }
                                </Table.Body>
                            </Table>
                        </TabPanel>
                        <TabPanel className={(activeIndex === 1) ? 'tab-select' : ''} header={'Métodos'}>
                            <Container css={{ maxHeight: '60vh', overflow: 'auto' }}>
                                <Table className="animate__animated animate__fadeIn table">
                                    <Table.Header >
                                        <Table.Column><Text b>ID</Text></Table.Column>
                                        <Table.Column><Text b>Method/Hash</Text></Table.Column>
                                        <Table.Column><Text b>Parametters</Text></Table.Column>
                                        <Table.Column><Text b css={{ display: 'flex', justifyContent: 'center' }}>JSON</Text></Table.Column>
                                    </Table.Header>
                                    <Table.Body>
                                        {listMethods.map((item: DataBeanMethod, i) => (
                                            <Table.Row key={i}>
                                                <Table.Cell>
                                                    <Text size={16}>
                                                        {item.IDDataBeanInfo}
                                                    </Text>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Tooltip content={`Clic para copiar: ${item.Hash}`}>
                                                        <Text
                                                            css={{ cursor: 'pointer' }}
                                                            size={16}
                                                            h6
                                                            onClick={() => { handleCopy(item.Hash, false) }}
                                                        > {item.Method}
                                                        </Text>
                                                    </Tooltip>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {
                                                        item.Parametters.map((param: string, i: number) => {
                                                            return (
                                                                <Text key={i} size={16}>
                                                                    {`${'󠁻󠁻󠁻󠁻🦧'} ${param}`}
                                                                </Text>
                                                            )
                                                        })
                                                    }
                                                </Table.Cell>
                                                <Table.Cell css={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                                                    <Button.Group color={'warning'} flat>
                                                        <Tooltip content={"Ver JSON"}>
                                                            <Popover>
                                                                <Popover.Trigger>
                                                                    <Button size={'sm'} css={{ fontSize: 20, marginRight: 5 }}> <ImEye />
                                                                    </Button>
                                                                </Popover.Trigger>
                                                                <Popover.Content>
                                                                    <Textarea css={{ width: 450 }} rows={13}
                                                                        value={JSON.stringify(JSON.parse(item.Json), undefined, 4)}>
                                                                    </Textarea>
                                                                </Popover.Content>
                                                            </Popover>
                                                        </Tooltip>
                                                        <Tooltip content={"Copiar JSON"}>
                                                            <Button size={'sm'} css={{ fontSize: 20, marginRight: 5 }}
                                                                onPress={() => handleCopy(item.Json, true)}>
                                                                <FiCopy />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip content={"Probar"}>
                                                            <Button size={"sm"} css={{ fontSize: 20 }}><BiCodeAlt /> </Button>
                                                        </Tooltip>
                                                    </Button.Group>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                        }
                                    </Table.Body>
                                </Table>
                            </Container>
                        </TabPanel>
                        <TabPanel className={(activeIndex === 2) ? 'tab-select' : ''} header={'Test'}>
                            {/* //TEST */}
                        </TabPanel>
                    </TabView>
                </div>
            }
        </div >

    )
}
