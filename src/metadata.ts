import { ConstraintArgs } from "./constraint.ts";

const key = Symbol('xapi-validation-rules');
const keyStr = key.toString();

declare type RuleMap = Map<string|symbol,any>;

const addRule = function(target: object, propertyKey: string|symbol,value:any){
    let ruleMap:RuleMap|undefined = Reflect.get(target.constructor,key);
    if(undefined === ruleMap){
        ruleMap = new Map();
    }
    if(!ruleMap.has(propertyKey)){
        ruleMap.set(propertyKey,[]);
    }
    ruleMap.set(propertyKey,[
        ...ruleMap.get(propertyKey),value
    ]);
    Reflect.set(target.constructor,key,ruleMap);
}

const getRules = function(target:object,propertyKey:string|symbol):[]{
     const ruleMap:RuleMap|undefined = Reflect.get(target.constructor,key);
     return ruleMap?.get(propertyKey);
}


const createConstraint = function<T extends ConstraintArgs>(validator:any,params?:T|undefined):PropertyDecorator{
    return (target: object, propertyKey: string | symbol)=>{
        addRule(target,propertyKey,new validator({
            ...params,
        }));
    }
}

export {
    addRule,getRules,createConstraint
}