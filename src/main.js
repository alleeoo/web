import person from "./data.js";
import { person4 } from "./data.js";
let dummy = {
  name: 1,
  children: [],
};
document.addEventListener("DOMContentLoaded", function () {
  const app = document.getElementById("app");

  const nodeWidth = 50;
  const nodeHeight = 50;
  const baseHorizontalGap = 15;
  const verticalGap = 50;

  // console.log(getPeople(dummy));
  // console.log(getTreeWidth(dummy));

  const initialTopGap = 50;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const centerOfX = screenWidth / 2;

  // const container = document.createElement("div");
  // container.style.width = "100vw";
  // container.style.height = "100vh";
  // container.style.backgroundColor = "#242424";

  // app.appendChild(container);

  const scrollContainer = document.createElement("div");
  scrollContainer.style.width = "100vw";
  scrollContainer.style.height = "100vh";
  scrollContainer.style.overflow = "auto";
  scrollContainer.style.backgroundColor = "#242424";
  scrollContainer.style.display = "flex";
  scrollContainer.style.justifyContent = "center";
  scrollContainer.style.position = "relative";
  scrollContainer.style.alignItems = "flex-start";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const svgWidth = Math.max(getTreeWidth(person4) * 1.025, screenWidth * 1.5);
  // console.log("SVG Width: ", svgWidth);
  const svgHeight = Math.max(screenHeight, 800);

  svg.setAttribute("width", svgWidth.toString());
  svg.setAttribute("height", svgHeight.toString());
  svg.setAttribute("id", "svg");
  svg.style.overflow = "visible";
  svg.style.position = "absolute";
  svg.style.left = "0px";

  svg.scroll(svgWidth / 2, 0);
  scrollContainer.appendChild(svg);
  scrollContainer.scrollLeft = svgWidth / 2;
  app.appendChild(scrollContainer);

  // function createNode(person, x, y) {
  //   let group = document.createElementNS("http://www.w3.org/2000/svg", "g");

  //   let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  //   rect.setAttribute("width", nodeWidth.toString());
  //   rect.setAttribute("height", nodeHeight.toString());
  //   rect.setAttribute("x", (x - nodeWidth / 2).toString());
  //   rect.setAttribute("y", y.toString());
  //   rect.setAttribute("rx", "10");
  //   rect.setAttribute("fill", person.gender === "male" ? "#22406c" : "pink");
  //   rect.setAttribute("stroke", "#000");
  //   group.appendChild(rect);

  //   let img = document.createElementNS("http://www.w3.org/2000/svg", "image");
  //   img.setAttribute(
  //     "href",
  //     person.gender === "male"
  //       ? "/public/icons/male.png"
  //       : "/public/icons/female.png"
  //   );
  //   img.setAttribute("x", x - 60);
  //   img.setAttribute("y", y);
  //   img.setAttribute("height", "50");
  //   img.setAttribute("width", "50");
  //   group.appendChild(img);

  //   let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  //   text.setAttribute("x", (x + 20).toString());
  //   text.setAttribute("y", (y + 20).toString());
  //   text.setAttribute("fill", "white");
  //   text.setAttribute("font-size", "14");
  //   text.setAttribute("text-anchor", "middle");
  //   text.textContent = person.name;
  //   group.appendChild(text);

  //   let age = document.createElementNS("http://www.w3.org/2000/svg", "text");
  //   age.setAttribute("x", (x + 20).toString());
  //   age.setAttribute("y", (y + 40).toString());
  //   age.setAttribute("fill", "white");
  //   age.setAttribute("font-size", "12");
  //   age.setAttribute("text-anchor", "middle");
  //   age.textContent = `Age: ${person.age}`;
  //   group.appendChild(age);

  //   svg.appendChild(group);
  //   return { x: x, y: y + nodeHeight / 2 };
  // }

  function createCircleNode(person, x, y) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

    svg.appendChild(group);

    const image = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "image"
    );

    image.setAttribute("width", nodeWidth);
    image.setAttribute("height", nodeHeight);
    image.setAttribute("x", x.toString());
    image.setAttribute("y", y.toString());

    image.setAttribute(
      "href",
      person.gender === "male" ? "/icons/male.png" : "/icons/female.png"
    );

    group.appendChild(image);

    let name = document.createElementNS("http://www.w3.org/2000/svg", "text");
    name.setAttribute("font-size", "14");
    name.setAttribute("fill", "white");
    name.setAttribute("text-anchor", "middle");
    name.textContent = person.name;
    name.setAttribute("x", x + 25);
    name.setAttribute("y", y + 60);

    group.appendChild(name);

    return { x: x, y: y + nodeHeight / 2 };
  }

  function createLine(x1, y1, x2, y2) {
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1.toString());
    line.setAttribute("y1", y1.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    line.setAttribute("stroke", "cyan");
    line.setAttribute("stroke-width", "2");
    svg.appendChild(line);
  }

  function getTreeWidth(person) {
    if (!person.children || person.children.length === 0) {
      return nodeWidth;
    }
    const childrenWidths = person.children.map(getTreeWidth);
    let totalWidth = childrenWidths.reduce((sum, width) => sum + width, 0);

    let spacing = baseHorizontalGap * person.children.length;
    totalWidth += spacing * (person.children.length - 1);

    return totalWidth;
  }
  function getPeople(person) {
    if (!person.children || person.children.length === 0) {
      return 1;
    }
    return person.children.reduce((sum, child) => {
      // console.log(child);
      return sum + getNumberOfChildren(child);
    }, 1);
  }
  function renderTree(person, x, y) {
    // createLine(x, 0, x, 50);
    let position = createCircleNode(person, x - 25, y);
    let parentCenter = x;

    if (person?.spouse && person.spouse.length > 0) {
      let spouseX = x + baseHorizontalGap + nodeWidth;
      let spousePos = createCircleNode(person.spouse[0], spouseX, y);
      createLine(position.x + nodeWidth, position.y, spousePos.x, spousePos.y);
      parentCenter = (x + 25 + spouseX) / 2;
    }

    if (person.children && person.children.length > 0) {
      let childrenWidths = person.children.map(getTreeWidth);
      let totalChildrenWidth = childrenWidths.reduce(
        (sum, width) => sum + width,
        0
      );
      totalChildrenWidth +=
        baseHorizontalGap *
        person.children.length *
        (person.children.length - 1);

      // console.log("Total Children Width: ", totalChildrenWidth);

      let startX = parentCenter - totalChildrenWidth / 2;
      let childY = y + nodeHeight + verticalGap;

      let firstChildX = startX + childrenWidths[0] / 2;
      let lastChildX =
        startX +
        totalChildrenWidth -
        childrenWidths[childrenWidths.length - 1] / 2;
      let middleLineY = y + nodeHeight + verticalGap / 2;

      createLine(parentCenter, position.y, parentCenter, middleLineY);
      createLine(firstChildX, middleLineY, lastChildX, middleLineY);

      let currentX = startX;
      for (let i = 0; i < person.children.length; i++) {
        let childSubtreeWidth = childrenWidths[i];
        let childCenterX = currentX + childSubtreeWidth / 2;

        createLine(childCenterX, middleLineY, childCenterX, childY);
        renderTree(person.children[i], childCenterX, childY);
        currentX +=
          childSubtreeWidth + baseHorizontalGap * person.children.length;
      }
    }
    return position;
  }
  // createCircleNode(person, 0, 0);
  renderTree(person4, svgWidth / 2 - 50, initialTopGap);
  setTimeout(() => {
    scrollContainer.scrollLeft = (svgWidth - screenWidth) / 2;
  }, 100);
});
