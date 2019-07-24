function makeAccount (initial){ /* your implementation */ };

var alice = makeAccount(300);
alice.deposit(100);
alice.withdraw(50);
console.log(alice.getBalance());        // prints: 350

