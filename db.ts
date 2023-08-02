import { faker } from '@faker-js/faker';
import * as fs from 'fs';

// Setting our own seed to get consistent faker js results
faker.seed(2007);
// creates a date past before
faker.date.past({ refDate: '2023-07-26T00:00:00.000Z' });

interface User {
  id: number;
  userId: string;
  username: string;
  email: string;
  avatar: string;
  following: number;
  followers: number;
  country: string;
  city: string;
  url: string;
  banner: string;
  description: string;
  registeredAt: Date;
}

export function createRandomUser(id: number): User {
  return {
    id: id,
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    following: faker.number.int({ min: 0, max: 500 }),
    followers: faker.number.int({ min: 0, max: 50000 }),
    country: faker.location.country(),
    city: faker.location.city(),
    url: faker.internet.url(),
    description: faker.lorem.text(),
    banner: faker.image.urlLoremFlickr({ category: 'abstract' }),
    registeredAt: faker.date.past(),
  };
}

interface Post {
  id: number;
  createdAt: Date;
  author: string;
  avatar: string;
  message: string;
  image: string;
  authorId: string;
  messageId: string;
}

export function createRandomPost(users: User[], id: number): Post {
  const randomUserIndex = faker.number.int({ min: 0, max: users.length - 1 });
  const author = users[randomUserIndex];

  return {
    id: id,
    createdAt: faker.date.past(),
    author: author.username,
    avatar: author.avatar,
    message: faker.lorem.paragraph(),
    image: faker.image.urlLoremFlickr({ category: "cat" }),
    authorId: author.userId,
    messageId: faker.string.uuid(),
  };
}

interface IData {
  users: User[];
  posts: Post[];
}

export function createRandomUsersWithPosts(): IData {
  const users: User[] = [];

  for (let i = 0; i < 10; i++) {
    const user = createRandomUser(i);
    users.push(user);
  }

  const posts: Post[] = [];

  users.forEach(() => {
    const numPosts = faker.number.int({ min: 1, max: 5 }); // You can adjust the number of posts per user here

    for (let i = 0; i < numPosts; i++) {
      const post = createRandomPost(users, i);
      posts.push(post);
    }
  });

  return { users, posts };
}

export const usersWithPosts: IData = createRandomUsersWithPosts();

// Generate data and write it to db.json
function generateData() {
  const data = createRandomUsersWithPosts();
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
}

// Call the function to generate and save data to db.json
generateData();
