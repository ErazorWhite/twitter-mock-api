"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersWithPosts = exports.createRandomUsersWithPosts = exports.createRandomPost = exports.createRandomUser = void 0;
var faker_1 = require("@faker-js/faker");
var fs = require("fs");
// Setting our own seed to get consistent faker js results
faker_1.faker.seed();
// creates a date past before
faker_1.faker.date.past({ refDate: "2023-07-26T00:00:00.000Z" });
function createRandomUser(id) {
    return {
        id: id,
        userId: faker_1.faker.string.uuid(),
        username: faker_1.faker.internet.displayName(),
        email: faker_1.faker.internet.email(),
        avatar: faker_1.faker.image.avatar(),
        following: faker_1.faker.number.int({ min: 0, max: 500 }),
        followers: faker_1.faker.number.int({ min: 0, max: 50000 }),
        country: faker_1.faker.location.country(),
        city: faker_1.faker.location.city(),
        url: faker_1.faker.internet.url(),
        description: faker_1.faker.lorem.text(),
        banner: faker_1.faker.image.urlLoremFlickr({ category: "abstract" }),
        registeredAt: faker_1.faker.date.past(),
    };
}
exports.createRandomUser = createRandomUser;
function createRandomPost(users, postId) {
    var randomUserIndex = faker_1.faker.number.int({ min: 0, max: users.length - 1 });
    var author = users[randomUserIndex];
    return {
        id: postId,
        createdAt: faker_1.faker.date.past(),
        author: author.username,
        avatar: author.avatar,
        message: faker_1.faker.lorem.paragraph(),
        image: faker_1.faker.image.urlLoremFlickr({ category: "cat" }),
        authorId: author.userId,
        messageId: faker_1.faker.string.uuid(),
    };
}
exports.createRandomPost = createRandomPost;
function createRandomUsersWithPosts() {
    var users = [];
    for (var i = 0; i < 20; i++) {
        var user = createRandomUser(i);
        users.push(user);
    }
    var postId = 0; // Добавляем новый счетчик для id постов
    var posts = [];
    users.forEach(function () {
        var numPosts = faker_1.faker.number.int({ min: 1, max: 30 }); // You can adjust the number of posts per user here
        for (var i = 0; i < numPosts; i++) {
            var post = createRandomPost(users, postId);
            posts.push(post);
            postId++; // Increment postId here
        }
    });
    return { users: users, posts: posts };
}
exports.createRandomUsersWithPosts = createRandomUsersWithPosts;
exports.usersWithPosts = createRandomUsersWithPosts();
// Generate data and write it to db.json
function generateData() {
    var data = createRandomUsersWithPosts();
    fs.writeFileSync("db.json", JSON.stringify(data, null, 2)); // try catch
}
// Call the function to generate and save data to db.json
generateData();
