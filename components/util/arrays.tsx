export const isZeroed = (array: any[]) => {
  return array.every((element) => {
    if (Array.isArray(element)) {
      return element.every((val) => val === 0);
    }
    return element === 0;
  });
};
