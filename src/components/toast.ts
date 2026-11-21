/** Tiny global toast bus — `notify("...")` from any client component. */
export const TOAST_EVENT = "app:toast";

export function notify(message: string) {
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }));
}
