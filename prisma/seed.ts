import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { randFood, randProductCategory } from "@ngneat/falso";
import { faker } from "@faker-js/faker";

async function main() {
  try {
    const fakeCategories = randProductCategory({ length: 10 });
    const fakeMenus = randFood({ length: 40 });

    fakeCategories.forEach(async (categoryName) => {
      await prisma.category.create({
        data: {
          name: categoryName,
          menus: {
            create: fakeMenus.map((item, index) => {
              return {
                title: item,
                description: faker.lorem.paragraph(),
                price: Number(faker.commerce.price()),
              };
            }),
          },
        },
      });
      console.log(`Database has been seeded. 🌱`);
    });
  } catch (error) {
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
