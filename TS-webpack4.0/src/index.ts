class Student {
  fullName: string;
  constructor(public firstName:string, public middleInitial:string, public lastName:string) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}
interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User2");

document.body.innerHTML = greeter(user);
function ff(...arg:any){
  console.log(arg);
}

ff({
  a:1,
  b:2
},{
  b:3,
  d:4
});