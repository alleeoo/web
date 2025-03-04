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
      spouse: [
        {
          name: "Oliver",
          age: 27,
          gender: "male",
          img: "/public/icons/male.png",
        },
      ],
      children: [
        {
          name: "Sophia",
          age: 1,
          gender: "female",
          img: "/public/icons/female.png",
        },
      ],
    },
    {
      name: "Lucas",
      age: 3,
      gender: "male",
      img: "/public/icons/male.png",
      spouse: [
        {
          name: "Emily",
          age: 28,
          gender: "female",
          img: "/public/icons/female.png",
        },
      ],
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

function renderPerson(person) {
  //Creating a parent card element
  let card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundColor = person.gender === "male" ? "#22406c" : "pink";
  //Profile Picture
  let imgDiv = document.createElement("div");
  imgDiv.id = "imgDiv";
  let img = document.createElement("img");
  img.src = person.img;
  img.alt = "Profile Picture";
  img.style.width = "100%";
  imgDiv.appendChild(img);
  card.appendChild(imgDiv);
  //Info Parent element
  let info = document.createElement("div");
  info.classList.add("info");
  //Name Tag
  let name = document.createElement("div");
  name.innerText = `Name: ${person.name}`;
  info.appendChild(name);
  //Age
  let age = document.createElement("div");
  age.innerText = `Age: ${person.age}`;
  info.appendChild(age);
  //Gender
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
function connectingLine() {
  return horizontalLine();
}
function connectingSvg() {
  let svg = document.createElement("img");
  svg.setAttribute("src", "/public/spouseLine/line.svg");
  svg.setAttribute("id", "svg");
  svg.classList.add("svg");
  return svg;
}
function crossingLine() {
  let container = document.createElement("div");
  container.classList.add("crossLine");

  container.insertAdjacentElement("beforeend", horizontalLine());
  container.insertAdjacentElement("beforeend", verticalLine());

  return container;
}
function horizontalLine() {
  let lineDiv = document.createElement("div");
  lineDiv.classList.add("connectingLine");
  let line = document.createElement("hr");
  line.setAttribute("id", "horizontalLine");
  lineDiv.insertAdjacentElement("beforeend", line);
  return lineDiv;
}
function verticalLine() {
  let lineDiv = document.createElement("div");
  lineDiv.classList.add("childrenLine");
  let line = document.createElement("hr");
  line.setAttribute("id", "vertricalLine");
  lineDiv.appendChild(line);
  return lineDiv;
}
function renderTree(person) {
  let tree = document.createElement("div");
  tree.classList.add("tree");

  let container = document.createElement("div");
  container.classList.add("container");

  container.appendChild(renderPerson(person));

  tree.appendChild(container);

  if (person?.spouse.length > 0) {
    container.insertAdjacentElement("beforeend", crossingLine());
    container.insertAdjacentElement(
      "beforeend",
      renderPerson(person.spouse[0])
    );
  }

  return tree;
}
app.appendChild(renderTree(person));
