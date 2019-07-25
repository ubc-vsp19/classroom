function makeAccount (initial){
   var balance = initial;
   return {
       deposit: function(amount){
          balance += amount;
          return balance;
       },
       withdraw: function(amount){
          balance -= amount;
          return balance;
       },
       getBalance: function(){
          return balance;
       }
   };
};

var alice = makeAccount(300);
var bob = makeAccount(100);

bob.deposit(1000);
alice.deposit(100);
bob.withdraw(5);
alice.withdraw(50);
console.log("Alice has: "+alice.getBalance());        // prints: 350
console.log("Bob has: "+bob.getBalance());
