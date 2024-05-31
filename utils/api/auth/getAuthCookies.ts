import createAuthCookies from "./createAuthCookies";
import { correctEmail1, correctPassword1 } from "../../../test-data/credentials";


export default async function getAuthCookies(email: string, password: string) {

    const sid = await createAuthCookies(email, password);
    return { 'Cookie': `sid=${sid}` };
}