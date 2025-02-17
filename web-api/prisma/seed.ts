import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    await prisma.$executeRaw`alter sequence admin.user_id_seq restart with 1;`;
    await prisma.$executeRaw`alter sequence business.post_id_seq restart with 1;`;

    await prisma.$executeRaw`truncate table admin.user cascade`;
    await prisma.$executeRaw`insert into admin.user (email, password, username, avatar) VALUES ('user@example.com', ${await bcrypt.hash(
        '1234567890',
        10,
    )}, 'egor_leontev24', 'avatar.png')`;

    await prisma.$executeRaw`insert into business.post (user_id, topic, message, created_at, updated_at) VALUES (1, 'The Art of Minimalism', 'Have you ever felt overwhelmed by clutter? Embracing minimalism can transform your space and mindset. Start small—declutter one area of your home or simplify your daily routine. By focusing on what truly matters, you’ll find clarity and peace. Remember, it’s not about having less; it’s about making room for more of what you love. What will you declutter today?', ${new Date()}, ${new Date()})`;
    await prisma.$executeRaw`insert into business.post (user_id, topic, message, created_at, updated_at) VALUES (1, 'Power of daydreaming or promotion of procrastination', 'In a world that often prioritizes productivity, we sometimes forget the magic of daydreaming. Allowing your mind to wander can spark innovative ideas and solutions. Next time you find yourself drifting off, embrace it! You might just discover your next great project or a fresh perspective on a challenge. So, take a moment today to daydream—your creativity will thank you!', ${new Date()}, ${new Date()})`;
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
