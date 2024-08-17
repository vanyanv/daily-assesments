export function twoSum(nums: number[], target: number): number[] | null {
  if (nums.length === 0) return null;

  const cache = {};

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];

    if (cache.hasOwnProperty(target - current)) {
      console.log([cache[target - current], i]);
      return [cache[target - current], i];
    }

    cache[current] = i;
  }

  return null; // Add this line to handle the case when no matching pair is found
}
