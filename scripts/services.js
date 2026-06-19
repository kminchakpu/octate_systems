import { getServices } from "./dataService.js";

const servicesGrid = document.querySelector("#services-grid");

// Cache DOM Modal elements if your layout uses item expansions
const modal = document.querySelector("#service-modal");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const closeModalBtn = document.querySelector("#close-modal");

let services = [];
let selectedService = null;

// Mobile Menu Navigation toggle
const menuBtn = document.querySelector("#menu-btn");
const navigation = document.querySelector(".navigation");

menuBtn?.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

// Footer Automatic Year Updater
const currentYearEl = document.querySelector("#current-year");
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

async function initialize() {
    services = await getServices();
    displayServices(services);
}

function displayServices(data) {
    if (!servicesGrid) return;
    servicesGrid.innerHTML = "";

    data.forEach(service => {
        const card = document.createElement("article");
        card.classList.add("service-card");

        // Uses Bootstrap icon class strings dynamically passed from the JSON structure
        card.innerHTML = `
            <div class="icon-container">
                <i class="bi ${service.icon}"></i>
            </div>
            
            <h3>${service.title}</h3>
            
            <p>${service.description}</p>
            
            <button class="details-btn" data-id="${service.id}">
                Learn More <i class="bi bi-arrow-right"></i>
            </button>
        `;

        servicesGrid.appendChild(card);
    });

    addModalEvents();
}

function addModalEvents() {
    if (!modal) return; 

    document.querySelectorAll(".details-btn")
        .forEach(button => {
            button.addEventListener("click", () => {
                const id = button.dataset.id;
                selectedService = services.find(service => service.id === id);
                
                if (!selectedService) return;

                if (modalTitle) modalTitle.textContent = selectedService.title;
                if (modalDescription) modalDescription.textContent = selectedService.description;

                modal.showModal();
            });
        });
}

if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () => {
        modal.close();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initialize();
});