
export const enum HttpStatusCodes {
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    MethodNotAllowed = 405,
}

export class HttpError extends Error {
    constructor(message: string, private __httpStatusCode: number) {
        super(message);
    }

    HttpStatusCode() {
        return this.__httpStatusCode;
    }
}

export function HttpNotFound(msg = 'not found') {
    return new HttpError(msg, HttpStatusCodes.NotFound);
}

export function HttpBadRequest(msg = 'bad input') {
    return new HttpError(msg, HttpStatusCodes.BadRequest);
}

export const HttpParamValidators = {
    MustBeString(obj: any, key: string, min = 1, max = 512) {
        const v = obj[key];
        if (typeof v !== 'string') {
            throw HttpBadRequest(`${key} must be string`);
        }
        if (v.length < min) {
            throw HttpBadRequest(`${key} must be at least ${min} characters`);
        }
        if (v.length > max) {
            throw HttpBadRequest(`${key} must be shorter than ${max} characters`);
        }
        return v;
    },
    MustBeNumber(obj: any, key: string, min = 1, max =512){
        const v = obj[key];
        if (typeof v !== 'number') {
            throw HttpBadRequest(`${key} must be number`);
        }
        // return positive number
        return +v
    },
    CheckPhone(obj: any, key: string, min = 1, max =512){
        const v=obj[key];
        if (typeof v !== 'string') {
            throw HttpBadRequest(`${key} must be string`);
        }
        if (v.length < min) {
            throw HttpBadRequest(`${key} must be at least ${min} characters`);
        }
        if (v.length > max) {
            throw HttpBadRequest(`${key} must be shorter than ${max} characters`);
        }
        if(!Number.isInteger(+v)){
            throw HttpBadRequest(`${key} can't contain chacacter`)
        }
        return v
    },
    MustBeArray(obj: any, key: string){
        const v=obj[key];
        if(!Array.isArray(v)){
            throw HttpBadRequest(`${key} must be array`)
        }
        v.forEach(item=>{
            return HttpParamValidators.MustBeString({item:item},'item',2)
        })
        return v
    },
    MustBeOneOf<T>(obj: any, key: string, values: T[] = []): T {
        const value = obj[key];
        for (const v of values) {
            if (v === value) {
                return v;
            }
        }
        throw HttpBadRequest(`${key} must be one of ${values.join(',')}`);
    },
    MustBeArrayNumber(obj: any, key: string){
        const v=obj[key];
        if(!Array.isArray(v)){
            throw HttpBadRequest(`${key} must be array`)
        }
        v.forEach(item=>{
            if(typeof item!=='number'){
                throw HttpBadRequest(`item in ${key} must be number`);
            }
            if(item>6 || item<0){
                throw HttpBadRequest(`item in ${key} must in [0,6]`)
            }
            return item
        })
        return v
    },
    MustBeEmail(obj:any, key: string){
        const v=obj[key];
        if(!v.endsWith("@gmail.com" )){
            throw HttpBadRequest(`${key} must contain @gmail.com`)
        }else if(v.length<12){
            throw HttpBadRequest(`${key} must be 12 characters`)
        }
        return v
    }
}