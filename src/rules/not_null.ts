import Constraint,{ ConstraintArgs, ConstraintValidation, result } from "../constraint.ts";
import { createConstraint } from "../metadata.ts";

export class NotNullConstraint extends Constraint {
    
    message = '{{ propertyKey }} should not be null';

    constructor(args:ConstraintArgs={}){
        super(args);
    }

    validate(value: any): ConstraintValidation{
        return result(value!==null,this);
    }
}


export function NotNull(params?:ConstraintArgs):PropertyDecorator{
    return createConstraint(NotNullConstraint,params);
}
