import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeDuplicates<T>(arr: T[], uniqueKey: keyof T) {
  return arr.filter(
    (v, i, a) => a.findIndex((v2) => v2[uniqueKey] === v[uniqueKey]) === i
  );
}

export function arrayToMap<T>(
  arr: T[],
  keyProperty: keyof T,
  valueKey: keyof T
) {
  return new Map(arr.map((entry) => [entry[keyProperty], entry[valueKey]]));
}
