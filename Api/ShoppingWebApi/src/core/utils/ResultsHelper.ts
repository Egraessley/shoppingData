import {Logger} from "./Logger";
import {RESTApi} from "../RestAPI";

export class ResultsHelper
{
    public static async sendResult(res, data, status:number = 200)
    {
        try
        {
            let jsonResponse: any = {
                data
            };

            if(res.hasOwnProperty('locals') && res.locals['activity'] != null)
            {
                res.locals['activity']['returnStatus'] = status;
                if (res.locals['total'] >= 0) {
                    jsonResponse.total = res.locals['total'];
                    jsonResponse.pages = res.locals['pages'];
                    jsonResponse.page = res.locals['page'];
                }
            }
            return await res.status(status).json(jsonResponse).end();
        }
        catch(err)
        {
            Logger.LogMessage('Unable to return request!' + err.message, "red");
            return false;
        }
    }

    public static async sendXmlResult(res, data, status:number = 200)
    {
        try
        {
            if(res.hasOwnProperty('locals') && res.locals['activity'] != null)
            {
                res.locals['activity']['returnStatus'] = status;
            }
            res.set('Content-Type', 'text/xml');
            res.set('Content-Disposition', 'attachment;filename="Order_'+data.order.orderNumber+'.xml"');
            return await res.status(status).send(data.xml).end();
        }
        catch(err)
        {
            Logger.LogMessage('Unable to return request!' + err.message, "red");
            return false;
        }
    }
    public static async sendPDFResult(res, data, status:number = 200)
    {
        try
        {
            if(res.hasOwnProperty('locals') && res.locals['activity'] != null)
            {
                res.locals['activity']['returnStatus'] = status;
            }
            res.set('Content-Type', 'application/pdf');
            res.set('Content-Disposition', 'attachment;filename="'+data.filename+'"');
            return await res.status(status).send(data.pdf).end();
        }
        catch(err)
        {
            Logger.LogMessage('Unable to return request!' + err.message, "red");
            return false;
        }
    }
    public static async sendCSVResult(res, data, status:number = 200)
    {
        try
        {
            if(res.hasOwnProperty('locals') && res.locals['activity'] != null)
            {
                res.locals['activity']['returnStatus'] = status;
            }
            res.set('Content-Type', 'text/csv');
            res.set('Content-Disposition', 'attachment;filename="'+data.filename+'"');
            return await res.status(status).end(data.csv);
        }
        catch(err)
        {
            Logger.LogMessage('Unable to return request!' + err.message, "red");
            return false;
        }
    }
    /**
     *
     * Checks if an Object as the required properties. Accepts a string array, or a class reference. See notes in https://confluence.printsites.io/pages/viewpage.action?pageId=47022947
     *
     * @apiParam {object} object
     * @apiParam {string[]} keys
     */
    public static async objectHasProperties(object:object, required:string[]|object)
    {
        if(object == null)
            return false;

        if(Array.isArray(required)) {
            let allKeys = Object.keys(object);

            for (let key of required) {
                if (allKeys.indexOf(key) < 0) {
                    if(RESTApi.instance.appSettings.DEBUG_MODE == 'true')
                        console.log('MISSING:'+key);
                    return false;
                }
            }
        }
        else
        {
            let requiredKeys:string[] = Object.keys(required);
            let allKeys = Object.keys(object);

            for (let key of requiredKeys) {
                if (allKeys.indexOf(key) < 0) {
                    if(RESTApi.instance.appSettings.DEBUG_MODE == 'true')
                        console.log('MISSING:'+key);
                    return false;
                }
            }
        }
        return true;
    }

    public static async snakeCase(str:string)
    {
        console.log('str',str);
        str = str.trim();
        console.log('str.trim',str);
        if(str.length <= 0 || str == null ||str == undefined)
        {
            return '';
        }

        str = str.toLowerCase();
        console.log('str.toLower',str);
        str = str.replace(' ', '_');
        console.log('return str',str);

        return str;
    }

    public static async titleCase(str) {
        let splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {

            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }

        return splitStr.join(' ');
    }

    public static HttpErrors = {
        FORBIDDEN:403,
        MISSING:404,
        SUCCESS:200,
        UNAUTHORIZED:401,
        SERVER_ERROR:500,
        IN_USE:208
    }

}