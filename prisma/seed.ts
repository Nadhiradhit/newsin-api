import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import env from "../src/config/env";

const connectionString = env.DB.URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function roleSeed(){
    const role = await prisma.role.createMany({
        data: [
            {
                name: "SUPER_ADMIN",
            },
            {
                name: "ADMIN",
            },
            {
                name: "EDITOR",
            },
            {
                name: "JOURNALIST",
            },
            {
                name: "USER",
            },
            {
                name: "GUEST",
            }
        ],
    });
    console.log("Role created successfully", role);
}


roleSeed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });