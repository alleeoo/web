import person from "./data.js";
import { person4 } from "./data.js";
document.addEventListener("DOMContentLoaded", function () {
  const app = document.getElementById("app");

  const initialTopGap = 50;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const centerOfX = screenWidth / 2;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", screenWidth.toString());
  svg.setAttribute("height", screenHeight.toString());
  svg.style.backgroundColor = "#242424";
  app.appendChild(svg);

  const nodeWidth = 120;
  const nodeHeight = 50;
  const baseHorizontalGap = 50;
  const minHorizontalGap = 30;
  const verticalGap = 100;

  function createNode(person, x, y) {
    let group = document.createElementNS("http://www.w3.org/2000/svg", "g");

    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", nodeWidth.toString());
    rect.setAttribute("height", nodeHeight.toString());
    rect.setAttribute("x", (x - nodeWidth / 2).toString());
    rect.setAttribute("y", y.toString());
    rect.setAttribute("rx", "10");
    rect.setAttribute("fill", person.gender === "male" ? "#22406c" : "pink");
    rect.setAttribute("stroke", "#000");
    group.appendChild(rect);

    // let circle = document.createElementNS(
    //   "http://www.w3.org/2000/svg",
    //   "circle"
    // );
    // circle.setAttribute("cx", x.toString());
    // circle.setAttribute("cy", y.toString());
    // circle.setAttribute("r", "50");
    // circle.setAttribute("fill", "red");

    let img = document.createElementNS("http://www.w3.org/2000/svg", "image");
    img.setAttribute(
      "href",
      person.gender === "male"
        ? "/public/icons/male.png"
        : "/public/icons/female.png"
    );
    img.setAttribute("alt", "/public.icons/female.png");
    img.setAttribute("x", x - 60);
    img.setAttribute("y", y);
    img.setAttribute("height", "50");
    img.setAttribute("width", "50");
    group.appendChild(img);

    // group.appendChild(circle);

    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", (x + 20).toString());
    text.setAttribute("y", (y + 20).toString());
    text.setAttribute("fill", "white");
    text.setAttribute("font-size", "14");
    text.setAttribute("text-anchor", "middle");
    text.textContent = person.name;
    group.appendChild(text);

    let age = document.createElementNS("http://www.w3.org/2000/svg", "text");
    age.setAttribute("x", (x + 20).toString());
    age.setAttribute("y", (y + 40).toString());
    age.setAttribute("fill", "white");
    age.setAttribute("font-size", "12");
    age.setAttribute("text-anchor", "middle");
    age.textContent = `Age: ${person.age}`;
    group.appendChild(age);

    svg.appendChild(group);
    return { x: x, y: y + nodeHeight / 2 };
  }

  function createLine(x1, y1, x2, y2) {
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1.toString());
    line.setAttribute("y1", y1.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    line.setAttribute("stroke", "aliceblue");
    line.setAttribute("stroke-width", "2");
    svg.appendChild(line);
  }

  function getTreeWidth(person) {
    if (!person.children || person.children.length === 0) {
      return nodeWidth;
    }

    let totalWidth = 0;
    let numChildren = person.children.length;

    for (let i = 0; i < numChildren; i++) {
      let childWidth = getTreeWidth(person.children[i]);
      totalWidth += childWidth;
      if (i < numChildren) {
        totalWidth += Math.max(
          baseHorizontalGap,
          minHorizontalGap * numChildren
        );
      }
    }

    return Math.max(totalWidth, nodeWidth);
  }

  function renderTree(person, x, y) {
    // createLine(screenWidth / 2, 0, screenWidth / 2, 50); indicates center
    if (person?.spouse) {
      x = x - 120;
    }
    let position = createNode(person, x, y);
    let parentCenter = x;
    if (person?.spouse && person.spouse.length > 0) {
      //x is the position of first node and add some
      let spouseX = x + baseHorizontalGap + nodeWidth;
      let spousePos = createNode(person.spouse[0], spouseX, y);
      createLine(
        position.x + nodeWidth / 2,
        position.y,
        spousePos.x - nodeWidth / 2,
        spousePos.y
      );
      parentCenter = (x + spouseX) / 2;
    }

    if (person.children && person.children.length > 0) {
      let totalChildrenWidth = 0;
      let childrenWidths = [];
      for (let i = 0; i < person.children.length; i++) {
        let childWidth = getTreeWidth(person.children[i]);
        console.log("children Width", childrenWidths);
        childrenWidths.push(childWidth);
        totalChildrenWidth += childWidth;
      }
      totalChildrenWidth +=
        Math.max(baseHorizontalGap, minHorizontalGap * person.children.length) *
        (person.children.length - 1);

      let startX = parentCenter - totalChildrenWidth / 2;
      let childY = y + nodeHeight + verticalGap;

      let firstChildX = startX + childrenWidths[0] / 2;
      let lastChildX =
        startX +
        totalChildrenWidth -
        childrenWidths[childrenWidths.length - 1] / 2;
      let middleLineY = y + nodeHeight + 50;

      createLine(parentCenter, position.y, parentCenter, middleLineY);

      createLine(firstChildX, middleLineY, lastChildX, middleLineY);

      let currentX = startX;
      for (let i = 0; i < person.children.length; i++) {
        let childSubtreeWidth = childrenWidths[i];
        let childCenterX = currentX + childSubtreeWidth / 2;

        createLine(childCenterX, middleLineY, childCenterX, childY);

        renderTree(person.children[i], childCenterX, childY);
        currentX +=
          childSubtreeWidth +
          Math.max(
            baseHorizontalGap,
            minHorizontalGap * person.children.length
          );
      }
    }
    return position;
  }
  // createNode(person, screenWidth / 2, 50);
  renderTree(person4, centerOfX, initialTopGap);
});
