import { fetchLevel } from "./levelQuery";

function createLevelContent(percentage: number): HTMLDivElement {
  const gradientRing = document.createElement("div");
  gradientRing.className = "gradient-ring";

  const innerCircle = document.createElement("div");
  innerCircle.className = "inner-circle";

  const percentageText = document.createElement("span");
  percentageText.className = "percentage";
  percentageText.textContent = `${percentage}`;

  innerCircle.appendChild(percentageText);
  gradientRing.appendChild(innerCircle);

  return gradientRing;
}

export async function initializeLevel(userLogin: string) {
  try {
    const levelData = await fetchLevel(userLogin);

    if (levelData instanceof Error) {
      console.error("Failed to fetch level data:", levelData.message);
      return;
    }

    const levelPercentage =
      levelData.level && levelData.level.length > 0
        ? // @ts-ignore
          levelData.level[0].amount
        : 0;

    const levelElement = document.querySelector("#level");

    if (levelElement) {
      const levelContent = createLevelContent(levelPercentage);
      levelElement.appendChild(levelContent);
    } else {
      console.error("Level container not found");
    }
  } catch (error) {
    console.error("Error initializing level component:", error);
  }
}
