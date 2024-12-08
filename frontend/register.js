let userWalletAddress = "";

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userWalletAddress = accounts[0];
            document.getElementById('walletAddress').value = userWalletAddress;
            document.getElementById('registerForm').style.display = 'block';
            document.getElementById('connectWalletButton').style.display = 'none';
        } catch (error) {
            alert('Error connecting to MetaMask');
        }
    } else {
        alert('MetaMask is not installed');
    }
}

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    // Send the registration data to the backend
    const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            email,
            walletAddress: userWalletAddress,
            role
        }),
    });

    const result = await response.json();
    if (result.success) {
        alert('Registration successful!');
    } else {
        alert('Error:'+ result.message);
    }
    
    if (result.success) {
        // Redirect based on user role
        if (role === "company") {
            window.location.href = "companyDashboard.html";
        } else if (role === "ngo" || role === "gov") {
            window.location.href = "ngoGovernmentDashboard.html";
        } else {
            window.location.href = "privateDashboard.html";
        }
    } else {
        alert('Registration failed. Please try again.');
    }
});
