import Map from "@/components/Map";
import Link from "next/link";
import ZengoLayout from "@/components/ZengoLayout";
import { useProposalsContextState } from "@/contexts/ProposalsContext";
import {
  MediaRenderer,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { contractAddress_zengoDao } from "@/const/contracts";
import { toEther } from "@thirdweb-dev/sdk";

export default function ProposalDetailDemoPage() {
  const { proposalsToList } = useProposalsContextState();

  const proposal = proposalsToList[1];

  const { contract: contractZengoDao /*, isLoading, error */ } = useContract(
    contractAddress_zengoDao
  );

  const { data: proposalEvidenceData, isLoading: proposalEvidenceIsLoading } =
    useContractRead(contractZengoDao, "proposalEvidence", [0, 1]);

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
                    <span className="font-bold"> 02/06/2023 </span>
                  ) : null}
                  por
                </span>
                <span className="font-bold text-sm"> 0x04...5cC9</span>
              </div>
            </div>
            <div className="text-left font-bau pt-16 px-5">
              <div className="text-2xl font-bold justify">
                Limpiar el parque Santa Mónica
              </div>
              <div className="italic">
                {" "}
                <span className="not-italic text-xl">👷</span>Solicitud de
                mantenimiento
              </div>
              <div className="text-justify pt-3 font-exo text-lg">
                Se solicita limpieza en el parque Santa Mónica, se añaden fotos
                del estado actual
              </div>
            </div>

            <div className="grid grid-cols-2 max-h-32 gap-3 mx-5 items-center bg-black/50 rounded-med place-content-center">
              <div className=" rounded-med h-full text-white ">
                <div className="text-left font-bau p-3">
                  <div className="text-justify  text-sm pt-3 font-exo font-bold">
                    Evidencia del{" "}
                    {proposalEvidenceData?.length &&
                    proposalEvidenceData[0].evidenceTimestamp
                      ? `${new Date(
                          toEther(proposalEvidenceData.evidenceTimestamp)
                        ).toISOString()}`
                      : "01/01/2000"}
                  </div>

                  <div className="text-justify text-sm pt-3 font-exo">
                    Foto del parque
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
              <Map />
              <div
                className="
                            absolute bottom-0 left-1/2 -translate-x-1/2 w-full 
                            text-center italic text-bgd
                            bg-cit backdrop-blur-md font-bold
                            p-1 rounded-b-med text-sm"
              >
                {proposal?.streetAddress
                  ? `${proposal.streetAddress}`
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
}
