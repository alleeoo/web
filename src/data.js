const person = {
  name: "John",
  age: 50,
  gender: "male",
  spouse: [{ name: "Jane", age: 48, gender: "female" }],
  children: [
    {
      name: "Emma",
      age: 28,
      gender: "female",
      spouse: [{ name: "Oliver", age: 30, gender: "male" }],
      children: [
        { name: "Sophia", age: 6, gender: "female" },
        { name: "Ethan", age: 4, gender: "male" },
        { name: "Liam", age: 7, gender: "male" },
      ],
    },
    {
      name: "Lucas",
      age: 26,
      gender: "male",
      spouse: [{ name: "Emily", age: 25, gender: "female" }],
      children: [
        { name: "Oliver", age: 3, gender: "male" },
        { name: "Mia", age: 2, gender: "female" },
        { name: "Noah", age: 1, gender: "male" },
      ],
    },
    {
      name: "Ella",
      age: 24,
      gender: "female",
      spouse: [{ name: "James", age: 27, gender: "male" }],
      children: [
        { name: "Amelia", age: 3, gender: "female" },
        { name: "Benjamin", age: 4, gender: "male" },
        { name: "Charlotte", age: 1, gender: "female" },
      ],
    },
  ],
};

export const person4 = {
  name: "John",
  age: 50,
  gender: "male",
  spouse: [{ name: "Jane", age: 48, gender: "female" }],
  children: Array.from({ length: 10 }, (_, i) => ({
    name: `Child`,
    age: 20 + (i % 10),
    gender: i % 2 === 0 ? "male" : "female",
    spouse: [
      {
        name: `Spouse}`,
        age: 18 + (i % 10),
        gender: i % 2 === 0 ? "female" : "male",
      },
    ],
    children: Array.from({ length: 5 }, (_, j) => ({
      name: `Grandchild`,
      age: j + 1,
      gender: j % 2 === 0 ? "male" : "female",
      spouse: [
        {
          name: `Grandchild`,
          age: j + 2,
          gender: j % 2 === 0 ? "female" : "male",
        },
      ],
      children: Array.from({ length: 2 }, (_, k) => ({
        name: `Grandchild`,
        age: k + 1,
        gender: k % 2 === 0 ? "male" : "female",
        spouse: [
          {
            name: `Grandchild`,
            age: k + 2,
            gender: k % 2 === 0 ? "female" : "male",
          },
        ],
        children: Array.from({ length: 2 }, (_, m) => ({
          name: `Grandchild`,
          age: m + 1,
          gender: m % 2 === 0 ? "male" : "female",
          spouse: [],
          children: [],
        })),
      })),
    })),
  })),
};
// console.log(person4);
export default person;
