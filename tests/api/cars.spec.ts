import { test, expect } from '@playwright/test';
import { correctEmail1, correctPassword1 } from '../../test-data/credentials';
import { carBrands } from '../../test-data/api/brands';
import getAuthCookies from '../../utils/api/auth/getAuthCookies';
import getModelsList from '../../utils/api/garage/getModelsList';
import createCar from '../../utils/api/garage/createCar';
import getUserCars from '../../utils/api/garage/getUserCars';
import deleteCar from '../../utils/api/garage/deleteCar';

test.describe('Adding one car model and after delete ', () => {
    let cookiesWithAuth;

    test.beforeAll(async () => {
        cookiesWithAuth = await getAuthCookies(correctEmail1, correctPassword1);
    })

    test('Add model of BMW brand', async ({ request }) => {
        const models = await getModelsList(carBrands.bmw.id);
        console.log(models);
        const modelX6 = models.find(model => model.title === 'X6')
        if (modelX6) {
            const mileage = 30000;
            const createCarRequest = await createCar(cookiesWithAuth, carBrands.bmw.id, modelX6.id, mileage);
        }
    });

    test('Add model of Audi brand', async ({ request }) => {
        const models = await getModelsList(carBrands.audi.id);
        console.log(models);
        const modelQ7 = models.find(model => model.title === 'Q7')
        if (modelQ7) {
            const mileage = 22000;
            const createCarRequest = await createCar(cookiesWithAuth, carBrands.audi.id, modelQ7.id, mileage);
        }
    });

    test('Add model of Ford brand', async ({ request }) => {
        const models = await getModelsList(carBrands.ford.id);
        console.log(models);
        const modelFusion = models.find(model => model.title === 'Fusion')
        if (modelFusion) {
            const mileage = 50000;
            const createCarRequest = await createCar(cookiesWithAuth, carBrands.ford.id, modelFusion.id, mileage);
        }
    });

    test('Add model of Porsche brand', async ({ request }) => {
        const models = await getModelsList(carBrands.porsche.id);
        console.log(models);
        const model911 = models.find(model => model.title === '911')
        if (model911) {
            const mileage = 10000;
            const createCarRequest = await createCar(cookiesWithAuth, carBrands.porsche.id, model911.id, mileage);
        }
    });

    test('Add model of Fiat brand', async ({ request }) => {
        const models = await getModelsList(carBrands.fiat.id);
        console.log(models);
        const modelPunto = models.find(model => model.title === 'Punto')
        if (modelPunto) {
            const mileage = 10000;
            const createCarRequest = await createCar(cookiesWithAuth, carBrands.fiat.id, modelPunto.id, mileage);
        }
    });

    test('Error when trying to add car with wrong brand id', async ({ request }) => {
        const createCarRequest = await request.post(`/api/cars/`, {
            headers: cookiesWithAuth, data: {
                "carBrandId": 'wrong',
                "carModelId": 1,
                "mileage": 100
            }
        });
        const createCarRequestJson = await createCarRequest.json();
        expect(createCarRequestJson.status).toBe('error');
    });

    test('Error when trying to add car with wrong model id', async ({ request }) => {
        const createCarRequest = await request.post(`/api/cars/`, {
            headers: cookiesWithAuth, data: {
                "carBrandId": carBrands.bmw.id,
                "carModelId": 'wrong',
                "mileage": 200
            }
        });
        const createCarRequestJson = await createCarRequest.json();
        expect(createCarRequestJson.status).toBe('error');
    });

    test('Error when trying to add car with wrong mileage', async ({ request }) => {
        const createCarRequest = await request.post(`/api/cars/`, {
            headers: cookiesWithAuth, data: {
                "carBrandId": carBrands.bmw.id,
                "carModelId": 1,
                "mileage": -1
            }
        });
        const createCarRequestJson = await createCarRequest.json();
        expect(createCarRequestJson.status).toBe('error');
    });

    test('Error when trying to add car without authorization', async ({ request }) => {
        const createCarRequest = await request.post(`/api/cars/`, {
            data: {
                "carBrandId": carBrands.bmw.id,
                "carModelId": 1,
                "mileage": 100
            }
        });
        const createCarRequestJson = await createCarRequest.json();
        expect(createCarRequestJson.status).toBe('error');
    });

    test('Error when trying to add car without data', async ({ request }) => {
        const createCarRequest = await request.post(`/api/cars/`, {
            headers: cookiesWithAuth
        });
        const createCarRequestJson = await createCarRequest.json();
        expect(createCarRequestJson.status).toBe('error');
    });

    test('Delete all cars', async () => {

        const cars = await getUserCars(cookiesWithAuth);

        for (const car of cars) {
            const responseDeleteCar = await deleteCar(cookiesWithAuth, car.id)
            console.log(await responseDeleteCar);
        }
    });
});