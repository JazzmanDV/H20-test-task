function getColorsFromStyleSheets(styleSheets) {
    const colors = {};

    for (const styleSheet of styleSheets) {
        for (const cssRule of styleSheet.cssRules) {
            const cssRuleText = cssRule.cssText;
            const cssProperties = cssRuleText.split("{")[1].split("}")[0].split(";");

            for (let cssProperty of cssProperties) {
                cssProperty = cssProperty.trim();

                const matchResult = cssProperty.match(/color\s*:\s*(?<color>.+)/i);
                if (!matchResult) {
                    continue;
                }

                const color = matchResult.groups["color"];

                if (!colors[color]) {
                    colors[color] = { colorText: color, cssRules: new Set() };
                }

                colors[color].cssRules.add(cssRuleText);
            }
        }
    }

    return colors;
}

function createListItem(cssRule) {
    const listItem = document.createElement("li");
    listItem.classList.add("css-rules-list__item");

    listItem.innerText = cssRule;

    return listItem;
}

function createList(cssRules) {
    const list = document.createElement("ul");
    list.classList.add("css-rules-list");

    for (const cssRule of cssRules) {
        const listItem = createListItem(cssRule);

        list.appendChild(listItem);
    }

    return list;
}

function createTileGridItemPopUp(color) {
    const tileGridItemPopUp = document.createElement("div");
    tileGridItemPopUp.classList.add("tile-grid__item-pop-up");

    const tileGridItemColorText = document.createElement("span");
    tileGridItemColorText.innerText = color.colorText;
    tileGridItemPopUp.appendChild(tileGridItemColorText);

    const orderedList = createList(color.cssRules);
    tileGridItemPopUp.appendChild(orderedList);

    return tileGridItemPopUp;
}

function createTileGridItem(color) {
    const tileGridItem = document.createElement("div");
    tileGridItem.style.backgroundColor = color.colorText;
    tileGridItem.classList.add("tile-grid__item");

    const tileGridItemPopUp = createTileGridItemPopUp(color);
    tileGridItem.appendChild(tileGridItemPopUp);

    tileGridItem.addEventListener("click", () => {
        tileGridItem.classList.toggle("tile-grid__item--active");
    });

    return tileGridItem;
}

const styleSheets = Array.from(document.styleSheets).filter((styleSheet) => styleSheet.href !== null);
const colors = getColorsFromStyleSheets(styleSheets);

const tileGrid = document.getElementById("tile-grid");
let counter = 0;

for (const color in colors) {
    const tileGridItem = createTileGridItem(colors[color]);
    tileGrid.appendChild(tileGridItem);
    counter++;
}

document.getElementById("tiles-count").textContent += ` ${counter}`;
