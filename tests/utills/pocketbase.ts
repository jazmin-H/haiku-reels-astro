// tests/utils/pocketbase.ts
import PocketBase from "pocketbase";


const pb = new PocketBase(process.env.POCKETBASE_URL); // 👈 lee del .env


// Limpia una colección entera
export async function clearCollection(collection: string) {
    try {
        const records = await pb.collection(collection).getFullList();
        for (const record of records) {
            await pb.collection(collection).delete(record.id);
        }
        console.log(`Colección "${collection}" limpiada (${records.length} registros).`);
    } catch (err) {
        console.error(`Error limpiando colección ${collection}:`, err);
    }
}


// Crear un usuario de prueba
export async function createTestUser(email: string, password: string) {
    try {
        const user = await pb.collection("users").create({
            email,
            password,
            passwordConfirm: password,
            username: email.split("@")[0], // obligatorio si tu colección requiere username
        });
        console.log(`Usuario de prueba creado:`, user); // imprime todo el objeto
        return user; // así podrás usarlo después si quieres
    } catch (err) {
        console.error("Error creando usuario de prueba:", err);
        return null;
    }
}


export default pb;
