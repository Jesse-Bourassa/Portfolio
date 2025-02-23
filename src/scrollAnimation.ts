// src/directives/scrollAnimation.ts
import type { DirectiveBinding, ObjectDirective } from 'vue';

interface ScrollAnimationOptions {
  enterClass?: string;
  leaveClass?: string;
  threshold?: number;
}

const scrollAnimation: ObjectDirective<HTMLElement, ScrollAnimationOptions> = {
  mounted(el, binding: DirectiveBinding<ScrollAnimationOptions>) {
    // Classes to add/remove when the element becomes visible/invisible
    const enterClass = binding.value?.enterClass || 'animate-fadein';
    const leaveClass = binding.value?.leaveClass || '';

    // Intersection Observer callback
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add(enterClass);
          if (leaveClass) {
            el.classList.remove(leaveClass);
          }
        } else {
          if (leaveClass) {
            el.classList.add(leaveClass);
            el.classList.remove(enterClass);
          }
        }
      });
    };

    // Intersection Observer options
    const options: IntersectionObserverInit = {
      threshold: binding.value?.threshold || 0.1,
    };

    // Create observer
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);

    // Store the observer instance so we can disconnect it later
    (el as any)._scrollAnimationObserver = observer;
  },
  unmounted(el) {
    if ((el as any)._scrollAnimationObserver) {
      (el as any)._scrollAnimationObserver.disconnect();
    }
  },
};

export default scrollAnimation;