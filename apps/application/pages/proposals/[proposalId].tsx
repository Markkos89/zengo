import ZengoLayout from "@/components/ZengoLayout";
import {
  MediaRenderer,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { contractAddress_zengoDao } from "@/const/contracts";
import { toEther } from "@thirdweb-dev/sdk";
import { useProposalsContextState } from "@/contexts/ProposalsContext";
import Map from "@/components/Map";
import Link from "next/link";
import { useMemo } from "react";
import {
  formatNumberContractType,
  formatRawArrayToCleanObjectNamedEntries,
} from "@/lib/utils";
import { useRouter } from "next/router";

const ProposalDetailsPage = () => {
  const { proposalsToList } = useProposalsContextState();

  const router = useRouter();

  const { contract: contractZengoDao /*, isLoading, error */ } = useContract(
    contractAddress_zengoDao
  );

  const {
    data: proposalsData,
    isLoading: proposalsIsLoading,
    // refetch: refetchgetProposal,
  } = useContractRead(contractZengoDao, "proposals", [
    0,
    router.query.proposalId,
  ]);

  const { data: proposalEvidenceData, isLoading: proposalEvidenceIsLoading } =
    useContractRead(contractZengoDao, "proposalEvidence", [
      0,
      router.query.proposalId,
    ]);

  const proposalToShow = useMemo(() => {
    if (!proposalsIsLoading && proposalsData) {
      const formattedObj =
        formatRawArrayToCleanObjectNamedEntries(proposalsData);

      const proposalWithConvertedValues = {
        ...formattedObj,
        proposalId: Number(formattedObj.proposalId.toString()),
        latitude: formatNumberContractType(
          Number(toEther(formattedObj.latitude))
        ),
        longitude: formatNumberContractType(
          Number(toEther(formattedObj.longitude))
        ),
      };

      return proposalWithConvertedValues;
    }
  }, [proposalsData]);

  const proposalEvidenceToShow = useMemo(() => {
    if (!proposalEvidenceIsLoading && proposalEvidenceData) {
      const formattedObj =
        formatRawArrayToCleanObjectNamedEntries(proposalEvidenceData);
      const evidenceTimestampFormatted = Number(
        formattedObj.evidenceTimestamp.toString()
      );
      const evidenceDate = new Date(evidenceTimestampFormatted).toISOString();

      const proposalWithConvertedValues = {
        ...formattedObj,
        evidenceTimestampFormatted: evidenceTimestampFormatted,
        evidenceDate,
      };

      return proposalWithConvertedValues;
    }
  }, [proposalEvidenceData]);

  console.log({ proposalEvidenceToShow, proposalEvidenceData });

  return (
    <ZengoLayout>
      <div className="h-full xl:h-full grid items-center text-center mx-auto xl:pt-0">
        <div className="detailCard">
          <div className="bg-white/50 rounded-med h-full grid grid-rows-3 items-center gap-5 relative row-span-6">
            <div className="font-exo text-lg absolute top-0 flex justify-between w-full p-3 bg-cit rounded-med text-bgd">
              <div className="italic font-bold"> Propuesta #1</div>
              <div>
                <span className="text-sm -mb-2">
                  Hecha el
                  {!proposalEvidenceIsLoading ? (
                    <span className="font-bold"> 01/01/2000 </span>
                  ) : null}
                  por
                </span>
                <span className="font-bold text-sm">
                  {" "}
                  {proposalToShow
                    ? `${proposalToShow.proposer.slice(
                        0,
                        4
                      )}...${proposalToShow.proposer.slice(38, 42)}`
                    : "0x04...d3M0"}
                </span>
              </div>
            </div>
            <div className="text-left font-bau pt-16 px-5">
              <div className="text-2xl font-bold justify">
                {proposalToShow ? `${proposalToShow.title}` : "Titulo demo"}
              </div>
              <div className="italic">
                {proposalToShow ? (
                  `${proposalToShow.proposalType}`
                ) : (
                  <>
                    <span className="not-italic text-xl">👷</span>Solicitud de
                    demo
                  </>
                )}
              </div>
              <div className="text-justify pt-3 font-exo text-lg">
                {proposalToShow
                  ? `${proposalToShow.proposalDescription}`
                  : null}
              </div>
            </div>

            <div className="grid grid-cols-2 max-h-32 gap-3 mx-5 items-center bg-black/50 rounded-med place-content-center">
              <div className=" rounded-med h-full text-white ">
                <div className="text-left font-bau p-3">
                  <div className="text-justify  text-sm pt-3 font-exo font-bold">
                    Evidencia del{" "}
                    {proposalEvidenceToShow &&
                    proposalEvidenceToShow.evidenceDate
                      ? `${proposalEvidenceToShow.evidenceDate.slice(0, 10)}`
                      : "01/01/2000"}
                  </div>

                  <div className="text-justify text-sm pt-3 font-exo">
                    {proposalEvidenceToShow?.evidenceDescription}
                  </div>
                </div>
              </div>
              <div className="grid h-full max-h-full relative bg-gray-300/60 rounded-med  items-center self-center text-sm">
                {proposalEvidenceData?.length &&
                proposalEvidenceData.evidenceUri ? (
                  <MediaRenderer
                    src={proposalEvidenceData.evidenceUri}
                    // width={250}
                    // height={250}
                    alt="Proposal evidence"
                    className="rounded-2xl cursor-pointer h-24 w-auto items-center"
                  />
                ) : (
                  `No file`
                )}
              </div>
            </div>

            <div id="map-parent" className="grid h-full relative">
              {proposalToShow &&
              proposalToShow.latitude &&
              proposalToShow.longitude ? (
                <Map
                // lat={proposalToShow.latitude}
                // lng={proposalToShow.longitude}
                />
              ) : null}
              <div
                className="
                            absolute bottom-0 left-1/2 -translate-x-1/2 w-full 
                            text-center italic text-bgd
                            bg-cit backdrop-blur-md font-bold
                            p-1 rounded-b-med text-sm"
              >
                {proposalToShow?.streetAddress
                  ? `${proposalToShow.streetAddress}`
                  : "Queretaro, Mexico"}
              </div>
            </div>
          </div>

          <div className=" bg-white/50 rounded-dd row-span-6">
            <div className=" grid grid-rows-2  p-3 gap-3 h-full">
              <div className="blockedEvidence ">
                Los moderadores revisarán tu propuesta
              </div>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-3 row-span-6 ">
            <div className="stateCard row-span-2 ">
              <div className="mx-auto grid items-center gap-1 ">
                <div className=" text-white text-3xl">
                  Estado de la propuesta
                </div>
                <div className="md:text-5xl text-3xl grid items-center pt-5 text-white font-exo">
                  Por verificar
                </div>
                <div className="grid grid-cols-3 gap-2 px-3 pb-3 items-center">
                  <Link href="/proposal-id-3" className="cardBT	">
                    {/* <div className="cardBT	"> */}{" "}
                    <span className="text-2xl">🔍 </span>Verificación municipal
                    {/* </div> */}
                  </Link>
                  <div className="cardBT	">
                    {" "}
                    <span className="text-2xl">🗳️ </span>Lista para fondeo
                  </div>
                  <div className="cardBT">
                    {" "}
                    <span className="text-2xl">❌ </span>Rechazar propuesta
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ZengoLayout>
  );
};

export default ProposalDetailsPage;
