const person = {
  name: "John",
  age: 32,
  gender: "male",
  spouse: [{ name: "Jane", age: 30, gender: "female" }],
  children: [
    {
      name: "Emma",
      age: 5,
      gender: "female",
      spouse: [{ name: "Oliver", age: 27, gender: "male" }],
      children: [{ name: "Sophia", age: 1, gender: "female" }],
    },
    {
      name: "Lucas",
      age: 3,
      gender: "male",
      spouse: [{ name: "Emily", age: 28, gender: "female" }],
      children: [
        { name: "Oliver", age: 1, gender: "male" },
        { name: "Mia", age: 2, gender: "female" },
      ],
    },
    {
      name: "Emma",
      gender: "female",
    },
  ],
};
export default person;
