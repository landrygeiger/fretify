export const flashElement = (
  element: Element,
  color: string,
  duration = 500
) => {
  if (!(element instanceof HTMLElement)) return;

  const originalColor = element.style.backgroundColor;
  const originalTransition = element.style.transition;

  element.style.backgroundColor = color;

  setTimeout(() => {
    element.style.backgroundColor = originalColor;
    element.style.transition = `background-color ${duration / 2}ms ease-in-out`;

    setTimeout(() => {
      element.style.transition = originalTransition;
    }, duration / 2);
  }, duration / 2);
};
