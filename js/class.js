// ES6 이전
// 재생산을 위한 객체 => 생성자함수 + 즉시실행함수

// var Person = (function(){
//     function Person(name){ // 생성자함수(대문자) -> 객체를 생성하기 위해 내부에 정의하는 함수
//         // 객체가 가질 필드 정의  
//         this._name = name; // _name -> 직접 접근하지마라(암묵적 약속, 숨겨진 필드), javascript는 private가 없음(최근엔 생기고 있음)
//     }

//     // 객체가 가질 메소드
//     Person.prototype.sayHi = function(){
//         console.log('Hi ' + this._name);
//     }

//     // 필드에 접근할 Setter, Getter
//     Person.prototype.setName = function(name){
//         this._name = name;
//     }

//     Person.prototype.geName = function(){
//         return this._name;
//     }

//     return Person;
// })(); // 내부에 대한 정보를 묶음, 즉시실행

// let userA = new Person('Hong');
// userA.sayHi();
// userA.setName('Adward');
// userA.sayHi();

// ES6 - let, const 방식으로 동작함
// java처럼 객체를 생성하기 위해 정의
class Person { 
    constructor(name){ // 반드시 생성자가 있어야함
        this._name = name;
    }

    sayHi(){ // 메소드
        console.log('Hi, new ' + this._name);
    }

    // javascript class에서 지원하고 있는 필드추가 방식
    set name(name){ 
        this._name = name;
    }

    // set없이 get만 있을 경우 readonly
    get name(){
        return this._name;
    }
}

let userB = new Person('Hong');
userB.sayHi();
userB.name = 'Lee';
console.log(userB.name);
userB.sayHi();        