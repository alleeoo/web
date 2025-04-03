import Panzoom from "@panzoom/panzoom";
import person from "./data.js";

const height = "1000";
const width = "1000";

const nodeWidth = 50;
const nodeHeight = 50;
const baseHorizontalGap = 15;
const verticalGap = 50;

const initialTopGap = 50;
const screenWidth = window.innerWidth;

const scrollContainer = document.createElement("div");

document.addEventListener("DOMContentLoaded", function () {
  const app = document.getElementById("app");

  scrollContainer.style.overflow = "auto";
  scrollContainer.style.backgroundColor = "#242424";
  scrollContainer.style.display = "flex";
  scrollContainer.style.minHeight = height.concat("px");
  scrollContainer.style.minWidth = width.concat("px");
  scrollContainer.style.justifyContent = "center";
  scrollContainer.style.position = "relative";
  scrollContainer.style.alignItems = "flex-start";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  const svgWidth = width;
  const svgHeight = height;

  svg.setAttribute("width", svgWidth.toString());
  svg.setAttribute("height", svgHeight.toString());
  svg.setAttribute("id", "svg");
  svg.style.overflow = "visible";
  svg.style.position = "absolute";
  svg.style.left = "0px";

  svg.scroll(svgWidth / 2, 0); // Review this later

  scrollContainer.appendChild(svg);
  scrollContainer.scrollLeft = svgWidth / 2;

  console.log(scrollContainer);

  app.appendChild(scrollContainer);

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
  renderTree(person, svgWidth / 2 - 50, initialTopGap);
  const panzoom = Panzoom(svg, {
    maxScale: 5,
  });
  panzoom.pan(10, 10);
  panzoom.zoom(1);
  svg.parentElement.addEventListener("wheel", panzoom.zoomWithWheel);
  setTimeout(() => {
    scrollContainer.scrollLeft = (svgWidth - screenWidth) / 2;
  }, 100);
});
