import { test, expect } from '@playwright/test';
import { correctEmail1, correctPassword1 } from '../test-data/credentials';
import { carBrands } from '../test-data/api/brands';

test.describe('Adding one car model and after delete ', () => {
    let sid: string;

    test.beforeAll(async ({ request }) => {
        const authRequest = await request.post('/api/auth/signin', {
            data: {
                "email": correctEmail1,
                "password": correctPassword1,
                "remember": true
            }
        })

        const cookies = authRequest.headers()['set-cookie'];
        if (cookies) {
            const cookieArray = cookies.split('\n');
            for (const cookie of cookieArray) {
                if (cookie.trim().startsWith('sid=')) {
                    sid = (cookie.trim().split('=')[1]).split(';')[0];
                    break;
                }
            }
        }
    })

    test('Add model of BMW brand', async ({ request }) => {
        const getModelsRequest = await request.get(`/api/cars/models?carBrandId=${carBrands.bmw.id}`);
        const getModelsRequestJson = await getModelsRequest.json();
        const models = getModelsRequestJson.data;
        console.log(models);
        const modelX6 = models.find(model => model.title === 'X6')
        if (modelX6) {
            const mileage = 30000;
            const createCarRequest = await request.post(`/api/cars/`, {
                headers: {
                    'Cookie': `sid=${sid}`
                }, data: {
                    "carBrandId": carBrands.bmw.id,
                    "carModelId": modelX6.id,
                    "mileage": mileage
                }
            })
            console.log(await createCarRequest.json());
        }
    });

    test('Add model of Audi brand', async ({ request }) => {
        const getModelsRequest = await request.get(`/api/cars/models?carBrandId=${carBrands.audi.id}`);
        const getModelsRequestJson = await getModelsRequest.json();
        const models = getModelsRequestJson.data;
        console.log(models);
        const modelQ7 = models.find(model => model.title === 'Q7')
        if (modelQ7) {
            const mileage = 22000;
            const createCarRequest = await request.post(`/api/cars/`, {
                headers: {
                    'Cookie': `sid=${sid}`
                }, data: {
                    "carBrandId": carBrands.audi.id,
                    "carModelId": modelQ7.id,
                    "mileage": mileage
                }
            })
            console.log(await createCarRequest.json());
        }
    });

    test('Add model of Ford brand', async ({ request }) => {
        const getModelsRequest = await request.get(`/api/cars/models?carBrandId=${carBrands.ford.id}`);
        const getModelsRequestJson = await getModelsRequest.json();
        const models = getModelsRequestJson.data;
        console.log(models);
        const modelFusion = models.find(model => model.title === 'Fusion')
        if (modelFusion) {
            const mileage = 50000;
            const createCarRequest = await request.post(`/api/cars/`, {
                headers: {
                    'Cookie': `sid=${sid}`
                }, data: {
                    "carBrandId": carBrands.ford.id,
                    "carModelId": modelFusion.id,
                    "mileage": mileage
                }
            })
            console.log(await createCarRequest.json());
        }
    });

    test('Add model of Porsche brand', async ({ request }) => {
        const getModelsRequest = await request.get(`/api/cars/models?carBrandId=${carBrands.porsche.id}`);
        const getModelsRequestJson = await getModelsRequest.json();
        const models = getModelsRequestJson.data;
        console.log(models);
        const model911 = models.find(model => model.title === '911')
        if (model911) {
            const mileage = 10000;
            const createCarRequest = await request.post(`/api/cars/`, {
                headers: {
                    'Cookie': `sid=${sid}`
                }, data: {
                    "carBrandId": carBrands.porsche.id,
                    "carModelId": model911.id,
                    "mileage": mileage
                }
            })
            console.log(await createCarRequest.json());
        }
    });

    test('Add model of Fiat brand', async ({ request }) => {
        const getModelsRequest = await request.get(`/api/cars/models?carBrandId=${carBrands.fiat.id}`);
        const getModelsRequestJson = await getModelsRequest.json();
        const models = getModelsRequestJson.data;
        console.log(models);
        const modelPunto = models.find(model => model.title === 'Punto')
        if (modelPunto) {
            const mileage = 10000;
            const createCarRequest = await request.post(`/api/cars/`, {
                headers: {
                    'Cookie': `sid=${sid}`
                }, data: {
                    "carBrandId": carBrands.fiat.id,
                    "carModelId": modelPunto.id,
                    "mileage": mileage
                }
            })
            console.log(await createCarRequest.json());
        }
    });

    test('Error when trying to add car with wrong brand id', async ({ request }) => {
        const createCarRequest = await request.post(`/api/cars/`, {
            headers: {
                'Cookie': `sid=${sid}`
            }, data: {
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
            headers: {
                'Cookie': `sid=${sid}`
            }, data: {
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
            headers: {
                'Cookie': `sid=${sid}`
            }, data: {
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
            headers: {
                'Cookie': `sid=${sid}`
            }
        });
        const createCarRequestJson = await createCarRequest.json();
        expect(createCarRequestJson.status).toBe('error');
    });

    test('Delete all cars', async ({ request }) => {

        const responseCars = await request.get('/api/cars', {
            headers: {
                'Cookie': `sid=${sid}`
            }
        })

        const responseCarsJson = await responseCars.json();
        const cars = responseCarsJson.data;

        for (const car of cars) {
            const responseDeleteCar = await request.delete(`/api/cars/${car.id}`, {
                headers: {
                    'Cookie': `sid=${sid}`
                }
            })

            console.log(await responseDeleteCar.json());
        }
    });
});