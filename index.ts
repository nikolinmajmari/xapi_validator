import { Length } from "./src/rules/length.ts";
import { NotNull } from "./src/rules/not_null.ts";
import validator from "./src/validator.ts";



class Person{

    @NotNull()
    @Length({
        min: 20,
        max: 100
    })
    name?:string|null = null;
}





const person = new Person();
person.name = 'name';
const result = validator.validate(person);
if(result.hasVoilations){
    console.log(result.voilations);
}