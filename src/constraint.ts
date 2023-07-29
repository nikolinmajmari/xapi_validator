/**
 * 
 */
export interface Args{
    [key:string]:any;
}

/**
 * 
 */
export interface ConstraintArgs extends Args{
    message?:string;
}

export interface IConstraint{
    message:string,
    args:ConstraintArgs
}


/**
 * 
 */
export default class Constraint{
    message?:string;
    args:ConstraintArgs;

    constructor(args:ConstraintArgs={}){
        const {message,...rest} = args;
        this.message = message ?? 'Constraint was voilated';
        this.args = {...rest};
    }

    validate(value:any): ConstraintValidation{
       throw new Error('implement method');
    }
}

/**
 * 
 */
export class ConstraintValidation{
    #validationStatus:boolean;
    #constraint:IConstraint|undefined;
    constructor(
         result:boolean,
         constraint?:IConstraint|undefined
    ){
        this.#validationStatus = result;
        if(this.isInvalid && constraint==null){
            throw Error('please specify IConstraint in case constraint validation is voilated when creating a Constraint Validation Instance')
        }
        this.#constraint = constraint;
    }

    get isValid(){return this.#validationStatus===true;}

    get isInvalid(){ return this.#validationStatus===false;}

    validationMessage(extra:{[key:string]:any}):string|null{
        if(this.isInvalid){
            let message = this.#constraint!.message;
            const params = {...this.#constraint!.args,...extra};
            for(const key in params){
                message = message.replaceAll(`{{ ${key} }}`,params[key]);
            }
            return message;
        }
        return null;
    }
}


/**
 * 
 */
export interface ConstraintVoilation{
    value:any;
    message:string;
    propertyKey:string|symbol;
    constraint:Constraint;
}

/**
 * 
 */
export function result(result:boolean,constraint:IConstraint):ConstraintValidation{
    return new ConstraintValidation(result,constraint);
}

export function inValid(constraint:IConstraint):ConstraintValidation{
      return new ConstraintValidation(false,constraint);
}

export function valid():ConstraintValidation{
      return new ConstraintValidation(true);
}