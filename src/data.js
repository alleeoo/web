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
  children: [
    {
      name: "Emma",
      age: 28,
      gender: "female",
      spouse: [{ name: "Oliver", age: 30, gender: "male" }],
      children: [
        { name: "Sophia", age: 6, gender: "female", spouse: [], children: [] },
        { name: "Ethan", age: 4, gender: "male", spouse: [], children: [] },
        { name: "Liam", age: 7, gender: "male", spouse: [], children: [] },
      ],
    },
    {
      name: "Lucas",
      age: 26,
      gender: "male",
      spouse: [{ name: "Emily", age: 25, gender: "female" }],
      children: [
        { name: "Oliver", age: 3, gender: "male", spouse: [], children: [] },
        { name: "Mia", age: 2, gender: "female", spouse: [], children: [] },
        { name: "Noah", age: 1, gender: "male", spouse: [], children: [] },
      ],
    },
    {
      name: "Ella",
      age: 24,
      gender: "female",
      spouse: [{ name: "James", age: 27, gender: "male" }],
      children: [
        { name: "Amelia", age: 3, gender: "female", spouse: [], children: [] },
        { name: "Benjamin", age: 4, gender: "male", spouse: [], children: [] },
        {
          name: "Charlotte",
          age: 1,
          gender: "female",
          spouse: [],
          children: [],
        },
      ],
    },
  ],
};

export default person;
