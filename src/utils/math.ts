export const sum = (nums: number[]) => nums.reduce((total, n) => total + n);

export const normalize = (vector: number[]) => {
  const total = sum(vector);
  return vector.map((n) => n / total);
};
