"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/cars", {
                mode: 'cors'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const cars = yield response.json();
            return cars;
        }
        catch (error) {
            console.error("Error fetching car data:", error);
            return [];
        }
    });
}
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const carList = document.getElementById("car-list");
    if (!carList)
        return;
    const cars = yield fetchData();
    if (cars.length === 0) {
        carList.innerHTML = "<p>Failed to load car listings.</p>";
        return;
    }
    cars.forEach((car) => {
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
}));
//# sourceMappingURL=index.js.map