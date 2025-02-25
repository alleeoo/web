import "./style.css";

let app = document.getElementById("app");
let person = {
  name: "John",
  age: 32,
  gender: "male",
  img: "/public/icons/male.png",
  spouse: [
    {
      name: "Jane",
      age: 30,
      gender: "female",
      img: "/public/icons/female.png",
    },
  ],
  children: [
    {
      name: "Emma",
      age: 5,
      gender: "female",
      img: "/public/icons/female.png",
      children: [
        {
          name: "Sophia",
          age: 1,
          gender: "female",
          img: "/public/icons/female.png",
        },
      ],
      spouse: [
        {
          name: "Oliver",
          age: 27,
          gender: "male",
          img: "/public/icons/male.png",
        },
      ],
    },
    {
      name: "Lucas",
      age: 3,
      gender: "male",
      img: "/public/icons/male.png",
      children: [
        {
          name: "Oliver",
          age: 1,
          gender: "male",
          img: "/public/icons/male.png",
        },
        {
          name: "Mia",
          age: 2,
          gender: "female",
          img: "/public/icons/female.png",
        },
      ],
    },
  ],
};

function displayPerson(person) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundColor = person.gender === "male" ? "#22406c" : "pink";

  let imgDiv = document.createElement("div");
  imgDiv.id = "imgDiv";
  let img = document.createElement("img");
  img.src = person.img;
  img.alt = "Profile Picture";
  img.style.width = "100%";
  imgDiv.appendChild(img);
  card.appendChild(imgDiv);

  let info = document.createElement("div");
  info.classList.add("info");

  let name = document.createElement("div");
  name.innerText = `Name: ${person.name}`;
  info.appendChild(name);

  let age = document.createElement("div");
  age.innerText = `Age: ${person.age}`;
  info.appendChild(age);

  let gender = document.createElement("div");
  gender.innerText = `Gender: ${person.gender}`;
  info.appendChild(gender);

  card.appendChild(info);

  console.log(card);

  return card;

  // <div class="card" style = "${
  //   person.gender === "male"
  //     ? "background-color:#22406c"
  //     : "background-color:pink"
  // }">
  // <div id= "imgDiv"> <img src="${
  //   person.img
  // }" alt="John" style="width:100%"></div>
  //   <div class="info"><div>
  //   <div>Name:   ${person.name}</div>
  //   </div>
  //   <div>Age: ${person.age} years old</div>
  //   <div>Gender: ${person.gender}</div>
  //   </div>
  // <div>
  // `;
}
function renderData(person) {
  let tree = document.createElement("div");
  tree.classList.add("tree");

  let parentDiv = document.createElement("div");
  parentDiv.classList.add("parentDiv");

  let childDiv = document.createElement("div");
  childDiv.classList.add("childDiv");

  tree.appendChild(parentDiv);

  parentDiv.appendChild(displayPerson(person));

  if (person?.spouse?.length > 0) {
    parentDiv.appendChild(renderData(person.spouse[0]));
  }

  if (person?.children?.length > 0) {
    person.children.forEach((child) => {
      childDiv.appendChild(renderData(child));
    });
  }

  tree.appendChild(childDiv);

  console.log(tree);
  return tree;
}

app.appendChild(renderData(person));

// document.querySelector("#app").innerHTML = `
//   <div>
//   ${renderData(person)}
//   </div>
// `;
