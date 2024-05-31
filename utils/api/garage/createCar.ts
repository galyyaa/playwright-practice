import { request } from "@playwright/test";
let sid: string;

export default async function createCar(header, carBrandId, carModelId, mileage) {
    const contextRequest = await request.newContext();
    const response = await contextRequest.post('/api/cars', {
        headers: header,
        data: {

            "carBrandId": carBrandId,
            "carModelId": carModelId,
            "mileage": mileage
        }
    })
    return await response.json();
}