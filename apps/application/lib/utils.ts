import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatNumberToContractDestination(
  coordinateNumber: number
): number {
  let decimalsCount = 0;

  if (Math.floor(coordinateNumber.valueOf()) === coordinateNumber.valueOf())
    decimalsCount = 0;
  decimalsCount = coordinateNumber.toString().split(".")[1].length || 0;

  const formattedNumberToReturn = Math.pow(coordinateNumber, 9);

  if (decimalsCount < 9) {
    const decimalsToAdd = 9 - decimalsCount;
    const decimalsToAddString = "0".repeat(decimalsToAdd);
    return Number(`${formattedNumberToReturn}${decimalsToAddString}`);
  }
  if (decimalsCount > 9) {
    const decimalsToRemove = decimalsCount - 9;
    const decimalsToRemoveString = "0".repeat(decimalsToRemove);
    return Number(
      `${formattedNumberToReturn}`.replace(decimalsToRemoveString, "")
    );
  }
  return formattedNumberToReturn;
}
