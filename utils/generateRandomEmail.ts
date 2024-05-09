import { v4 as uuidv4 } from 'uuid';

export default function generateRandomEmail() {
    const emailPrefix = `morgun.galya+aqa-user`;
    const domain = `@gmail.com`;
    const uuid = uuidv4().substr(0, 5);
    const randomEmail = `${emailPrefix}${uuid}${domain}`;

    return randomEmail;
}