import { request } from "@playwright/test";
let sid: string;


export default async function getUserCars(header) {
    const contextRequest = await request.newContext();
    const response = await contextRequest.get(`/api/cars`, {
        headers: header
    });
    const responseJson = await response.json();
    return responseJson.data;
}