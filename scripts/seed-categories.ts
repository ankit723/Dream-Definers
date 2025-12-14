import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding blog categories...');

  const categories = [
    { name: 'Aviation', slug: 'aviation' },
    { name: 'Effective Communication', slug: 'effective-communication' },
    { name: 'Pre-Placement Training', slug: 'pre-placement-training' },
  ];

  for (const category of categories) {
    const existing = await prisma.blogCategory.findUnique({
      where: { slug: category.slug },
    });

    if (existing) {
      console.log(`Category "${category.name}" already exists, skipping...`);
      continue;
    }

    await prisma.blogCategory.create({
      data: category,
    });

    console.log(`✅ Created category: ${category.name}`);
  }

  console.log('\n✅ Categories seeded successfully!');
}

main()
  .catch((error) => {
    console.error('Error seeding categories:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

