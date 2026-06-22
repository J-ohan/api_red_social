/**
 * clase encargada de construir la respuesta 
 * del api estandar
 */

export class ResponseHelper {
    static success(
        data: any, 
        statusCode: number = 200,
    ){
        return {
            success: true,
            statusCode,
            data
        }
    }

    static error(
        data: any,
        statusCode: number = 400,
    ){
        return {
            success: false,
            statusCode,
            data
        }
    }
}