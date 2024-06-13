///////////////////////////////////////////////
/*logArguments
Вам необхідно написати функцію-декоратор logArguments(fn),
 яка приймає на вхід функцію і додає можливість логувати всі аргументи, 
 передані у функцію-аргумент.*/
///////////////////////////////////////
function work(a) {
  return `Name arguments ${a}`;
}
function logArguments(fn) {
  return function () {    
    log.push([].slice.call(arguments));    
    return fn.apply(this, arguments);
  };
}
const log = [];

work = logArguments(work);

console.log(work(1)); // Name arguments 1
console.log(work(6)); // Name arguments 6
console.log(work(7)); // Name arguments 7

log.forEach((element) => {
  console.log(`Лог:${element}`);
}); // Лог:1   Лог:6   Лог:7
///////////////////////////////////////////////
/*validate
Вам необхідно написати функцію-декоратор validate(fn, validator),
 яка приймає на вхід функцію і додає можливість перевіряти аргументи,
  передані у функцію fn, на відповідність заданому validator.
   Якщо аргументи не проходять перевірку, то декоратор має викидати виняток.*/
//////////////////////////////////////////////
const validate = function (fn, validator) {
  return function (...args) {
      if (!validator(...args)) {
          throw new Error("Invalid arguments");
      }
      return fn(...args);
  };
};

let multiply = function (a, b) {
  return a * b;
};

const isIntegerValidator = function (...args) {
  return args.every(arg => Number.isInteger(arg));
};

multiply = validate(multiply, isIntegerValidator);


// Successful completion
try {
  const result1 = multiply(6, 8);
  console.log(result1);               // 48
} catch (error) {
  console.error(error.message);
}

// Error
try {
  const result2 = multiply(3, null);
  console.log(result2);
} catch (error) {
  console.error(error.message);       // Invalid arguments
}

///////////////////////////////////////////////////////////////////////////
/*retry
Вам необхідно написати функцію-декоратор retry(fn, maxAttempts),
 яка приймає на вхід функцію і додає можливість викликати функцію 
 з максимальною кількістю спроб у разі помилки та повертає результат останнього виклику.*/
 ///////////////////////////////////////////////////////////////////////////////////////

 function retry(fn, maxAttempts) {
  return function(...args) {
      let attempts = 0;
      function attempt() {
          try {
              return fn(...args);
          } catch (e) {
              attempts++;
              if (attempts < maxAttempts) {
                  return attempt();
              } else {
                  throw e;
              }
          }
      }
      return attempt();
  }
}

function mayFailFunction() {
  if (Math.random() > 0.5) {
      throw new Error("Помилка!");
  }
  return "Успіх!";
}

const safeFunction = retry(mayFailFunction, 3);

try {
  const result = safeFunction();
  console.log(result);                                 //Успіх!
} catch (e) {
  console.error("Усі спроби помилки:", e.message);     // Усі спроби помилки: Помилка!
}

///////////////////////////////////////////////////////////////////////////////////////////
 
