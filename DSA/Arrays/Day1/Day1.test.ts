import { expect, it, describe } from 'vitest';
import { twoSum } from './Day1.ts';

describe('twoSum', () => {
  it('should return indices [0, 1] for nums = [2, 7, 11, 15] and target = 9', () => {
    const nums = [2, 7, 11, 15];
    const target = 9;
    const result = twoSum(nums, target);
    expect(result).toEqual([0, 1]);
  });

  it('should return indices [1, 2] for nums = [3, 2, 4] and target = 6', () => {
    const nums = [3, 2, 4];
    const target = 6;
    const result = twoSum(nums, target);
    expect(result).toEqual([1, 2]);
  });

  it('should return indices [0, 1] for nums = [3, 3] and target = 6', () => {
    const nums = [3, 3];
    const target = 6;
    const result = twoSum(nums, target);
    expect(result).toEqual([0, 1]);
  });

  it('should return indices [2, 4] for nums = [1, 2, 3, 4, 5] and target = 8', () => {
    const nums = [1, 2, 3, 4, 5];
    const target = 8;
    const result = twoSum(nums, target);
    expect(result).toEqual([2, 4]);
  });
});
