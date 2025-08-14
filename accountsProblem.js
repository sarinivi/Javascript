const accounts = [
    {
        name : 'Arun',
        accountNo : '001'
    },
    {
        name : 'Babu',
        accountNo : '002'
    },
    {
        name : 'Chandra',
        accountNo : '003'
    }
];
const balances = {
    '001' : 5000,
    '002' : 2000,
    '003' : 0
};

const transactions = [
    {
        accountNo : '001',
        type : 'withdrawal',
        amount : 1000
    },
    {
        accountNo : '001',
        type : 'deposit',
        amount : 500
    },
    {
        accountNo : '001',
        type : 'withdrawal',
        amount : 1000
    },
    {
        accountNo : '002',
        type : 'deposit',
        amount : 300
    },
    {
        accountNo : '002',
        type : 'withdrawal',
        amount : 200
    },
    {
        accountNo : '003',
        type : 'deposit',
        amount : 200
    },
];

const displayBalance = () => {
    accounts.forEach((account)=> account.balance = balances[account.accountNo]);
    console.log(accounts);
}

const updateAfterTransaction = () => {
    transactions.forEach((transaction) => {
        if(transaction.type === 'withdrawal'){
           balances[transaction.accountNo] -= transaction.amount;
        }
        else{
            balances[transaction.accountNo] += transaction.amount;
        }
    });
}

const main = () => {
    console.log("Before Transaction :");
    displayBalance();
    updateAfterTransaction();
    console.log("After Transaction :");
    displayBalance();
}
main();