function BankAccount(name, balance = 0) {
  this.name = name;
  this.accountNumber = Date.now();
  this.balance = balance;
  deposit = function (balance) {
    this.balance += balance;
  };
}

const mohitAccount = new BankAccount("Mohit", 0);
mohitAccount.deposit(1000);
console.log(mohitAccount);
