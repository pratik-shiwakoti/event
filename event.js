// Function to open the popup
function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

// Function to close the popup
function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Function to close the popup when clicked outside the modal content (for specific popups like learnMorePopup and registerPopup)
window.onclick = function(event) {
    // Check if the target element is a popup background
    if (event.target.classList.contains('popup')) {
        // Close the popup if clicked outside the content area
        event.target.style.display = "none";
    }
};

document.getElementById("registerForm").onsubmit = function(event) {
    var age = parseInt(document.getElementById("age").value);
    var phone = document.getElementById("phoneNo").value;

    // Validate age
    if (age < 18) {
        event.preventDefault();
        alert("You must be at least 18 years old to register.");
        return;
    }

    // Validate phone number
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
        event.preventDefault();
        alert("Phone number must be exactly 10 digits and contain only numbers.");
        return;
    }

    // Save data in local storage
    let userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        age: age,
        phone: phone,
        address: document.getElementById("address").value,
        medicalInfo: document.getElementById("medicalInfo").value
    };

    localStorage.setItem("registrationData", JSON.stringify(userData));
    alert("Data saved successfully!");
};
// Function to clear form fields
function clearForm() {
    document.getElementById("registerForm").reset();
    document.getElementById("medicalInfo").disabled = true;
}
window.onload = function () {
    const feedbackForm = document.getElementById("feedback-form");
    const feedbackResponse = document.getElementById("feedback-response");

    // Handle feedback form submission
    feedbackForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form from reloading the page

        const feedbackText = document.getElementById("feedback").value;

        if (feedbackText) {
            // Get the existing feedback from localStorage, or initialize an empty array
            let feedbacks = JSON.parse(localStorage.getItem("userFeedbacks")) || [];

            // Add the new feedback to the array
            feedbacks.push({ feedback: feedbackText, timestamp: new Date().toISOString() });

            // Save the updated feedback array to localStorage
            localStorage.setItem("userFeedbacks", JSON.stringify(feedbacks));

            feedbackResponse.style.display = "block";
            feedbackResponse.innerHTML = "Thank you for your feedback! 😊";

            // Clear the form
            feedbackForm.reset();
        } else {
            feedbackResponse.style.display = "block";
            feedbackResponse.innerHTML = "Please enter your feedback before submitting.";
        }
    });
};
// Set the event date (use a specific date for your event)
const eventDate = new Date("March 28, 2025 8:00:00").getTime();

// Function to update the countdown
function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the countdown in the HTML
    document.getElementById("countdown").innerHTML = `${days}d: ${hours}h: ${minutes}m: ${seconds}s`;

    // If the countdown finishes, stop the registration
    if (distance < 0) {
        clearInterval(countdownInterval); // Clear the interval to stop the countdown
        document.getElementById("countdown").innerHTML = "Event has started!";

        // Disable the register button
        document.querySelector(".register-button").disabled = true;
        document.querySelector(".register-button").style.backgroundColor = "#000";  // Change color to indicate it's disabled
        document.querySelector(".register-button").style.cursor = "not-allowed";  // Change cursor style
    }
}

// Update countdown once immediately (to avoid delay when the page loads)
updateCountdown();

// Update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);
