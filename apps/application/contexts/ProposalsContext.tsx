import { createContext, useContext, useMemo } from "react";
import { type ReactNode, useState } from "react";
import { IEvidence, ILocation, IProposalInfo } from "@/interfaces";
import {
  useContract,
  useContractRead,
  useContractWrite,
  useStorageUpload,
} from "@thirdweb-dev/react";
import { contractAddress_zengoDao } from "@/const/contracts";
import {
  formatNumberToContractDestination,
  formatProposalsFromContract,
  formatProposalsWithVotingIterations,
  formatRawArrayToCleanObjectNamedEntries,
} from "@/lib/utils";
import { useRouter } from "next/router";
import { toEther, toUnits } from "@thirdweb-dev/sdk";

interface IProposalsContext {
  evidence: IEvidence;
  setEvidence: (evidence: IEvidence) => void;
  location: ILocation;
  setLocation: (location: ILocation) => void;
  proposalInfo: IProposalInfo;
  setProposalInfo: (proposal: IProposalInfo) => void;
  uploadEvidenceToIpfs: (fileToUpload: File) => Promise<string[]>;
  submitProposalForm: () => void;
  metadataUploadIsLoading: boolean;
  submitProposalFormIsLoading: boolean;
  submitProposalSuccess: boolean;
  addVotingIterationCall: (proposalId: string) => void;
  concludeVotingIterationCall: (
    votingIterationId: string,
    proposalId: string
  ) => void;
  voteToClassifyProposalCall: (
    vote: number,
    votingIteration: number,
    proposalId: number
  ) => void;
  addEvidenceCall: (props: IAddEvidenceCallProps) => void;
  proposalsToList: any[];
}

interface ISubmitProposalProps {
  title: string;
  proposalDescription: string;
  evidenceDescription: string;
  evidenceUri: string;
  proposalType: string;
  streetAddress: string;
  proposalEvidenceTimestamp: number;
  latitude: number;
  longitude: number;
}

interface IAddEvidenceCallProps {
  proposalId: number;
  evidenceTimestamp: number;
  votingIteration: number;
  evidenceDescription: string;
  evidenceUri: string;
}

export const ProposalsContext = createContext<IProposalsContext | undefined>(
  undefined
  //   {
  //   evidence: {
  //     date: "",
  //     description: "",
  //     ipfsUrl: "",
  //   },
  //   setEvidence: () => {},
  //   location: {
  //     locationText: "",
  //     gMapsLocationObject: { lat: 20.587834, lng: -100.389245 },
  //   },
  //   setLocation: () => {},
  //   proposalInfo: {
  //     title: "",
  //     type: "",
  //     description: "",
  //   },
  //   setProposalInfo: () => {},
  //   clearFormState: () => {},
  //   uploadEvidenceToIpfs: () => {},
  //   submitProposalForm: () => {},
  //   metadataUploadIsLoading: false,
  //   submitProposalFormIsLoading: false,
  //   submitProposalSuccess: false,
  //   addVotingIterationCall: (proposalId: string) => {},
  //   concludeVotingIterationCall: (
  //     votingIterationId: string,
  //     proposalId: string
  //   ) => {},
  //   voteToClassifyProposalCall: (
  //     vote: number,
  //     votingIteration: number,
  //     proposalId: number
  //   ) => {},
  //   addEvidenceCall: (props: IAddEvidenceCallProps) => {},
  //   uploadFileToIpfs: (fileToUpload: File) => Promise.resolve(""),
  // }
);

interface IProps {
  children: ReactNode;
}

export function ProposalsContextProvider({ children }: IProps) {
  const [metadataUploadIsLoading, setMetadataUploadIsLoading] = useState(false);
  const [submitProposalSuccess, setSubmitProposalSuccess] = useState(false);
  const { mutateAsync: upload } = useStorageUpload();
  const [proposalsToList, setProposalsToList] = useState<any[]>([]); // [proposalId, proposalId, proposalId
  const router = useRouter();

  const [evidence, setEvidence] = useState<IEvidence>({
    date: "",
    description: "",
    ipfsUri: "",
  });

  const [location, setLocation] = useState<ILocation>({
    locationText: "",
    gMapsLocationObject: { lat: 20.587834, lng: -100.389245 },
  });

  const [proposalInfo, setProposalInfo] = useState<IProposalInfo>({
    title: "",
    type: "",
    description: "",
  });

  const clearFormState = () => {
    setEvidence({
      date: "",
      description: "",
      ipfsUri: "",
    });
    setLocation({
      locationText: "",
      gMapsLocationObject: { lat: 20.587834, lng: -100.389245 },
    });
    setProposalInfo({
      title: "",
      type: "",
      description: "",
    });
    setSubmitProposalSuccess(false);
  };

  const uploadEvidenceToIpfs = async (
    fileToUpload: File
  ): Promise<string[]> => {
    return await upload({
      data: [fileToUpload],
      options: { uploadWithGatewayUrl: false, uploadWithoutDirectory: true },
    });
  };

  const { contract: contractZengoDao /*, isLoading, error */ } = useContract(
    contractAddress_zengoDao
  );

  const uploadProposalMetadataToIpfs = async () => {
    setMetadataUploadIsLoading(true);

    const proposalJsonToIpfs = {
      ...proposalInfo,
      location: {
        ...location,
        savedFormatedValues: {
          lat: formatNumberToContractDestination(
            location.gMapsLocationObject.lat
          ),
          lng: formatNumberToContractDestination(
            location.gMapsLocationObject.lng
          ),
        },
      },
      evidence: {
        ...evidence,
        datetimestamp: new Date(evidence.date).getTime(),
      },
    };

    const uploadUrl = await upload({
      data: [proposalJsonToIpfs],
      options: { uploadWithGatewayUrl: false, uploadWithoutDirectory: true },
    });

    console.log({ uploadUrl });

    setMetadataUploadIsLoading(false);

    if (uploadUrl) {
      return uploadUrl[0];
    }
  };

  const { mutateAsync: submitProposal, isLoading: submitProposalIsLoading } =
    useContractWrite(contractZengoDao, "submitProposal");

  const submitProposalCall = async ({
    title,
    proposalDescription,
    evidenceDescription,
    evidenceUri,
    proposalType,
    streetAddress,
    proposalEvidenceTimestamp,
    latitude,
    longitude,
  }: ISubmitProposalProps) => {
    try {
      const data = await submitProposal({
        args: [
          title,
          proposalDescription,
          evidenceDescription,
          evidenceUri,
          proposalType,
          streetAddress,
          proposalEvidenceTimestamp,
          formatNumberToContractDestination(latitude),
          formatNumberToContractDestination(longitude),
        ],
      });

      console.info("contract call successs", data);
      setSubmitProposalSuccess(true);
      clearFormState();
      router.push("/proposals");
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const submitProposalForm = async () => {
    try {
      // const metadataPath = await uploadProposalMetadataToIpfs();

      // if (metadataPath) {
      const evidenceDate = new Date(evidence.date);
      const evidenceTimestamp = evidenceDate.getTime();

      await submitProposalCall({
        title: proposalInfo.title,
        proposalDescription: proposalInfo.description,
        proposalType: proposalInfo.type,
        evidenceDescription: evidence.description,
        evidenceUri: evidence.ipfsUri,
        streetAddress: location.locationText,
        proposalEvidenceTimestamp: evidenceTimestamp,
        latitude: location.gMapsLocationObject.lat,
        longitude: location.gMapsLocationObject.lng,
      });
      // } else {
      //   console.error("Proposal metadata upload failure");
      // }
    } catch (err) {
      console.error("contract call failure", { err });
    }
  };

  const {
    mutateAsync: addVotingIteration,
    isLoading: addVotingIterationIsLoading,
  } = useContractWrite(contractZengoDao, "addVotingIteration");

  const addVotingIterationCall = async (proposalId: string) => {
    try {
      const data = await addVotingIteration({ args: [proposalId] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const { mutateAsync: addEvidence, isLoading: addEvidenceIsLoading } =
    useContractWrite(contractZengoDao, "addEvidence");

  const addEvidenceCall = async ({
    proposalId,
    evidenceTimestamp,
    votingIteration,
    evidenceDescription,
    evidenceUri,
  }: IAddEvidenceCallProps) => {
    try {
      const data = await addEvidence({
        args: [
          proposalId,
          evidenceTimestamp,
          votingIteration,
          evidenceDescription,
          evidenceUri,
        ],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const {
    mutateAsync: concludeVotingIteration,
    isLoading: concludeVotingIterationIsLoading,
  } = useContractWrite(contractZengoDao, "concludeVotingIteration");

  const concludeVotingIterationCall = async (
    votingIterationId: string,
    proposalId: string
  ) => {
    try {
      const data = await concludeVotingIteration({
        args: [votingIterationId, proposalId],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const {
    mutateAsync: voteToClassifyProposal,
    isLoading: voteToClassifyProposalIsLoading,
  } = useContractWrite(contractZengoDao, "voteToClassifyProposal");

  const voteToClassifyProposalCall = async (
    vote: number,
    votingIteration: number,
    proposalId: number
  ) => {
    try {
      const data = await voteToClassifyProposal({
        args: [vote, votingIteration, proposalId],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const { data: getAllProposalsData, isLoading: getAllProposalsIsLoading } =
    useContractRead(contractZengoDao, "getAllProposals");

  // const { data: proposalEvidenceData, isLoading: proposalEvidenceIsLoading } =
  //   useContractRead(contractZengoDao, "proposalEvidence", [0, 1]);

  useMemo(() => {
    // console.log({ getAllProposalsData });

    if (getAllProposalsData && getAllProposalsData.length > 0) {
      const proposalsRaw = formatProposalsFromContract(getAllProposalsData[0]);

      const proposalsWithVotingIterations = formatProposalsWithVotingIterations(
        proposalsRaw,
        getAllProposalsData[1]
      );
      // console.log({ proposalsWithVotingIterations });

      // format proposalas with voting iterations's evidences
      const proposalsWithVotingIterationsAndEvidences =
        proposalsWithVotingIterations.map((proposal: any) => {
          const proposalEvidenceFormatted =
            formatRawArrayToCleanObjectNamedEntries(getAllProposalsData[2]);

          // TODO: here we need to identify the evidences of the proposal and
          // TODO: in other part the evidences of the voting iterations
          // TODO: avoiding contract calls

          return {
            ...proposal,
            evidences: proposalEvidenceFormatted,
          };
        });

      // console.log({ proposalsWithVotingIterationsAndEvidences });
      setProposalsToList(proposalsWithVotingIterationsAndEvidences);
    }
  }, [getAllProposalsData]);

  const state = {
    evidence,
    setEvidence,
    location,
    setLocation,
    proposalInfo,
    setProposalInfo,
    uploadEvidenceToIpfs,
    submitProposalForm,
    metadataUploadIsLoading,
    submitProposalFormIsLoading: submitProposalIsLoading,
    submitProposalSuccess,
    addVotingIterationCall,
    concludeVotingIterationCall,
    voteToClassifyProposalCall,
    addEvidenceCall,
    proposalsToList,
  };

  return (
    <ProposalsContext.Provider value={state}>
      {children}
    </ProposalsContext.Provider>
  );
}

ProposalsContext.displayName = "ProposalsContext";

export function useProposalsContextState() {
  const context = useContext(ProposalsContext);
  if (!context) {
    throw new Error(
      "useProposalsContextState must be used within the ProposalsContextProvider"
    );
  }
  return context;
}
