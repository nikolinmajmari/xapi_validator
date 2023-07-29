import Constraint, { ConstraintVoilation } from "./constraint.ts";
import { getRules } from "./metadata.ts";


class Validator{
    constructor(){}

    validate(target:any):ValidationResult{
        const propertyKeys = Object.getOwnPropertyNames(target);
        const voilations:ConstraintVoilation[] = [];
        for(const propertyKey of propertyKeys){
           voilations.push(
            ...this.validateProperty(target,propertyKey)
           )
        }


        return new ValidationResult(voilations);
    }


    validateProperty(target:any,propertyKey:string|symbol):ConstraintVoilation[]{
        const voilations:ConstraintVoilation[] = [];
        const value = target[propertyKey];
        const validationRules = getRules(target.constructor.prototype,propertyKey);
        validationRules.forEach((constraint:Constraint)=>{
            const result = constraint.validate(value);
            if(result.isInvalid){
                const message = result.validationMessage({value,propertyKey})!;
                voilations.push({constraint,message,value,propertyKey})
            }
        });
        return voilations;
    }
}

export class ValidationResult{
    #voilations: ConstraintVoilation[]
    constructor(voilations:ConstraintVoilation[]){
        this.#voilations = voilations;
    }
    get voilations(){ return this.#voilations;}

    get hasVoilations(){ return this.#voilations.length > 0;}
}

const validator = new Validator();

export default validator;

export {Validator};