import { fetchLevel } from './levelQuery';
import van from "vanjs-core";
const {div, span, h5} = van.tags;


export function createLevelContent(percentage: number): HTMLDivElement {
  return div(
    { class: "gradient-ring" },
    div(
      { class: "inner-circle" },
      h5("Level"),
      span({ class: "percentage" }, `${percentage}`)
    )
  );
}

export async function initializeLevel(userLogin: string) {
  try {
    const levelData = await fetchLevel(userLogin);

    if (levelData instanceof Error) {
      console.error('Failed to fetch level data:', levelData.message);
      return;
    }


    const levelPercentage = levelData.level && levelData.level.length > 0
    // @ts-ignore
      ? levelData.level[0].amount 
      : 0;


    const levelElement = document.querySelector('#level');

    if (levelElement) {

      const levelContent = createLevelContent(levelPercentage);
      levelElement.appendChild(levelContent);
    } else {
      console.error('Level container not found');
    }
  } catch (error) {
    console.error('Error initializing level component:', error);
  }
}
