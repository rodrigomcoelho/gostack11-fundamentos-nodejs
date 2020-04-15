import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface AllTransaction {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): AllTransaction {
    return { transactions: this.transactions, balance: this.getBalance() };
  }

  public getBalance(): Balance {
    const incomeArr = this.transactions.map(trans =>
      trans.type === 'income' ? trans.value : 0,
    );

    const outcomeArr = this.transactions.map(trans =>
      trans.type === 'outcome' ? trans.value : 0,
    );

    const income = incomeArr.reduce((total, value) => total + value);
    const outcome = outcomeArr.reduce((total, value) => total + value);

    return { income, outcome, total: income - outcome };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
