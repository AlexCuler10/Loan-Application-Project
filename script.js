document.addEventListener("DOMContentLoaded", () => {
    const contentSection = document.getElementById("content");

    const createSavingsPlan = () => {
        contentSection.innerHTML = `
            <h2>Create Savings Plan</h2>
            <form id="savings-plan-form">
                <label for="income">Monthly Income: </label>
                <input type="number" id="income" required><br><br>
                
                <label for="expenses">Monthly Expenses: </label>
                <input type="number" id="expenses" required><br><br>
                
                <label for="goal">Savings Goal: </label>
                <input type="number" id="goal" required><br><br>
                
                <label for="deadline">Deadline (months): </label>
                <input type="number" id="deadline" required><br><br>
                
                <button type="submit">Calculate Plan</button>
            </form>
            <div id="savings-result"></div>
        `;

        document.getElementById("savings-plan-form").addEventListener("submit", (e) => {
            e.preventDefault();
            const income = parseFloat(document.getElementById("income").value);
            const expenses = parseFloat(document.getElementById("expenses").value);
            const goal = parseFloat(document.getElementById("goal").value);
            const deadline = parseInt(document.getElementById("deadline").value);

            const remaining = income - expenses;
            if (remaining <= 0) {
                alert("Your expenses exceed or equal your income!");
                return;
            }

            const recommendedEmergencySavings = remaining * 3; // 3 months buffer
            const monthlyContribution = goal / deadline;

            if (monthlyContribution > remaining) {
                alert("The goal is not achievable with the current deadline.");
                return;
            }

            document.getElementById("savings-result").innerHTML = `
                <p>Remaining Funds After Expenses: $${remaining.toFixed(2)}</p>
                <p>Recommended Emergency Fund: $${recommendedEmergencySavings.toFixed(2)}</p>
                <p>Monthly Savings to Achieve Goal: $${monthlyContribution.toFixed(2)}</p>
            `;
        });
    };

    const viewDebtAndCredit = () => {
        contentSection.innerHTML = `
            <h2>Check Debt and Credit Score</h2>
            <p>Feature under construction. Stay tuned!</p>
        `;
    };

    const applyLoan = () => {
        contentSection.innerHTML = `
            <h2>Apply for Emergency Loan</h2>
            <form id="loan-form">
                <label for "name" > Full Name: </label>
                <input type = "text" id = "name" required> <br><br>

                <label for "address" > Home Address: </label>
                <input type = "text" id = "address" required><br><br>

                <label for = "phone" id > Phone Number: </label>
                <input type = "tel" id = "phone" pattern = "[0-9]{10}" required><br><br>

                <label for = "email" > Email: </label>
                <input type = "email" id = "email" required><br><br>

                <label for = "income" > Monthly Income: </label>
                <input type = "number" id = "income" required><br><br>

                <label for="loan-amount">Loan Amount: </label>
                <input type="number" id="loan-amount" required><br><br>

                <label for="credit-score">Credit Score: </label>
                <input type="number" id="credit-score" required><br><br>
                
                <button type="submit">Apply</button>
            </form>
            <div id="loan-result"></div>
        `;

        document.getElementById("loan-form").addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value.trim();
            const address = document.getElementById("address").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();
            const income = parseFloat(document.getElementById("income").value);
            const loanAmount = parseFloat(document.getElementById("loan-amount").value);
            const creditScore = parseInt(document.getElementById("credit-score").value);


            if (creditScore < 300 || creditScore > 850) {
                document.getElementById("loan-result").innerHTML = '<p>Invalid credti score. Please enter a score between 300 and 850.';

                return;
            }


            if (creditScore < 600) {
                document.getElementById("loan-result").innerHTML = `<p>Your credit score is too low to qualify for a loan.</p>`;
                return;
            }

            if (income < loanAmount / 12) {
                document.getElementById("loan-result").innerHTML = ' <p>Your income does no meet the required eligibility for the required loan amount.</p>';

                return;
            }

            document.getElementById("loan-result").innerHTML = `<p>Your loan application for $${loanAmount.toFixed(2)} has been submitted!</p>`;

            showRepaymentOptions(name, loanAmount, creditScore);

            
        });
    };

    const calculateInterestRate = (creditScore) => {

        const maxRate = 0.30;
        const minRate = 0.05;
        const nomralizedScore = (creditScore - 300) / (850 - 300);
        return maxRate - (maxRate - minRate) * normailzedScore; 
    };

    const showRepaymentOptions = (name, loanAmount, creditScore) => {
        const interestRate = calculateInterestRate(creditScore);
        contentSection.innerHTML = `
        <h2>Loan Repayment Options</h2>
        <p>Congratulations, ${name}! Your loan application for $${loanAmount.toFixed(2)} has been approved.</p>
        <p>Please select a repayment term:</p>
        <form id="repayment-form">
            <label>
                <input type="radio" name="term" value="36" required> 3 years (36 months) 
            </label><br><br>
            <label>
                <input type="radio" name="term" value="60" required> 5 years (60 months) 
            </label><br><br>
            <button type="submit">Calculate Monthly Payment</button>
        </form>
        <div id="repayment-result"></div>
    `;

    document.getElementById("repayment-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const selectedTerm = parseInt(document.querySelector('input[name = "term"]:checked').value);
        const monthlyRate = interestRate / 12;
        const monthlyPayment = 
        (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -selectedTerm));

        document.getElementById("repayment-result").innerHTML =  `
        <p>For a ${selectedTerm / 12}-year (${selectedTerm}-month) term at ${(interestRate * 100).toFixed(2)}% interest:</p>
        <p>Your estimated monthly payment is <strong>$${monthlyPayment.toFixed(2)}</strong>.</p>
        <p>Total repayment amount: <strong>$${(monthlyPayment * selectedTerm).toFixed(2)}</strong>.</p>
    `;

    });
    };


    

    document.getElementById("create-savings-plan").addEventListener("click", createSavingsPlan);
    document.getElementById("view-debt-credit").addEventListener("click", viewDebtAndCredit);
    document.getElementById("apply-loan").addEventListener("click", applyLoan);
});
