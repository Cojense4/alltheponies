/**
 * Interaction feedback: vibration on Android, visual ripple on desktop.
 * iOS gracefully falls back to visual-only.
 */

const canVibrate =
  typeof navigator !== "undefined" && typeof navigator.vibrate === "function";

/**
 * Trigger haptic + visual feedback on an interactive element.
 * @param el  The element to show the ripple on (optional — vibration still fires)
 * @param ms  Vibration duration in ms (default 15)
 */
export function feedback(el?: HTMLElement | null, ms = 15): void {
  if (canVibrate) {
    navigator.vibrate(ms);
  }
  if (el) {
    ripple(el);
  }
}

function ripple(el: HTMLElement): void {
  // Ensure the element can contain the ripple
  const prev = getComputedStyle(el).position;
  if (prev === "static") {
    el.style.position = "relative";
  }

  const circle = document.createElement("span");
  circle.className = "haptic-ripple";

  // Size the ripple to cover the element
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  circle.style.width = circle.style.height = `${size}px`;

  el.appendChild(circle);

  circle.addEventListener("animationend", () => {
    circle.remove();
    // Restore position if we changed it
    if (prev === "static") {
      el.style.position = "";
    }
  });
}
