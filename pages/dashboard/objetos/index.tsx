import { Table } from "@nextui-org/react"
import { ModuleLayout } from "../../../layouts"
import { ApiObjects } from '../../../core/api-objects/ApiObjects';

export const index = () => {
    return (

        <>
            <ModuleLayout title='Api - Objetos' />
            <ApiObjects />
        </>



    )
}

export default index
