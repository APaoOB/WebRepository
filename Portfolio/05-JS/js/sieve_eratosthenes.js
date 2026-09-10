/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.

var sieve = function (n) {
  "use strict";

  var array = [],
    primes = [],
    i,
    j;

  // TODO: Implement the sieve of eratosthenes algorithm to find all the prime numbers under the given number.
  for (i = 0; i < n; i++) {
    array[i] = true;
  }

  array[0] = false;
  array[1] = false;
  for (i = 2; i * i < n; i++) {
    if (array[i]) {
      for (j = i * i; j < n; j += i) {
        array[j] = false;
      }
    }
  }
  for (i = 2; i < n; i++) {
    if (array[i]) {
      primes.push(i);
    }
  }
  return primes;
};

document.getElementById("btn").addEventListener("click", function () {
  var input = document.getElementById("num");
  var output = document.getElementById("primes");
  var limit = Number(input.value);

  if (!Number.isInteger(limit) || limit < 2) {
    output.textContent = "Enter a whole number greater than or equal to 2.";
    return;
  }

  output.textContent = sieve(limit).join(", ");
});
