import person from "./data.js";
document.addEventListener("DOMContentLoaded", function () {
  console.log(getNumberOfChildren(person));

  const app = document.getElementById("app");

  //Y where the Tree will Start
  const initialTopGap = 50;

  //Getting screen width and height
  const screenWidth = window.innerWidth;
  const screenHeigth = window.innerHeight;

  //center from X axis
  const centerOfX = screenWidth / 2;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", screenWidth.toString());
  svg.setAttribute("height", screenHeigth.toString());
  svg.style.backgroundColor = "#242424";
  app.appendChild(svg);

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
    rect.setAttribute("x", x - width / 2);
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

    let age = document.createElementNS("http://www.w3.org/2000/svg", "text");
    age.setAttribute("x", x - 5);
    age.setAttribute("y", y + 30);
    age.setAttribute("fill", "white");
    age.setAttribute("font-size", "14");
    age.textContent = `Age: ${person.age}`;

    group.appendChild(age);

    return { x: x, y: y + 25 };
  }

  function createLine(x1, y1, x2, y2) {
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "aliceblue");
    line.setAttribute("stroke-width", "2");
    svg.appendChild(line);
  }

  function getNumberOfChildren(person) {
    //counts the number of children and grandchildren of a pers
    if (!person.children || person.children.length === 0) {
      // console.log(person.children);
      return 1;
    }
    return person.children.reduce((sum, child) => {
      // console.log(child);
      return sum + getNumberOfChildren(child);
    }, 1);
  }

  function renderTree(person, x, y, level = 0) {
    //Center line
    // createLine(x, 0, x, y);

    // This makes it center if has spouse
    // if (person?.spouse) {
    //   x = x - 60;
    // }

    //Height of one node is 50px and 50px for padding so 1 level = 80
    let yOffset = 100 * level;

    // console.log(person.spouse[0] === undefined ? 60 : 0);
    //Rendering the first person
    let position = createPersonNode(person, x, y + yOffset);

    if (person?.spouse?.length > 0) {
      let spousePosition = createPersonNode(
        person.spouse[0],
        centerOfX + 180,
        y + yOffset
      );

      createLine(
        position.x + 60,
        position.y,
        spousePosition.x - 60,
        spousePosition.y
      );

      // createLine(position.x, position.y, position.x, position.y + 60);

      createLine(
        position.x + 90,
        position.y,
        position.x + 90,
        position.y + 100
      );
    }

    if (person?.children.length > 0) {
      let treeWidth = getNumberOfChildren(person) * 120;
      let startX = position.x + 90;
      createLine(
        startX - treeWidth / 2,
        position.y + 100,
        startX + treeWidth / 2,
        position.y + 100
      );
      startX = startX - treeWidth / 2;
      let startY = position.y + 100;
      person.children.forEach((child) => {
        createLine(startX, startY, startX, startY + 100);
        startY += 100;
        renderTree(child, startX, startY);
        startX = startX + 150;
      });
    }
    // if (person.children && person.children.length > 0) {
    //   const diagnolConst = 25;

    //   let totalWidth = getNumberOfChildren(person) * 100;
    //   let startX = x - totalWidth / 2 + 50;
    //   let childY = y + 100 + yOffset;

    //   person.children.forEach((child) => {
    //     //120 is the width of rect and 30 for extra space
    //     let childWidth = getNumberOfChildren(child) * 150;
    //     let childPosition = renderTree(
    //       child,
    //       startX + childWidth / 2,
    //       childY,
    //       level + 1
    //     );
    //     createLine(
    //       position.x,
    //       position.y + diagnolConst,
    //       childPosition.x,
    //       childPosition.y - diagnolConst
    //     );
    //     startX += childWidth;
    //   });
    // }

    return position;
  }

  renderTree(person, centerOfX, initialTopGap);
});
