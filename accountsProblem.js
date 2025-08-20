const accounts = [
    { 
        name: 'Arun', 
        accountNo: '001' 
    },
    { 
        name: 'Babu', 
        accountNo: '002' 
    },
    { 
        name: 'Chandra', 
        accountNo: '003' 
    }
];

const balances = {
    '001': 5000,
    '002': 2000,
    '003': 0
};

const transactions = [
    { 
        accountNo: '001', 
        type: 'withdrawal', 
        amount: 1000 
    },
    { 
        accountNo: '001', 
        type: 'deposit', 
        amount: 500 
    },
    { 
        accountNo: '001', 
        type: 'withdrawal', 
        amount: 1000 
    },
    { 
        accountNo: '002', 
        type: 'deposit', 
        amount: 300 
    },
    { 
        accountNo: '002', 
        type: 'withdrawal', 
        amount: 200 
    },
    { 
        accountNo: '003', 
        type: 'deposit', 
        amount: 200 
    }
];

const displayBalances = () => {
    const accountsWithBalances = accounts.map(account => ({
        ...account,
        balance: balances[account.accountNo]
    }));
    console.log(accountsWithBalances);
};

const updateBalancesAfterTransactions = () => {
  transactions.forEach(({ accountNo, type, amount }) => {
    balances[accountNo] += (type === 'withdrawal' ? -amount : amount);
  });
};

const main = () => {
    console.log("Before Transaction:");
    displayBalances();

    updateBalancesAfterTransactions();

    console.log("After Transaction:");
    displayBalances();
};
main();