// string, boolean, number, ...

let x: number = 30 

x = 100

console.log(x)
// inferencia x annotation

let y = 15
// é igual:
let z: number = 15;
//___________________________________________________________

//tipos básicos

let firstName: string = "Matheus";
let age: number = 26;
const isAdmin: boolean = true;

// String != string (Objeto nao é igual Tipo)
console.log(typeof firstName);
firstName = "João";

console.log(firstName)
//___________________________________________________________
// Object 
const myNumbers: number[] = [1, 2, 3] //colocar [] ao lado da tipagem, ao definir array

console.log(myNumbers);
console.log(myNumbers.length);
myNumbers.push(5)

console.log(myNumbers)
//___________________________________________________________
//Tuplas 
let myTuple: [number, string, string[]] //define exatamente o que deve ter dentro

myTuple = [10, "Matheus", ["a", "b", "c"]]

//myTuple = [true, false, true] // ele não irá deixar pois nao foi definido pra boolean

//___________________________________________________________
// Object Literals -> {prop: value}
const user: {name: string, age: number} = { //definindo a tipagem de um objeto
    name: "Matheus",
    age: 26
}

console.log(user);
console.log(user.name)
//___________________________________________________________
// any
let a: any = 0 // É um recurso que remove um pouco a filosofia do typescript
// é uma má prática pois se torna uma tipagem dinâmica, inutilizando o typescript:
a = "teste";
a = true;
a = [];
//___________________________________________________________
// Union type -> Quando sao sabe qual o tipo que será, e escolher mais de 1 tipo
let id: string | number = "10";

id = 200
// Nesse caso essa let id poderá ter string e number também.
//___________________________________________________________
// Type alias -> determinar nome de um tipo
type myIdType = number | string //no caso estamos criando uma especie de
//variável para os tipos number e string

const userId: myIdType = 10;
const productId: myIdType = "0001";
const shirId: myIdType = 123;
//___________________________________________________________
// enum
// ex: tamanho de roupas (size: médio, size: pequeno)
enum Size{
    P = "Pequeno",   //Criando nomes de características de algo com enum
    M = "Medio",     //Caso for usado em muitos lugares do código
    G = "Grande"     //Para que o código nao fique muito repetitivo e mais limpo
}

const camisa = {
    name: "Camisa gola V",
    size: Size.G     //Chamando o enum
};

console.log(camisa)
//___________________________________________________________
// Literal Types
let teste: "algum valor" //é um valor literal para um tipo, ou seja só pode ser isso

//teste = "outro valor" // nesse caso dá erro pois nao é o valor que foi definido
//___________________________________________________________

// Funções
function sum(a: number, b: number) {  //Tipando argumentos da função
    return a + b;
}

console.log(sum(12, 12));


function sayHelloTo(name: string): string { //Tipando retorno da função para ''string''
    return `Hello, ${name}`
}

console.log(sayHelloTo("Matheus"))

//Tipagem de funções que não retornam nada
function logger(msg: string): void { // void para explicitar que aquela função nao retorna nada
    console.log(msg);
}

logger('Teste!');

//Tornando argumento opcional
function greeting(name: string, greet?: string) { //o ? torna o argumento opcional
    console.log(`olá ${greet} ${name}`)
} //Porém nesse caso, caso nao seja inserido o greet, ele retornará como undefined

//Para resolver isso teremos que inserir um if:

function greeting2(name: string, greet?: string) {
    if (greet) {
        console.log(`Olá ${greet} ${name}`)
    } else 
        console.log(`Olá ${name}`)
}

greeting2("Matheus")
greeting2("Matheus", "Sir")
//___________________________________________________________

//Inferfaces -> Padronizar algo para ser reutilizado como tipo
interface MathFunctionParams {
    n1: number,
    n2: number
}

function sumNumbers(nums: MathFunctionParams) {
    return nums.n1 + nums.n2
}

console.log(sumNumbers({ n1: 1, n2: 2 }))



function multiplyNumbers(nums: MathFunctionParams) {
    return nums.n1 * nums.n2
}

const someNumbers: MathFunctionParams = { 
    n1: 5,
    n2: 10
}   
 
console.log(multiplyNumbers(someNumbers))
//___________________________________________________________
// Narrowing -> Checagem de tipos

function doSomething(info: number | boolean) {
    if(typeof info === "number") {
        console.log(`O número é ${info}`)
        return;
    } 
    console.log("Não foi passado um número");
}

doSomething(5)
doSomething(true)
//___________________________________________________________
// Generics -> Eu quero executar uma ação que ele trabalhe com um tipo de dados, porém pode ser qualquer um

function showArrayItems<T>(arr: T[]) {
    arr.forEach((item) => {
        console.log(`ITEM: ${item}`)
    })
}

const a1 = [1, 2, 3];
const a2 = ["a", "b", "c"];

showArrayItems(a1);
showArrayItems(a2);
//___________________________________________________________
// Classes

class User{
    name;
    role;
    isApproved;

    constructor(name: string, role: string, isApproved: boolean) {
        this.name = name;
        this.role = role
        this.isApproved = isApproved
    }
    showUserName() {
        console.log(`O nome do usuário é ${this.name}`)
    }
    showUserRole(canShow: boolean): void {
        if(canShow){
            console.log(`A função do usuário é: ${this.role}`)
            return;
        }
        console.log("Função restrita.")
    }
}

const matheus = new User ("Matheus", "Programador", true);

console.log(matheus)
matheus.showUserName();

matheus.showUserRole(true)
//___________________________________________________________
// Interfaces em classes -> dita como a classe irá se comportar
interface IVehicle {   
    brand: string         // É usado quando um projeto tem classes muito parecidas
    showBrand(): void     
}

class Car implements IVehicle { // Implementando a interface na classe Car
    brand                       // Nesse caso a class terá que seguir o que foi definido na interface acima
    wheels                      // Deverá obrigatóriamente ter brand e showBrand()
    constructor(brand:string, wheels: number) {
        this.brand = brand
        this.wheels = wheels
    }
    showBrand(): void {
        console.log(`A marca do carro é: ${this.brand}`)
    }
}

const fusca = new Car("VW", 4)

fusca.showBrand();
//___________________________________________________________

// Herança 

class SuperCar extends Car { // Quando herda nao é preciso aplicar a interface novamente    
// A interface é aplicada apenas na class pai
    engine

    constructor(brand: string, wheels: number, engine: number) {
        super(brand, wheels) // Super() é um metodo constructor para puxar as propriedades da classe Pai (Car)
        this.engine = engine
    }
}

const a4 = new SuperCar("Audi", 4, 2.0);

console.log(a4)

a4.showBrand()
//___________________________________________________________

// Decorators -> Bastante utilizado para validação de dados
// para utilizar o decorators deve ir em tsconfig e descomentar experimentalDecorators
function BaseParameters () {
    return function <T extends {new(...args: any[]): {}}>(constructor: T) {
        return class extends constructor{
            id = Math.random()
            createdAt = new Date();
        }
    }
} 

@BaseParameters()
class Person {
    name;

    constructor(name: string){
        this.name = name;
    }
}

const sam = new Person("Sam")

console.log(sam)