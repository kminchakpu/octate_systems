const title = document.getElementById("success-title");
const message = document.getElementById("success-message");
const icon = document.getElementById("success-icon");

const params = new URLSearchParams(window.location.search);
const type = params.get("type");

switch (type) {

    case "ticket":

        document.title = "Ticket Submitted | Octate Systems";

        title.textContent =
            "Ticket Submitted Successfully";

        message.textContent =
            "Thank you for contacting Octate Systems. Your support request has been received and our team will review it shortly. We'll get back to you via email as soon as possible.";

        icon.textContent = "✓";

        break;

    case "subscribe":

        document.title = "Subscription Confirmed | Octate Systems";

        title.textContent =
            "Thank You For Subscribing!";

        message.textContent =
            "You've successfully joined our mailing list. We'll keep you informed about new services, company updates, and important announcements.";

        icon.textContent = "✉";

        break;

    default:

        document.title = "Success | Octate Systems";

        title.textContent =
            "Success";

        message.textContent =
            "Your request has been completed successfully.";

        icon.textContent = "✓";
}