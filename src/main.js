import person from "./data.js";
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

  function createPersonNode(person, x, y) {
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

    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x.toString());
    text.setAttribute("y", (y + 25).toString());
    text.setAttribute("fill", "white");
    text.setAttribute("font-size", "14");
    text.setAttribute("text-anchor", "middle");
    text.textContent = person.name;
    group.appendChild(text);

    let age = document.createElementNS("http://www.w3.org/2000/svg", "text");
    age.setAttribute("x", x.toString());
    age.setAttribute("y", (y + 45).toString());
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

  function computeSubtreeWidth(person) {
    if (!person.children || person.children.length === 0) {
      return nodeWidth;
    }

    let totalWidth = 0;
    let numChildren = person.children.length;

    for (let i = 0; i < numChildren; i++) {
      let childWidth = computeSubtreeWidth(person.children[i]);
      totalWidth += childWidth;
      if (i < numChildren - 1) {
        totalWidth += Math.max(
          baseHorizontalGap,
          minHorizontalGap * numChildren
        );
      }
    }

    return Math.max(totalWidth, nodeWidth);
  }

  function renderTree(person, x, y) {
    let position = createPersonNode(person, x, y);

    let parentCenter = x;
    if (person?.spouse && person.spouse.length > 0) {
      let spouseX = x + nodeWidth + baseHorizontalGap;
      let spousePos = createPersonNode(person.spouse[0], spouseX, y);
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
        let cw = computeSubtreeWidth(person.children[i]);
        childrenWidths.push(cw);
        totalChildrenWidth += cw;
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
      let middleLineY = y + nodeHeight;

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

  renderTree(person, centerOfX, initialTopGap);
});
