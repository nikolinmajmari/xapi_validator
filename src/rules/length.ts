import Constraint,{ ConstraintArgs, ConstraintValidation, inValid, result, valid } from "../constraint.ts";
import { createConstraint } from "../metadata.ts";

export interface LengthArgs extends ConstraintArgs{
    min?:number,
    max?:number,
}

export class Lengthonstraint extends Constraint {
    
    #minVoilationMessage = 'This value is too short. It should have {{ limit }} character or more.';
    #maxVoilationMessage = 'This value is too long. It should have {{ limit }} character or less.';

    args: LengthArgs;

    constructor(args:LengthArgs={}){
        if(null === args.min && null === args.max){
            throw Error('either one of min or max parameters is required on this constraint');
        }
        super(args);
        this.args = args;
    }

    validate(value: any): ConstraintValidation{
        if(value.length == undefined){
            throw Error('value should contain length method');
        }
        if(this.args.max && this.args.max < value.length){
            return inValid({
                message: this.#maxVoilationMessage,
                args: {limit:this.args.max}
            });
        }
        if(this.args.min && this.args.min > value.length){
            return inValid({
                message: this.#minVoilationMessage,
                args: {limit: this.args.min}
            })
        }
        return valid();
    }
}


export function Length(params?:LengthArgs):PropertyDecorator{
    return createConstraint(Lengthonstraint,params);
}
