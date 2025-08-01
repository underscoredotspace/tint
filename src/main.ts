const column = document.querySelector<HTMLElement>(".column")!;
const dropLine = document.createElement("div");
dropLine.className = "drop-line";

let dragged: HTMLElement | null = null;

column.addEventListener("dragstart", (e: DragEvent) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("card")) {
    dragged = target;
    e.dataTransfer?.setData("text/plain", target.id);
    e.dataTransfer!.effectAllowed = "move";
  }
});

column.addEventListener("dragover", (e: DragEvent) => {
  e.preventDefault();

  const target = (e.target as HTMLElement).closest(".card");
  if (!dragged || !target || dragged === target) {
    dropLine.remove();
    return;
  }

  const bounding = target.getBoundingClientRect();
  const offsetY = e.clientY - bounding.top;
  const parent = target.parentElement!;
  const insertBefore = offsetY < bounding.height / 2;

  const referenceNode = insertBefore ? target : target.nextSibling;

  // Don't insert dropLine if it's already in the right place
  if (referenceNode === dragged || dropLine.nextSibling === referenceNode) {
    return;
  }

  if (dropLine.parentElement) {
    dropLine.remove();
  }

  parent.insertBefore(dropLine, referenceNode);
});

column.addEventListener("drop", (e: DragEvent) => {
  e.preventDefault();

  if (dragged && dropLine.parentElement) {
    dropLine.parentElement.insertBefore(dragged, dropLine);
  }

  dropLine.remove();
  dragged = null;
});

column.addEventListener("dragend", () => {
  dropLine.remove();
  dragged = null;
});
