document.addEventListener("DOMContentLoaded", function () {
  const app = document.getElementById("app");

  const initialTopGap = 50;

  const screenWidth = window.innerWidth;
  const screenHeigth = window.innerHeight;

  //center from X axis
  const centerOfX = screenWidth / 2;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100vw");
  svg.setAttribute("height", "100vh");
  svg.style.border = "1px solid black";
  svg.style.backgroundColor = "#f5f5f5";
  app.appendChild(svg);

  let person = {
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
    ],
  };

  function createPersonNode(person, x, y) {
    //Height andd width of code
    const width = 120;
    const height = 50;

    let group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    //Size of each Node
    rect.setAttribute("width", width.toString());
    rect.setAttribute("height", height.toString());
    //Position of each Node
    rect.setAttribute("x", x - 60);
    rect.setAttribute("y", y);

    //Styling
    rect.setAttribute("rx", "10");
    rect.setAttribute("fill", person.gender === "male" ? "#22406c" : "pink");
    rect.setAttribute("stroke", "#000");
    group.appendChild(rect);

    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x - 50);
    text.setAttribute("y", y + 30);
    text.setAttribute("fill", "white");
    text.setAttribute("font-size", "14");
    text.textContent = person.name;
    group.appendChild(text);

    svg.appendChild(group);

    return { x: x, y: y + 25 };
  }

  function createLine(x1, y1, x2, y2) {
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", "2");
    svg.appendChild(line);
  }

  function getTreeWidth(person) {
    if (!person.children || person.children.length === 0) {
      return 1;
    }
    return person.children.reduce((sum, child) => sum + getTreeWidth(child), 3);
  }

  function renderTree(person, x, y, level = 0) {
    if (person?.spouse) {
      x = x - 80;
    }

    //Height of one node is 50px and 30px for padding so 1 level = 80
    let yOffset = 80 * level;
    let position = createPersonNode(person, x, y + yOffset);

    if (person?.spouse?.length > 0) {
      let spousePosition = createPersonNode(
        person.spouse[0],
        x + 200,
        y + yOffset
      );
      createLine(
        position.x + 60,
        position.y,
        spousePosition.x - 60,
        spousePosition.y
      );
    }

    if (person.children && person.children.length > 0) {
      let totalWidth = getTreeWidth(person) * 100;
      let startX = x - totalWidth / 2 + 50;
      let childY = y + 100 + yOffset;

      person.children.forEach((child) => {
        //120 is the width of rect and 30 for extra space
        let childWidth = getTreeWidth(child) * 150;
        let childPosition = renderTree(
          child,
          startX + childWidth / 2,
          childY,
          level + 1
        );
        createLine(
          position.x,
          position.y + 25,
          childPosition.x,
          childPosition.y - 25
        );
        startX += childWidth;
      });
    }

    return position;
  }

  renderTree(person, centerOfX, initialTopGap);
});
