// tests/utils/global.setup.ts
import { FullConfig } from "@playwright/test";
import { clearCollection, createTestUser } from "./pocketbase.ts";


async function globalSetup(config?: FullConfig) {
    console.log("🔹 Ejecutando globalSetup: preparando base de datos...");


    // 1. Limpia usuarios anteriores
    await clearCollection("users");


    // 2. Crea usuarios de prueba
    const testUsers = [
        { email: "test1@example.com", password: "password123" },
        { email: "test2@example.com", password: "password456" },
        { email: "test3@example.com", password: "password789" },


    ];


    for (const u of testUsers) {
        await createTestUser(u.email, u.password);
    }


    // 3. Guardamos los usuarios en process.env (para usarlos en teardown si hace falta)
    process.env.TEST_USERS = JSON.stringify(testUsers);


    console.log("✅ globalSetup completado.");
}


export default globalSetup;