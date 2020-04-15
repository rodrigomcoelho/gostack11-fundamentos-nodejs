import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    if (type === 'outcome') {
      const amount = this.transactionsRepository.getBalance();
      if (amount.total < value || value < 0)
        throw new Error('A outcome transaction must have a valid balance');
    }

    const transaction = new Transaction({
      title,
      type,
      value,
    });

    this.transactionsRepository.create(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
