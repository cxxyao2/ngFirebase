// a decorator with a parameter
function Greeter(greeting: string) {
  return function (target: Function) {
    target.prototype.greet = function (): void {
      console.log(greeting);
    };
  };
}

@Greeter('Hello Ts')
class Greeting {
  constructor(passant: string) {
    console.log('Greeting  a ' + passant);
  }
}

let myGreeting = new Greeting(' belle fille ');
myGreeting.greet(); // node decoClassParam.ts  , run , ok.
(myGreeting as any).greet(); // ok
