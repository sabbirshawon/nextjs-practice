## Prerequisite
Please make sure you have the following installed
- [node](https://nodejs.org/en/download/current/)  (v15 or above)
- [yarn](https://yarnpkg.com/)


## Setting up
1. Host this repository in your personal github account with name **recruit-interview**
2. Send us the link of your github repository in slack
3. Run following command to install dependencies
    ```bash
    yarn
    ```
Now you are ready for the challenges!

# Challenge #1

You can find a next.js project located in `pages/index.js`. Run the following command to start the project
```bash
yarn dev
```
It will start the app at port 3005, visit http://localhost:3005 in your browser to view the app. In it you can find a classic snake game, but with a few things missing.

We want to test how you can onboard yourself to an unfamiliar project and start adding value. There are a few bugs that we want you to fix and a feature we want you to implement.


### Your Tasks:
1. Currently when the snake eats a food, it doesn't change its size. Its size should increase by one every time it eats a food.
2. Currently it is possible to change direction to the opposite direction. Make it so that the snake can only change direction in a right angle. e.g: It will not possible to change from left direction to right, but will be possible to change from left to top or bottom.
3. Make it so that the snake dies and the game resets whenever the snake touches itself.
When the snake crosses the grid boundary, make it reappear from the opposite direction.
4. Currently there is only one food in the grid and it stays there until the snake eats it. Make it so that
    - there is a new food every 3 seconds
    - each food should disappear after 10 seconds


### What we are looking for:
- We want to test how well you understand modern react concepts like components, states and effects - including effect cleanup. Please make sure to brush up your react hooks knowledge while working on the project.
- Make sure to commit your code after each of the task and submit incomplete code even if they have bugs - it will increase your chances to have something work instead of nothing at all.
- Real world is messy and often there are no instruction manuals, hence make sure to infer and follow coding guideline of existing codebase as best as you can.


# Challenge #2
You can find this challenge in the `__tests__` directory. There are two files,
- `__tests__/1/data.json` contains the a JSON file with data
- `__tests__/1/1.js` will be the file you'll be working on

The data contains the organizational tree of an organization. Here's what the schema looks like
```ts
type Person = {
  _id: string;
  isActive: boolean;
  balance: number;
  age: number;
  eyeColor: string;
  name: string;
  gender: "male" | "female";
  email: string;
  tags: Array<string>;
  location: {
    longitude: number
    latitude: number
  };
  subordinates: Array<Person>
}
```

In short, `data.json` contains data about each person in an organization in a hierarchical fornat. We would like you to write some small functions using basic javascript functions (without any libraries) to get useful insights from the data.

Before you start, run
```bash
yarn test
```
And you will see something like
```
Test Suites: 1 failed, 1 total
Tests:       13 failed, 5 passed, 18 total
```

There are 13 small functions for you to complete, while we've provided 5 completed example for your reference along with hints.

When you are done with a challenge and want to test, simply run `yarn test` again and it will run the test suit against your code and show the result.


## If you have any questions, defintely reach out and ask us on slack.
