
import { map, Observable } from "rxjs";
import api from '../axios-api'
import { ObjectValue, DataBeanMethod } from "../../core/api-methods/domain/interfaces";
import { BeanInfoPattern } from "../../interfaces/bean-info-pattern";
import { BeanProperty } from "../../interfaces/bean-properties";

export class GlobalService {

    private url: string = "/jsserver";


    public getDataBeanMethodLikeName(request: string): Observable<DataBeanMethod[]> {
        const dataObj = {
            "ServiceName": "OrangeCore",
            "MethodHash": "java.util.List_getDataBeanMethodLikeName_String",
            "ArgumentList": [
                request
            ]
        };
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data).pipe(map((item: any) => {
            return item.DataBeanProperties.ObjectValue.map((element: ObjectValue) => {
                return element.DataBeanProperties
            })
        }));

    }
    public serviceTest = (req: any): Observable<any> => {
        const dataObj = JSON.parse(req);
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);
    }








































































































































































































































































































    public login(username: string, password: string) {
        const dataObj = {
            "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
            "ServiceName": "OrangeBase",
            "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
            "MethodHash": "com.advantage.bean.account.WorkSession_validateWorkSession_String_String_String_String_String_String",
            "ArgumentList": [
                null,
                username,
                password,
                null,
                null,
                null
            ]
        };
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);

    }

    public apiSql(sql: string) {
        const dataObj = {
            "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
            "ServiceName": "OrangeCore",
            "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
            "MethodHash": "String_executeSQL_String",

            "ArgumentList": [sql]
        };
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data);

    }
















































































































































































    public getDataBeanInfoByPattern(request: string): Observable<BeanInfoPattern[]> {
        const dataObj = {
            "ServiceName": "OrangeCore",
            "MethodHash": "java.util.List_getDataBeanInfoByPattern_String",
            "ArgumentList": [
                request
            ]
        };
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data).pipe(map((item: any) => {
            return item.DataBeanProperties.ObjectValue.map((element: ObjectValue) => {
                return element.DataBeanProperties
            })
        }));
    }

    public getDataBeanMethodByName(request: string): Observable<DataBeanMethod[]> {
        const dataObj = {
            "ServiceName": "OrangeCore",
            "MethodHash": "java.util.List_getDataBeanMethodByName_String",
            "ArgumentList": [
                request
            ]
        };
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data).pipe(map((item: any) => {
            return item.DataBeanProperties.ObjectValue.map((element: ObjectValue) => {
                return element.DataBeanProperties
            })
        }));
    }

    public getDataBeanPropertyByName(request: string): Observable<BeanProperty[]> {
        const dataObj = {
            "ServiceName": "OrangeCore",
            "MethodHash": "java.util.List_getDataBeanPropertyByName_String",
            "ArgumentList": [
                request
            ]
        };
        const data = JSON.stringify(dataObj);
        return api.post(this.url, data).pipe(map((item: any) => {
            return item.DataBeanProperties.ObjectValue.map((element: ObjectValue) => {
                return element.DataBeanProperties
            })
        }));
    }




}