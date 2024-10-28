

document.addEventListener("DOMContentLoaded", async () => {
    const username = sessionStorage.getItem("Customer_Name");
    if (username) {
        try {
            // Fetch user details
            const userResponse = await fetch(`http://localhost:5156/api/User/GetByUserName?username=${username}`);
            if (!userResponse.ok) {
                throw new Error('Failed to fetch user details');
            }
            const userDetails = await userResponse.json();
            console.log("User Details:", userDetails);

            // Fetch pending rental requests using userId
            const pendingRequestsResponse = await fetch(`http://localhost:5156/api/Rental/PendingByUser?Id=${userDetails.userId}`);
            if (!pendingRequestsResponse.ok) {
                throw new Error('Failed to fetch pending rental requests');
            }
            const pendingRequests = await pendingRequestsResponse.json();
            console.log("Pending Rental Requests:", pendingRequests);

            // Display pending requests (you can call your display function here)
            displayPendingRequests(pendingRequests);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Error fetching data: ' + error.message);
        }
    } else {
        alert('User is not logged in');
    }
});

// Function to display pending rental requests in a table
function calculateHoursDifference(startDateString, endDateString) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const millisecondsPerHour = 1000 * 60 * 60;
    const differenceInMilliseconds = endDate - startDate;
    const differenceInHours = Math.floor(differenceInMilliseconds / millisecondsPerHour);
    return differenceInHours;
}


function displayPendingRequests(requests) {
    let table = `
    <table>
        <tr>
            <th>RegistrationNumber</th>
            <th>From</th>
            <th>To</th>
            <th>Due</th>
        </tr>`;

    for (const request of requests) {
        table += `
        <tr>
            <td>${request.registrationNumber}</td>
            <td>${request.rentedDate}</td>
            <td>${request.to}</td>
            <td>${calculateHoursDifference(request.rentedDate,request.to)}</td>
        </tr>`;
    }

    table += `</table>`;
    document.getElementById("tables").innerHTML = table;
}

// Function to handle action on a request
function handleRequestAction(requestId) {
    // Implement your action logic here (e.g., accept, decline)
    console.log("Action on Request ID:", requestId);
}
