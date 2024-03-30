// // Focus element on mount
// const focus = {
//   mounted: (el: any) => el.focus(),
// };

// // Click outside event
// const clickOutsideEvent = {
//   beforeMount: (el: any, binding: any) => {
//     el.clickOutsideEvent = (event: any) => {
//       if (!(el === event.target || el.contains(event.target))) {
//         binding.value(event, el);
//       }
//     };
//     document.addEventListener("click", el.clickOutsideEvent);
//   },
//   unmounted: (el: any) => {
//     document.removeEventListener("click", el.clickOutsideEvent);
//   },
// };

// export default {
//   directives: {
//     focus,
//     clickOutsideEvent,
//   },
// };

// import { DirectiveBinding } from "vue";

// // Focus element on mount
// const focus = {
//   mounted: (el: HTMLElement) => el.focus(),
// };

// // Click outside event
// export const clickOutsideEvent = {
//   beforeMount: (el: HTMLElement & { clickOutsideEvent?: EventListener }, binding: DirectiveBinding) => {
//     el.clickOutsideEvent = (event: Event) => {
//       if (!(el === event.target || el.contains(event.target as Node))) {
//         binding.value(event, el);
//       }
//     };
//     document.addEventListener("click", el.clickOutsideEvent);
//   },
// };

// export default {
//   directives: {
//     focus,
//     clickOutsideEvent,
//   },
// };

import { onBeforeUnmount, onMounted, Ref } from "vue";

export default function useDetectOutsideClick(
  component: Ref<HTMLElement | null>,
  callback: () => void
) {
  if (!component) return;

  const listener = (event: MouseEvent) => {
    if (
      !component.value ||
      (event.target !== component.value &&
        !event.composedPath().includes(component.value))
    ) {
      return;
    }
    callback();
  };

  onMounted(() => {
    window.addEventListener("click", listener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", listener);
  });

  return { listener };
}
