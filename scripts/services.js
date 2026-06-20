let servicesData = [];
let selectedService = null;

export async function loadServices() {
    try {
        // Fetches your real agency services configuration file
        const response = await fetch("./data/services.json");

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        servicesData = await response.json();

        // Targets the updated services layout container
        const servicesGrid = document.querySelector("#services-grid");

        if (!servicesGrid) return;

        const isHomePage =
            window.location.pathname.includes("index.html") ||
            window.location.pathname.endsWith("/");

        // Optional: If you tag specific services as 'featured: true' in your JSON later, 
        // this keeps your homepage layout tidy automatically.
        const servicesToDisplay = isHomePage && servicesData.some(s => s.featured)
            ? servicesData.filter(service => service.featured)
            : servicesData;

        displayServices(servicesToDisplay, servicesGrid);

    } catch (error) {
        console.error(error);

        const servicesGrid = document.querySelector("#services-grid");

        if (servicesGrid) {
            servicesGrid.innerHTML = `
                <p class="loading">
                    Unable to load services at this time. Please try refresh.
                </p>
            `;
        }
    }
}

function displayServices(services, servicesGrid) {
    servicesGrid.innerHTML = "";

    services.forEach(service => {
        const card = document.createElement("article");
        card.classList.add("service-card");

        // Renders the exact UI card layout using your Bootstrap Icon choices
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

    attachModalEvents();
}

function attachModalEvents() {
    const buttons = document.querySelectorAll(".details-btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Uses standard string lookup since your data IDs are words (e.g. "ui-ux-design")
            const serviceId = button.dataset.id;

            const service = servicesData.find(
                item => item.id === serviceId
            );

            if (service) {
                openModal(service);
            }
        });
    });
}

function openModal(service) {
    const modal = document.querySelector("#service-modal");

    if (!modal) return;

    selectedService = service;

    // Populates your custom dialog elements safely
    const modalTitle = document.querySelector("#modal-title");
    const modalDescription = document.querySelector("#modal-description");
    const modalLink = document.querySelector("#modal-link");

    if (modalTitle) modalTitle.textContent = service.title;
    if (modalDescription) modalDescription.textContent = service.description;

    // Dynamically updates the "Find Out More" button link
    if (modalLink) {
        if (service.link) {
            modalLink.href = service.link;
        } else {
            // Fallback safety option if a specific link property is missing in the data
            modalLink.href = "services.html";
        }
    }

    modal.showModal();
}

export function initializeModal() {
    const modal = document.querySelector("#service-modal");
    const closeBtn = document.querySelector("#close-modal");

    if (!modal || !closeBtn) return;

    closeBtn.addEventListener("click", () => {
        modal.close();
    });

    // Closes the modal smoothly if a user clicks outside the modal card overlay body
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
}

export function getServices() {
    return servicesData;
}