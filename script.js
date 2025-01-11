document.addEventListener("DOMContentLoaded", () => {
    const addPlantButton = document.getElementById("addPlantButton");
    const plantModal = document.getElementById("plantModal");
    const closeModal = document.getElementById("closeModal");
    const plantForm = document.getElementById("plantForm");
    const plantList = document.getElementById("plantList");

    // Load plants from local storage
    const loadPlants = () => {
        const plants = JSON.parse(localStorage.getItem("plants")) || [];
        plantList.innerHTML = "";
        plants.forEach((plant, index) => {
            const li = document.createElement("li");
            li.textContent = `${plant.name} (${plant.type}): ${plant.notes}`;
            li.dataset.index = index;
            plantList.appendChild(li);
        });
    };

    // Save plants to local storage
    const savePlant = (plant) => {
        const plants = JSON.parse(localStorage.getItem("plants")) || [];
        plants.push(plant);
        localStorage.setItem("plants", JSON.stringify(plants));
        loadPlants();
    };

    // Event listeners
    addPlantButton.addEventListener("click", () => {
        plantForm.reset(); // Clear the form each time
        plantModal.classList.remove("hidden");
    });

    closeModal.addEventListener("click", () => {
        plantModal.classList.add("hidden");
    });

    plantForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validate user input
        const plantName = document.getElementById("plantName").value.trim();
        const plantType = document.getElementById("plantType").value.trim();
        const plantNotes = document.getElementById("plantNotes").value.trim();

        if (!plantName || !plantType) {
            alert("Please enter both a plant name and type!");
            return;
        }

        const plant = {
            name: plantName,
            type: plantType,
            notes: plantNotes,
        };
        savePlant(plant);
        plantModal.classList.add("hidden");
        plantForm.reset();
    });

    // Initial load
    loadPlants();
});

