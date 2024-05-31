import { request } from "@playwright/test";
let sid: string;


export default async function deleteCar(header, carId) {
    const contextRequest = await request.newContext();
    const response = await contextRequest.delete(`/api/cars/${carId}`, {
        headers: header
    });
    return await response.json();
}