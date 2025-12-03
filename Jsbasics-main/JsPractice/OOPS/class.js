class BankAccount {
  constructor(name, balance = 0) {
    this.name = name;
    this.accountNUmber = Date.now();
    this.balance = balance;
  }
  deposit(amount) {
    this.balance += amount;
  }
}

const raviAccount = new BankAccount("ravi", 1000);
raviAccount.deposit(200);
console.log(raviAccount);
