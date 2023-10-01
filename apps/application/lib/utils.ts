import { toEther } from "@thirdweb-dev/sdk";
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
  const expNumber = Math.pow(10, 9);

  return expNumber * coordinateNumber;
}

export function formatProposalsFromContract(proposalsFromContract: any[]) {
  const proposalsRAW = proposalsFromContract.map((proposal: any) => {
    const proposalsFormatted =
      formatRawArrayToCleanObjectNamedEntries(proposal);
    return proposalsFormatted;
  });

  return proposalsRAW;
}

export const formatRawArrayToCleanObjectNamedEntries = (rawArray: any) => {
  let entriesRaw;

  if (rawArray.length === 1) {
    entriesRaw = Object.keys(rawArray[0]);
  } else {
    entriesRaw = Object.keys(rawArray);
  }

  const entriesNamedOnly = entriesRaw
    .map((entry: string) => {
      if (parseInt(entry) >= 0) {
        return;
      }

      return {
        [entry]: rawArray[entry],
      };
    })
    .filter((entry: any) => entry !== undefined);

  const entriesNamedOnlyObject = entriesNamedOnly.reduce(
    (acc: any, entry: any) => {
      const key = Object.keys(entry)[0];
      const value = entry[key];
      acc[key] = value;
      return acc;
    },
    {}
  );
  return entriesNamedOnlyObject;
};

export const formatProposalsWithVotingIterations = (
  proposals: any,
  votingIterations: any
) => {
  const proposalsWithVotingIterations = proposals.map((proposal: any) => {
    const proposalVotingIterations = votingIterations.find(
      (votingIteration: any) => {
        return (
          toEther(votingIteration.proposalId) === toEther(proposal.proposalId)
        );
      }
    );

    const proposalVotingIterationsObject =
      formatRawArrayToCleanObjectNamedEntries(proposalVotingIterations);
    return {
      ...proposal,
      votingIterations: proposalVotingIterationsObject,
    };
  });

  // console.log({ proposalsWithVotingIterations });
  return proposalsWithVotingIterations;
};
