import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

/* class decorator  */
// target: 就是class, 给class加一个method
function Greeter(greeting: string) {
  return function (target: Function) {
    target.prototype.greet = function () {
      console.log(greeting);
    };
  };
}

/* method decorator */
// target: Object, propertyKey:string | symbol (name of method)
// descriptor: PropertyDescriptor
function log(
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  let originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    // ... rest syntax. get an array of parameters
    console.log('wrapped function: before invoking ' + propertyKey);
    // let result = originalMethod.apply(this, args);
    let result = originalMethod.call(this, ...args); // ... spread syntax
    console.log('wrapped function: after invoking ' + propertyKey);
    return result;
  };
}

/* parameter decorator */
// target: Object, propertyKey: string | symbol (name of method)
// parameterIndex: number, positon of parameter
function outputPositionParam(
  target: Function,
  key: string,
  parameterIndex: number
) {
  let functionOutput = key || target.prototype.constructor;
  console.log(
    `The parameter in position ${parameterIndex} of method ${functionOutput} has been decorated`
  );
}

/* property decorator */
// target: object, key: property key
function logProperty(target: any, key: string) {
  delete target[key];

  const backingKey = '_' + key;
  Object.defineProperty(target, backingKey, {
    writable: true,
    enumerable: true,
    configurable: true,
  });

  // getter
  const getter = function (this: any) {
    const currVal = this[backingKey];
    console.log(`Get: ${key} => ${currVal}`);
    return currVal;
  };

  // settter
  const setter = function (this: any, newVal: any) {
    console.log(`Set: ${key} => ${newVal}`);
    this[backingKey] = newVal;
  };

  // create new Property with getter and setter
  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
@Greeter('Hero is great')
export class HeroComponent implements OnInit {
  @logProperty heroId!: number;

  constructor(private router: Router, private route: ActivatedRoute) {
    console.log('constructor of HeroComponent');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.heroId = +(params.get('id') || 0);
    });
  }

  @log
  backToHeroCenter() {
    this.router.navigate(['/herolist']);
  }

  printDecorator() {
    (this as any).greet(); // print ok
  }

  printId(@outputPositionParam newage: string) {
    console.log('new age is ' + newage);
  }
}
