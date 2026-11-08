import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // 1. Create the genres
  const genres = await Promise.all([
    prisma.genre.upsert({
      where: { name: "Fiction" },
      update: {},
      create: {
        name: "Fiction",
        description: "Imaginative stories and novels",
      },
    }),

    prisma.genre.upsert({
      where: { name: "Science" },
      update: {},
      create: {
        name: "Science",
        description: "Scientific discoveries and knowledge",
      },
    }),

    prisma.genre.upsert({
      where: { name: "History" },
      update: {},
      create: {
        name: "History",
        description: "Historical events and biographies",
      },
    }),

    prisma.genre.upsert({
      where: { name: "Technology" },
      update: {},
      create: {
        name: "Technology",
        description: "Computing and technological innovation",
      },
    }),
  ]);

  const [fiction, science, history, technology] = genres;

  console.log("Genres created successfully.");

  // 2. Create sample books
  const books = [
    {
      title: "Things Fall Apart",
      author: "Chinua Achebe",
      isbn: "9780435905255",
      publishedYear: 1958,
      genreId: fiction.id,
    },
    {
      title: "The River Between",
      author: "Ngugi wa Thiong'o",
      isbn: "9780435905484",
      publishedYear: 1965,
      genreId: fiction.id,
    },
    {
      title: "Half of a Yellow Sun",
      author: "Chimamanda Ngozi Adichie",
      isbn: "9780007200283",
      publishedYear: 2006,
      genreId: fiction.id,
    },
    {
      title: "The Old Man and the Sea",
      author: "Ernest Hemingway",
      isbn: "9780684801223",
      publishedYear: 1952,
      genreId: fiction.id,
    },

    {
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      isbn: "9780553380163",
      publishedYear: 1988,
      genreId: science.id,
    },
    {
      title: "The Selfish Gene",
      author: "Richard Dawkins",
      isbn: "9780198788607",
      publishedYear: 1976,
      genreId: science.id,
    },
    {
      title: "Cosmos",
      author: "Carl Sagan",
      isbn: "9780345539434",
      publishedYear: 1980,
      genreId: science.id,
    },
    {
      title: "The Origin of Species",
      author: "Charles Darwin",
      isbn: "9781509827695",
      publishedYear: 1859,
      genreId: science.id,
    },

    {
      title: "Long Walk to Freedom",
      author: "Nelson Mandela",
      isbn: "9780316548182",
      publishedYear: 1994,
      genreId: history.id,
    },
    {
      title: "The History of Malawi",
      author: "John McCracken",
      isbn: "9781780329731",
      publishedYear: 2012,
      genreId: history.id,
    },
    {
      title: "The Diary of a Young Girl",
      author: "Anne Frank",
      isbn: "9780553296983",
      publishedYear: 1947,
      genreId: history.id,
    },
    {
      title: "Guns, Germs, and Steel",
      author: "Jared Diamond",
      isbn: "9780393317558",
      publishedYear: 1997,
      genreId: history.id,
    },

    {
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "9780132350884",
      publishedYear: 2008,
      genreId: technology.id,
    },
    {
      title: "The Pragmatic Programmer",
      author: "David Thomas",
      isbn: "9780135957059",
      publishedYear: 1999,
      genreId: technology.id,
    },
    {
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      isbn: "9780262046305",
      publishedYear: 2022,
      genreId: technology.id,
    },
    {
      title: "Code",
      author: "Charles Petzold",
      isbn: "9780735611313",
      publishedYear: 2000,
      genreId: technology.id,
    },
  ];

  // 3. Insert books without creating duplicates
  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: book,
    });
  }

  console.log(`${books.length} books inserted successfully.`);

  // 4. Create sample users for the Review relationship
  const patron = await prisma.user.upsert({
    where: { email: "patron@example.com" },
    update: {},
    create: {
      name: "John Patron",
      email: "patron@example.com",
      role: "PATRON",
    },
  });

  const librarian = await prisma.user.upsert({
    where: { email: "librarian@example.com" },
    update: {},
    create: {
      name: "Mary Librarian",
      email: "librarian@example.com",
      role: "LIBRARIAN",
    },
  });

  // 5. Create a sample review
  await prisma.review.upsert({
    where: {
      bookId_userId: {
        bookId: (await prisma.book.findUniqueOrThrow({
          where: { isbn: "9780435905255" },
        })).id,
        userId: patron.id,
      },
    },
    update: {},
    create: {
      bookId: (await prisma.book.findUniqueOrThrow({
        where: { isbn: "9780435905255" },
      })).id,
      userId: patron.id,
      rating: 5,
      comment: "An excellent African literary classic.",
    },
  });

  console.log("Sample users and review created.");
  console.log(`Librarian created: ${librarian.name}`);
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
