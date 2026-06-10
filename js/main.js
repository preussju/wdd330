import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

async function init() {
  try {
    const data = await getWorldCup();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

init();
