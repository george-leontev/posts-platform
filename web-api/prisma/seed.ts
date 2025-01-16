import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    await prisma.$executeRaw`alter sequence admin.user_id_seq restart with 1;`;
    await prisma.$executeRaw`alter sequence business.post_id_seq restart with 1;`;

    await prisma.$executeRaw`truncate table admin.user cascade`;
    await prisma.$executeRaw`insert into admin.user (email, password, avatar) VALUES ('user@example.com', ${await bcrypt.hash('1234567890', 10)}, 'avatar.png')`;

    await prisma.$executeRaw`insert into business.post (user_id, topic, message, created_at, updated_at) VALUES (1, 'My life', 'My hollyday', ${new Date()}, ${new Date()})`;
    await prisma.$executeRaw`insert into business.post (user_id, topic, message, created_at, updated_at) VALUES (1, 'My life', 'My weekdays', ${new Date()}, ${new Date()})`;
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
