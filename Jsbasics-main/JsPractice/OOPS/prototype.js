function BankAccount(name, balance = 0) {
  this.name = name;
  this.accountNumber = Date.now();
  this.balance = balance;
}
BankAccount.prototype.deposit = function (balance) {
  this.balance += balance;
};
const mohitAccount = new BankAccount("Mohit", 0);
mohitAccount.deposit(2000);
console.log(mohitAccount);
