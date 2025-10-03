// tests/utils/global.teardown.ts
import { FullConfig } from "@playwright/test";
import { clearCollection } from "./pocketbase";


async function globalTeardown(config?: FullConfig) {
    console.log("🔹 Ejecutando globalTeardown: limpiando base de datos...");


    try {
        await clearCollection("users");
        console.log("✅ Usuarios eliminados correctamente.");
    } catch (err) {
        console.error("❌ Error en globalTeardown:", err);
    }
}


export default globalTeardown;
