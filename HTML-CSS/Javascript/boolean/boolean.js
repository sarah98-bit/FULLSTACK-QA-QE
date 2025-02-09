//verify password funtion
import bcrypt from 'bcryptjs'
const password = "SECURE@123"
const hashedPassword = bcrypt.hashSync(password,10)
console.log(hashedPassword)
const comparePaswwords = bcrypt.compareSync(password , hashedPassword)
function authLogin(){
    if (comparePaswwords){
        console.log(true)
    }
    else{
        console.log(false)
    }
}
authLogin()


// function to verify MFA
async function verifyMFAHash(enteredCode, storedHashedCode) {
    return await bcrypt.compare(enteredCode, storedHashedCode);
}

// Example Usage:
async function test() {
    const mfaCode = "123456";
    const hashedCode = await bcrypt.hash(mfaCode, 10);

    console.log(await verifyMFAHash(mfaCode, hashedCode)); // true
    console.log(await verifyMFAHash("mfaCode", hashedCode)); // false
}

test();

// function to check balance
function checkBalance(enteredBalance, storedHashedBalance) {
    return bcrypt.compareSync(enteredBalance, storedHashedBalance);
}
const balance = "10000";
const hashedBalance = bcrypt.hashSync(balance, 10); 

console.log("Stored Hashed Balance:", hashedBalance); 
console.log(checkBalance(balance, hashedBalance)); // true
console.log(checkBalance("500", hashedBalance)); // false

//function to check daily limit

function checkDailyLimit(transactionAmount, hashedDailyLimit) {
    return bcrypt.compareSync(transactionAmount.toString(), hashedDailyLimit);
}
const dailyLimit = "1000";
const hashedDailyLimit = bcrypt.hashSync(dailyLimit, 10);

console.log("Stored Hashed Daily Limit:", hashedDailyLimit);

console.log(checkDailyLimit(dailyLimit, hashedDailyLimit)); // true (within limit)
console.log(checkDailyLimit(1500, hashedDailyLimit)); // false (exceeds limit)


//function for the withdrawal process

function verifyPassword(enteredPassword, storedHashedPassword) {
    return bcrypt.compareSync(enteredPassword, storedHashedPassword);
}
function verifyMFA(enteredMFA, actualMFA) {
    return enteredMFA === actualMFA;
}
function CheckBalance(withdrawalAmount, storedHashedBalance) {
    return bcrypt.compareSync(withdrawalAmount.toString(), storedHashedBalance);
}
function processWithdrawal(
    enteredPassword, storedHashedPassword,
    enteredMFA, actualMFA,
    withdrawalAmount, storedHashedBalance,
    storedHashedDailyLimit
) {
    if (!verifyPassword(enteredPassword, storedHashedPassword)) {
        return "Transaction Failed: Incorrect password.";
    }

    if (!verifyMFA(enteredMFA, actualMFA)) {
        return "Transaction Failed: MFA failed.";
    }

    if (!CheckBalance(withdrawalAmount, storedHashedBalance)) {
        return "Transaction Failed: Insufficient balance.";
    }
    if (!checkDailyLimit(withdrawalAmount, storedHashedDailyLimit)) {
        return "Transaction Failed: Amount exceeds daily limit.";
    }

    return "Transaction Successful.";

}
const Password = "secure123";
const HashedPassword = bcrypt.hashSync(Password, 10);

const actualMFA = "654321";
const enteredMFA = "654321";

const Balance = "5000";
const HashedBalance = bcrypt.hashSync(Balance, 10);

const DailyLimit = "6000";
const HashedDailyLimit = bcrypt.hashSync(DailyLimit, 10);
console.log(processWithdrawal("secure123", HashedPassword, enteredMFA , actualMFA, 5000, HashedBalance, HashedDailyLimit)); // Transaction Successful.
console.log(processWithdrawal("wrongPass", HashedPassword, "654321", actualMFA, 1000, HashedBalance, HashedDailyLimit)); // Incorrect password.
console.log(processWithdrawal("secure123", HashedPassword, "123456", actualMFA, 1000, HashedBalance, HashedDailyLimit)); // MFA failed.
console.log(processWithdrawal("secure123", HashedPassword, "654321", actualMFA, 6000, HashedBalance, HashedDailyLimit)); // Insufficient balance.
console.log(processWithdrawal("secure123", HashedPassword, "654321", actualMFA, 3000, HashedBalance, HashedDailyLimit)); // Amount exceeds daily limit.

