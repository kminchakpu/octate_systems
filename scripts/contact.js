const ticketForm = document.getElementById("ticketForm");
const subscribeForm = document.getElementById("subscribeForm");

if (ticketForm) {
    ticketForm.addEventListener("submit", (e) => {
        e.preventDefault();

        ticketForm.reset();

        window.location.href = "success.html?type=ticket";
    });
}

if (subscribeForm) {
    subscribeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        subscribeForm.reset();

        window.location.href = "success.html?type=subscribe";
    });
}