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
        {
          name: "Sophia",
          age: 6,
          gender: "female",
          children: [
            { name: "Eli", age: 2, gender: "male" },
            { name: "Aria", age: 1, gender: "female" },
          ],
        },
        {
          name: "Ethan",
          age: 4,
          gender: "male",
          children: [{ name: "Luca", age: 1, gender: "male" }],
        },
        { name: "Leo", age: 3, gender: "male" },
        { name: "Zoe", age: 2, gender: "female" },
      ],
    },
    {
      name: "Lucas",
      age: 26,
      gender: "male",
      spouse: [{ name: "Emily", age: 25, gender: "female" }],
      children: [
        {
          name: "Oliver",
          age: 3,
          gender: "male",
          children: [
            { name: "Isla", age: 1, gender: "female" },
            { name: "Nathan", age: 0, gender: "male" },
          ],
        },
        { name: "Mia", age: 2, gender: "female" },
        {
          name: "Noah",
          age: 1,
          gender: "male",
          children: [{ name: "Ava", age: 0, gender: "female" }],
        },
        { name: "Ava", age: 0, gender: "female" },
      ],
    },
    {
      name: "Ella",
      age: 24,
      gender: "female",
      spouse: [{ name: "James", age: 27, gender: "male" }],
      children: [
        {
          name: "Amelia",
          age: 3,
          gender: "female",
          children: [
            { name: "Charlotte", age: 1, gender: "female" },
            { name: "Evan", age: 2, gender: "male" },
          ],
        },
        { name: "Benjamin", age: 4, gender: "male" },
        {
          name: "Lily",
          age: 2,
          gender: "female",
          children: [{ name: "Henry", age: 1, gender: "male" }],
        },
        { name: "Nathan", age: 1, gender: "male" },
      ],
    },
    {
      name: "Daniel",
      age: 22,
      gender: "male",
      spouse: [{ name: "Olivia", age: 21, gender: "female" }],
      children: [
        {
          name: "Jack",
          age: 1,
          gender: "male",
          children: [{ name: "Eliana", age: 0, gender: "female" }],
        },
        { name: "Grace", age: 3, gender: "female" },
        { name: "Logan", age: 2, gender: "male" },
        {
          name: "Scarlett",
          age: 1,
          gender: "female",
          children: [{ name: "Noelle", age: 0, gender: "female" }],
        },
      ],
    },
  ],
};

export default person;
