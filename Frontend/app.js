document.addEventListener('DOMContentLoaded', function() {
    // Event listener for user registration
    document.getElementById('userForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value; // Assuming you have an email field for registration
        createUser(username, password, email);
    });

    // Event listener for user login
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value; // Ensure the login form username field has a unique ID
        const password = document.getElementById('loginPassword').value; // Ensure the login form password field has a unique ID
        authenticateUser(username, password);
    });

    // Event listener for transaction creation (adjust according to your actual backend)
    document.getElementById('transactionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const transactionDetails = document.getElementById('transactionDetails').value;
        createTransaction(transactionDetails);
    });
});

function createUser(username, password, email) {
    fetch('http://localhost:8000/register', { // Updated to use the correct registration endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }), // Including email in the user registration data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        return response.json();
    })
    .then(data => {
        alert('User registered successfully');
        console.log(data);
    })
    .catch((error) => {
        alert('Error registering user');
        console.error('Error:', error);
    });
}

function authenticateUser(username, password) {
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password)); // Using Basic Authentication

    fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: headers,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        // Redirect to transactions page on successful login
        window.location.href = 'transactions.html';
    })
    .catch((error) => {
        alert('Error logging in');
        console.error('Error:', error);
    });
}

function createTransaction(transactionDetails) {
    // This function remains unchanged. Adjust according to your actual backend.
    fetch('http://localhost:8000/transaction/create', { // Verify this endpoint exists in your backend
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ details: transactionDetails }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Transaction created successfully');
        console.log(data);
    })
    .catch((error) => {
        alert('Error creating transaction');
        console.error('Error:', error);
    });
}
