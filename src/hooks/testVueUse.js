import { useMouse } from '@vueuse/core';

export function useTestMouse() {
  const {x,y} = useMouse();
  return { x, y }
}