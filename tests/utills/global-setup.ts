// tests/utils/global.setup.ts
import { FullConfig } from "@playwright/test";
import { clearCollection, createTestUser } from "./pocketbase.ts";


async function globalSetup(config?: FullConfig) {
    console.log("🔹 Ejecutando globalSetup: preparando base de datos...");


    // 1. Limpia usuarios anteriores
    await clearCollection("users");


    // 2. Crea usuarios de prueba
    const testUsers = [
        { username: "shotoTodoroki", email: "shoto@gmail.com", password: "shoto123", passwordConfirm: "shoto123" },
        { username: "izukuMidoriya", email: "izuku@gmail.com", password: "izuku123", passwordConfirm: "izuku123" },
        { username: "katsukiBakugo", email: "katsuki@gmail.com", password: "katsuki123", passwordConfirm: "katsuki123" },


    ];


    for (const u of testUsers) {
        await createTestUser(u.email, u.password);
    }


    // 3. Guardamos los usuarios en process.env (para usarlos en teardown si hace falta)
    process.env.TEST_USERS = JSON.stringify(testUsers);


    console.log("✅ globalSetup completado.");
}


export default globalSetup;