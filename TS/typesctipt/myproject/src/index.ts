interface Car {
    id: number;
    make: string;
    model: string;
    model_year: number;
    price: number;
    fuel_type: string;
    transmission: string;
    color: string;
    mileage: number;
    image: string;
}

async function fetchData(): Promise<Car[]> {
    try {
        const response = await fetch("http://localhost:3000/cars", {
            mode: 'cors'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const cars: Car[] = await response.json();
        return cars;
    } catch (error) {
        console.error("Error fetching car data:", error);
        return [];
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const carList = document.getElementById("car-list") as HTMLDivElement;
    if (!carList) return;

    const cars = await fetchData();
    
    if (cars.length === 0) {
        carList.innerHTML = "<p>Failed to load car listings.</p>";
        return;
    }

    cars.forEach((car: Car) => {
        const carCard = document.createElement("div");
        carCard.classList.add("car-card");
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.make} ${car.model}">
            <h2>${car.make} ${car.model} (${car.model_year})</h2>
            <p>Price: $${car.price.toLocaleString()}</p>
            <p>Fuel Type: ${car.fuel_type}</p>
            <p>Transmission: ${car.transmission}</p>
            <p>Color: ${car.color}</p>
            <p>Mileage: ${car.mileage.toLocaleString()} miles</p>
        `;
        carList.appendChild(carCard);
    });
});
