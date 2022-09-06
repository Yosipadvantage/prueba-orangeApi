import { MethodTest } from '../../../core/test/application/MethodTest'
import { ModuleLayout } from "../../../layouts"

const index = () => {

    return (
        <>
            <ModuleLayout title='Api - Test' />
            <MethodTest />

        </>
    )
}

export default index;