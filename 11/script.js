'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,

};
const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};



const accounts = [account1, account2, account3, account4];
const account5 = {
    owner: 'Himanshu Jangid',
    movements: [50, 85, 759, 465, 58, -58, -39, -879, 65, 822, -85],
    interestRate: 1.75,
    pin: 5555,
};
const account6 = {
    owner: 'Rajesh Kumar',
    movements: [50, 125, 1000, 500000, 122222, 800000, 82, -50000],
    interestRate: 1.75,
    pin: 6666,
};
const account7 = {
    owner: 'Mahesh Chand Sharma',
    movements: [50, 125, 1000, 500000, 122222, 800000, 82, -50000],
    interestRate: 1.75,
    pin: 7777,
};
const account8 = {
    owner: 'Jyoti KSharma',
    movements: [50, -895, -23699, 45968, 123665, 52000, 56585, 23655, 569855, -215],
    interestRate: 1.75,
    pin: 8888,
};
const account9 = {
    owner: 'Shreyansh Charma',
    movements: [50, -895, -23699, 45968, 123665, 52000, 56585, 23655, 569855, -215],
    interestRate: 1.75,
    pin: 9999,
};
const account10 = {
    owner: 'Deepanshu Jajoriya',
    movements: [50, -895, -23699, 45968, 123665, 52000, 56585, 23655, 569855, -215],
    interestRate: 1.75,
    pin: 9999,
};
const account11 = {
    owner: 'Ashwini Kumar Sharma',
    movements: [5000, 565, 669, -566, -699, 569865, 458854, -998, 7, 7788, 2525, -56],
    interestRate: 1.75,
    pin: 6666,
};
accounts.push(account6)
accounts.push(account11)
accounts.push(account5)
accounts.push(account7)
accounts.push(account8)
accounts.push(account9)
accounts.push(account10)
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
    containerMovements.innerHTML = ' '

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
    let call;
    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal'

        const html = `<div class="movements__row">
    <div class="movements__type       movements__type--${type}">${i + 1} - ${type}</div>

    <div class="movements__value">${mov}</div>`
        containerMovements.insertAdjacentHTML('beforeend', html)

    })

}


const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0)
    labelBalance.textContent = `${acc.balance} ₹`
    const date = new Date();
    labelDate.textContent = date
}



const calcDisplaySummary = function (acc) {
    const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
    labelSumIn.textContent = `${incomes}₹`


    const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(outcomes)}₹`

    const interests = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.interestRate / 100).filter((int, i, arr) => int > 1).reduce((acc, mov) => acc + mov, 0)
    labelSumInterest.textContent = `${interests}₹`
}



const createUserNames = function (accs) {
    accs.forEach(function (acc) {
        acc.userName = acc.owner.toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    })
}
createUserNames(accounts)
const updateUi = function (acc) {
    //display movements
    displayMovements(acc.movements)
    //display balance
    calcDisplayBalance(acc)
    // display summary
    calcDisplaySummary(acc)

}

let curruntAccount;
// event handler
btnLogin.addEventListener('click', function (e) {
    // preventing form from submitting
    e.preventDefault();

    curruntAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);

    if (curruntAccount?.pin === Number(inputLoginPin.value)) {
        // display ui and message
        labelWelcome.textContent = `Welcome Back ${curruntAccount.owner.split(' ')[0]}`
        containerApp.style.opacity = 100;
        // clear input fields
        inputLoginUsername.value = inputLoginPin.value = ''
        inputLoginPin.blur();
        updateUi(curruntAccount);

    }
    else {
        alert('User Not Found');
        inputLoginUsername.value = inputLoginPin.value = ''
    }
    [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
        //         // 0, 2, 4, 6
        if (i % 2 === 0) row.style.backgroundColor = '#038095';
        if (i % 2 != 0) row.style.backgroundColor = '#a9a300';
    });
})

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(curruntAccount);
    const amount = Number(inputTransferAmount.value);
    const recieverAcc = accounts.find(acc => acc.userName === inputTransferTo.value)
    inputTransferTo.value = inputTransferAmount.value = ''
    if (amount > 0 && recieverAcc && curruntAccount.balance >= amount && recieverAcc?.userName !== curruntAccount) {
        curruntAccount.movements.push(-amount)
        recieverAcc.movements.push(amount);
        updateUi(curruntAccount);
    }
})

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value)
    if (amount > 0 && curruntAccount.movements.some(mov => mov >= amount * 0.1)) {
        // add the movement 
        curruntAccount.movements.push(amount);
        updateUi(curruntAccount);
        inputLoanAmount.value = ''
    }
    else {
        alert('you are Not eligible for this loan amount')
        inputLoanAmount.value = ''
    }
})

btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    if (Number(inputClosePin.value) === curruntAccount.pin && inputCloseUsername.value === curruntAccount.userName) {
        const index = accounts.findIndex(acc => acc.userName === curruntAccount.userName)
        // deleting account
        accounts.splice(index, 1)

        // hiding ui
        containerApp.style.opacity = 0;
    }
    else {
        alert('wrong detailes');

    }
    inputClosePin.value = inputCloseUsername.value = ''
    labelWelcome.textContent = `Log in to get started`
})

let sortedstate = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(curruntAccount.movements, !sortedstate)
    sortedstate = !sortedstate;
})

// /// banks's networth
// // flat method
// const networth = accounts.map(acc => acc.movements).flat().reduce((add, mov) => add + mov, 0);
// console.log(`Networth : ${networth} ₹`);



// // flat map
// const networth2 = accounts.flatMap(acc => acc.movements).reduce((add, mov) => add + mov, 0);
// console.log(`Networth : ${networth2} ₹`);







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// shelf done ////////////////////////////////////////////////////////////////////////////////////////////////////////////
// btnLogin.addEventListener("click", function (p) {
//     let boxer;
//     p.preventDefault();
//     const hi = document.querySelector('.login__input--user').value;
//     console.log(hi);
//     const bye = Number(inputLoginPin.value);
//     console.log(bye);
//     if (hi === accounts[0].owner.slice(0, 4) && bye === 1111) {
//         boxer = account1
//     }
//     else if (hi === accounts[1].owner.slice(0, 4) && bye === 2222) {
//         boxer = account2;
//     }
//     else if (hi === accounts[2].owner.slice(0, 4) && bye === 3333) {
//         boxer = account3;
//     }
//     else if (hi === accounts[3].owner.slice(0, 4) && bye === 4444) {
//         boxer = account4;
//     }



//     const displayMovements = function (movements) {
//         containerMovements.innerHTML = ' '
//         movements.forEach(function (mov, i) {
//             const type = mov > 0 ? 'deposit' : 'withdrawal'
//             const html = `<div class="movements__row">
//         <div class="movements__type       movements__type--${type}">${i + 1} - ${type}</div>

//         <div class="movements__value">${mov}</div>`

//             containerMovements.insertAdjacentHTML('beforeend', html)

//         })

//     }
//     displayMovements(boxer.movements);
//     const calcDisplayBalance = function (movements) {
//         const balance = movements.reduce((acc, cur) => acc + cur, 0)
//         labelBalance.textContent = `${balance} ₹`
//         const date = new Date();
//         labelDate.textContent = date
//     }

//     calcDisplayBalance(boxer.movements)

//     const calcDisplaySummary = function (movements) {
//         const incomes = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
//         labelSumIn.textContent = `${incomes}₹`


//         const outcomes = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
//         labelSumOut.textContent = `${Math.abs(outcomes)}₹`

//         const interests = movements.filter(mov => mov > 0).map(deposit => deposit * 1.2 / 100).filter((int, i, arr) => int > 1).reduce((acc, mov) => acc + mov, 0)
//         labelSumInterest.textContent = `${interests}₹`
//     }

//     calcDisplaySummary(boxer.movements)

// })



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// //////////////////////////////////////////
// let arr = ['a', 'b', 'c', 'd', 'e']

// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log([...arr]);


// //splice
// console.log(arr.splice(2));
// arr.splice(-1);
// console.log(arr);
// arr.splice(1, 2)
// console.log(arr);

// // reverse

// arr = ['a', 'b', 'c', 'd', 'e']
// const arr2 = ['j', 'i', 'h', 'g', 'f']
// console.log(arr2.reverse());
// console.log(arr);

// // concat
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);
// console.log(letters.join('-'));




// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


// // for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//     if (movement > 0) {
//         console.log(`movement ${i + 1} : you deposited ${movement} ₹`);
//     }
//     else {
//         console.log(`movement ${i + 1} : you withdraw ${Math.abs(movement)} ₹`);
//     }
// }

// console.log('--------FOREACH---------');
// movements.forEach(function (mov, i, arr) {
//     if (mov > 0) {
//         console.log(`movement ${i + 1} : you deposited ${mov} ₹`);
//     }
//     else {
//         console.log(`movement ${i + 1} : you withdraw ${Math.abs(mov)} ₹`);
//     }
// })
// //0:function(200)
// // 1:function(450)
// // 0:function(400)
// //.....


// const currencies = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//     console.log(`${key} : ${value}`);
// })

// set /



// // /////////////// coding challange-1//////////////////
// const checkDogs = function (dogJulia, dogKate) {
//     console.log(dogJulia);
//     const dogJuliaCorrected = dogJulia.slice();
//     console.log(dogJuliaCorrected);
//     dogJuliaCorrected.splice(0, 1);
//     console.log(dogJuliaCorrected);
//     dogJuliaCorrected.splice(-2);

//     console.log(dogJuliaCorrected);
//     const dogs = dogJuliaCorrected.concat(dogKate);
//     console.log(dogs);
//     for (const i of dogs.entries()) {
//         console.log(i);
//     }

//     dogs.forEach(function (dog, i) {
//         if (dog >= 3) {
//             console.log(`dog nubmer ${i + 1} is an adult,and dog is ${dog} years old`);
//         }
//         else {
//             console.log(`dog number ${i + 1} is still apuppy and ${dog} years old`);
//         }
//     })
// }
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);




//////////////////////coding challange -2 ////////////////////
// const humanAverageage = function (dogs) {
//     const humanAge = dogs.map((dogAge) => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4));
//     console.log(`humanAge : ${humanAge}`);
//     const fileteredAge = humanAge.filter((nage) => nage >= 18)
//     console.log(`filetred : ${fileteredAge}`);
//     const reduced = fileteredAge.reduce((acc, cur) => acc + cur)
//     return console.log(` The Average Age is : ${reduced / fileteredAge.length}`);

// }
// humanAverageage([5, 2, 4, 1, 15, 8, 3])
// humanAverageage([16, 6, 10, 5, 6, 1, 4])



//////////////////////// coding challange -3/////////



// const humanAverageage = dogs => dogs.map((dogAge) => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4)).filter((nage) => nage >= 18).reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)
// console.log(humanAverageage([5, 2, 4, 1, 15, 8, 3]));
// console.log(humanAverageage([16, 6, 10, 5, 6, 1, 4]));


// ////////////////////////////////////// coding challange -4///////////////////

// const dogs = [
//     { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//     { weight: 8, curFood: 200, owners: ['Matilda'] },
//     { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//     { weight: 32, curFood: 340, owners: ['Michael'] },
// ];
// console.log(dogs[0].owners);

// ////////1.
// dogs.forEach(dog => dog.recfood = Math.trunc(dog.weight ** 0.75 * 28));
// console.log(dogs);

// ///////2.
// const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'))
// console.log(dogSarah);
// console.log(`sarah's dog is eating ${dogSarah.curFood > dogSarah.recfood ? 'much' : 'little'}`);

// //////////3.

// // ////////////////// self done
// // const ownerEatTooMuch = [];
// // const ownerEatToolow = [];
// // dogs.forEach(dog => dog.curFood > dog.recfood ? ownerEatTooMuch.push(...dog.owners) : ownerEatToolow.push(...dog.owners))
// // console.log(ownerEatTooMuch);
// // console.log(ownerEatToolow);

// const ownerEatTooMuch = dogs.filter(dog => dog.curFood > dog.recfood).flatMap(dog => dog.owners);
// const ownerEatTooLow = dogs.filter(dog => dog.curFood < dog.recfood).flatMap(dog => dog.owners);
// console.log(ownerEatTooMuch);
// console.log(ownerEatTooLow);


// ////////////4.
// console.log(`${ownerEatTooMuch.join(' and ')}'s dogs eat too much`);
// console.log(`${ownerEatTooLow.join(' and ')}'s dogs eat too low`);


// /////////////5.
// console.log(dogs.some(dog => dog.curFood === dog.recfood));

// ////////////6.
// const ckeckEatingOk = dog => dog.curFood > dog.recfood * 0.9 && dog.curFood < dog.recfood * 1.1
// console.log(dogs.some(ckeckEatingOk));



// /////////7.
// console.log(dogs.filter(ckeckEatingOk).flatMap(dog => dog.owners));

// ////////////////8.
// const dogsCopy = dogs.slice().sort((a, b) => a.recfood - b.recfood).flatMap(dog => dog.owners)
// console.log(dogsCopy);






////////////////// the find method 

// const firstWithdrwal = account1.movements.find(mov => mov < 0)
// console.log(firstWithdrwal);
// console.log(accounts);











const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;
// const movementsUsd = movements.map(function (mov) {
//     return mov * eurToUsd
// })
// console.log(movements);
// console.log(movementsUsd);
// const movementsUsdFor = [];
// for (const mov of movements) movementsUsdFor.push(mov * 1.1)
// console.log(movementsUsdFor);

// const movementsarrow = movements.map((mov) => mov * 1.1);
// console.log(movementsarrow);

// const movemnetsDesctptd = movements.map((mov, i, arr) => {

//     if (mov > 0) {
//         return `  movement ${i + 1} : you deposited ${mov} ₹`;
//     }
//     else {
//         return `movement ${i + 1} : you withdraw ${Math.abs(mov)} ₹`;
//     }
// })
// console.log(movemnetsDesctptd);
// const see = movements.map((mov, i, arr) => {
//     console.log(mov, i, arr);
// });





/////////////// filter method\\\\\
// const deposits = movements.filter(function (mov) {
//     return mov > 0;
// })
// console.log(`deposits:`, deposits);
// const withdrawal = movements.filter(function (mov) {
//     return mov < 0;
// })
// console.log(`withdrawal:`, withdrawal);
// const depositFor = []
// const withdrwalFor = []
// for (const mov of movements) {
//     if (mov > 0) { depositFor.push(mov) }
//     else { withdrwalFor.push(mov); }
// }
// console.log(depositFor);
// console.log(withdrwalFor);
// const withdrwalsArrow = movements.filter(mov => mov < 0);
// console.log(withdrwalsArrow);



///// reduce method
// console.log(movements);
// const balance = movements.reduce(function (acc, cur, i, arr) {
//     console.log(`iteration ${i}: ${acc} ;; ${cur}`);
//     return acc + cur
// }, 0)
// console.log(balance);
// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

// const balanceArrow = movements.reduce((acc, cur) => acc + cur)
// console.log(balanceArrow);

// //maximum value
// const max = movements.reduce((acc, mov) => {

//     if (acc > mov)
//         return acc;
//     else {
//         return mov
//     }
// }, movements[0])
// console.log(max);


// const eurTOUsd = 1.1;
// const totalDeposits = movements.filter(mov => mov > 0).map(mov => mov * eurTOUsd).reduce((acc, mov) => acc + mov, 0);
// console.log(totalDeposits);


// console.log(movements);
// // equality
// console.log(movements.includes(-650));

// // some: condition
// const anyDeposits = movements.some(mov => mov > 5000)
// console.log(anyDeposits);

// // every method
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));


// // seprate call back

// const depsit = mov => mov > 0;
// console.log(movements.some(depsit));


// const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9], 10, 11];
// console.log(arr.flat());

// const arrDep = [[[1, 2, 3], [4, 5, 6]], [7, [8, 9]], 10, 11];
// console.log(arrDep.flat());
// console.log(arrDep.flat(2));

// // shorting arrays
// // strings
// const owners = ['jonas', 'zach', 'adam', 'marthga'];
// console.log(owners.sort());
// console.log(owners);
// // numbers
// console.log(movements);
// console.log(movements.sort());   // not in correct way

// // ascending order
// // return <0 , a,b
// // return >0 , b,a
// movements.sort((a, b) => { // two consecutive numbers

//     if (a > b) {

//         return 1; // switch order

//     }
//     else if (b > a) {

//         return -1; // keep order

//     }
// })
// console.log(movements);
// // descending order
// // return >0 , a,b
// // return <0 , b,a
// console.log(movements.slice().sort((a, b) => b - a));
// movements.sort((a, b) => b - a)
// console.log(movements);


// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// console.log(new Array(1, 2, 3, 4, 5, 6, 7, 8, 9));

// // empty array
// const x = new Array(7);
// console.log(x);

// x.fill(1, 3, 5)
// console.log(x);

// x.fill(23, 2, 6)
// console.log(x);
// //array from

// const y = Array.from({ length: 7 }, () => 1)
// console.log(y);

// const z = Array.from({ length: 7 }, (cur, i) => 23 + i)
// console.log(z);



// labelBalance.addEventListener('click', function () {
//     const movemnetsUi = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('₹', '')))
//     console.log(movemnetsUi);
// })


