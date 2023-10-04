import React /* , { useEffect, useState } */ from "react";
import Link from "next/link";
import ZengoLayout from "@/components/ZengoLayout";
import { useProposalsContextState } from "@/contexts/ProposalsContext";
// import { contractAddress_zengoDao } from "@/const/contracts";
// import {
//   MediaRenderer,
//   useContract,
//   useContractRead,
//   useStorage,
// } from "@thirdweb-dev/react";

export default function DaoProposalsPage() {
  const { proposalsToList } = useProposalsContextState();
  // const [proposalIpfsUrl, setProposalIpfsUrl] = useState("");
  // const [dataIpfsDownloaded, setDataIpfsDownloaded] = useState<any>(null); // [
  // const { contract } = useContract(
  // contractAddress_zengoDao
  // );
  // const { data, isLoading } = useContractRead(contract, "proposals", ["0"]);

  // const downloadFromIpfs = async () => {
  //   const file = await fetch(
  //     "https://312a375fe5a190a748d40e21aff95e99.ipfscdn.io/ipfs/bafybeihtgs3fwu25lgdwshp6ujnk2b2bmw6mdo6q53uo3tvecupzvg3ugy/"
  //   );
  //   const ipfsResponse = await file.json();
  //   console.log({ ipfsResponse });
  // };

  // useEffect(() => {
  //   if (data) {
  //     setProposalIpfsUrl(data.description);
  //     downloadFromIpfs();
  //   }
  // }, [data]);

  console.log({ proposalsToList });

  return (
    <ZengoLayout>
      <div className="h-full from-cit to-mod bg-gradient-to-t grid items-center  ">
        <div className="card0">
          <div className="propDashboard">
            <Link href="/proposals/new">
              <span className="newProp">+ Añadir propuesta</span>
            </Link>
            {/* example proposal */}
            <div className="propCard relative">
              <div className="bg-white rounded-gen grid grid-cols-6 relative">
                <div className="col-span-4 p-3">
                  <div className="italic">Propuesta demo</div>
                  <div className="font-bold text-2xl">
                    Limpiar el parque Santa Mónica
                  </div>
                  <div className="italic">
                    {" "}
                    <span className="not-italic text-2xl">👷</span>Solicitud de
                    mantenimiento
                  </div>
                  <div className="">hecha el 02/06/2023</div>
                  <div className="">Queretaro, Mexico</div>
                </div>
                <div
                  className="
                                col-span-2                                 
                                border-gray-500/50 
                                rounded-gen grid grid-rows-3"
                >
                  <div
                    className="
                                    grid 
                                    items-center text-center 
                                    font-bold text-xl 
                                    rounded-tr-gen rounded-bl-gen 
                                    bg-cit"
                  >
                    Verificación
                  </div>
                  <div className="text-center grid grid-cols-3 items-center gap-3 mx-auto p-3 w-full divide-x divide-gray-300">
                    <div className="mx-auto">
                      <div className="completed"></div>
                    </div>
                    {/* This will change depending on the proposal stage (pending, currentCit, currentMod, completed) */}
                    <div className="mx-auto flex gap-1 h-full items-center pl-3">
                      <div className="completed"></div>
                      <div className="currentMod"></div>
                      <div className="pending"></div>
                    </div>
                    <div className="mx-auto h-full grid items-center pl-3">
                      <div className="pending"></div>
                    </div>
                  </div>
                  <Link href="/proposal-id-2">
                    <span
                      className="
                                        bg-gray-300 hover:bg-gray-500 
                                        hover:text-white 
                                        cursor-pointer 
                                        grid items-center 
                                        text-xl text-center 
                                        rounded-tl-gen
                                        rounded-br-gen"
                    >
                      Detalles
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            {/* asd  */}
            {proposalsToList.length
              ? proposalsToList.map((proposal: any, idx: number) => (
                  <div className="propCard relative" key={idx}>
                    <div className="bg-white rounded-gen grid grid-cols-6 relative">
                      <div className="col-span-4 p-3">
                        <div className="italic">{`Propuesta #${
                          proposal.proposalId + 1
                        }`}</div>
                        <div className="font-bold text-2xl">
                          {`${proposal.title}`}
                        </div>
                        <div className="italic">
                          {" "}
                          <span className="not-italic text-2xl">👷</span>
                          {`${proposal.proposalType}`}
                        </div>
                        <div className="">hecha el 02/06/2023</div>
                        <div className="">{`${proposal.streetAddress}`}</div>
                      </div>
                      <div
                        className="
                                col-span-2                                 
                                border-gray-500/50 
                                rounded-gen grid grid-rows-3"
                      >
                        <div
                          className="
                                    grid 
                                    items-center text-center 
                                    font-bold text-xl 
                                    rounded-tr-gen rounded-bl-gen 
                                    bg-cit"
                        >
                          Verificación
                        </div>
                        <div className="text-center grid grid-cols-3 items-center gap-3 mx-auto p-3 w-full divide-x divide-gray-300">
                          <div className="mx-auto">
                            <div className="completed"></div>
                          </div>
                          {/* This will change depending on the proposal stage (pending, currentCit, currentMod, completed) */}
                          <div className="mx-auto flex gap-1 h-full items-center pl-3">
                            <div className="completed"></div>
                            <div className="currentMod"></div>
                            <div className="pending"></div>
                          </div>
                          <div className="mx-auto h-full grid items-center pl-3">
                            <div className="pending"></div>
                          </div>
                        </div>
                        <Link href="/proposal-id-2">
                          <span
                            className="
                                        bg-gray-300 hover:bg-gray-500 
                                        hover:text-white 
                                        cursor-pointer 
                                        grid items-center 
                                        text-xl text-center 
                                        rounded-tl-gen
                                        rounded-br-gen"
                          >
                            Detalles
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              : null}
            {/* asd */}
            <div className="propCard relative">
              <div className="bg-white rounded-gen grid grid-cols-6 relative">
                <div className="col-span-4 p-3">
                  <div className="italic">Propuesta #1</div>
                  <div className="font-bold text-2xl">
                    Limpiar el parque Santa Mónica
                  </div>
                  <div className="italic">
                    {" "}
                    <span className="not-italic text-2xl">👷</span>Solicitud de
                    mantenimiento
                  </div>
                  <div className="">hecha el 02/06/2023</div>
                  <div className="">Queretaro, Mexico</div>
                </div>
                <div
                  className="
                                col-span-2                                 
                                border-gray-500/50 
                                rounded-gen grid grid-rows-3"
                >
                  <div
                    className="
                                    grid 
                                    items-center text-center 
                                    font-bold text-xl 
                                    rounded-tr-gen rounded-bl-gen 
                                    bg-cit"
                  >
                    Verificación
                  </div>
                  <div className="text-center grid grid-cols-3 items-center gap-3 mx-auto p-3 w-full divide-x divide-gray-300">
                    <div className="mx-auto">
                      <div className="completed"></div>
                    </div>
                    {/* This will change depending on the proposal stage (pending, currentCit, currentMod, completed) */}
                    <div className="mx-auto flex gap-1 h-full items-center pl-3">
                      <div className="completed"></div>
                      <div className="currentMod"></div>
                      <div className="pending"></div>
                    </div>
                    <div className="mx-auto h-full grid items-center pl-3">
                      <div className="pending"></div>
                    </div>
                  </div>
                  <Link href="/proposal-id-2">
                    <span
                      className="
                                        bg-gray-300 hover:bg-gray-500 
                                        hover:text-white 
                                        cursor-pointer 
                                        grid items-center 
                                        text-xl text-center 
                                        rounded-tl-gen
                                        rounded-br-gen"
                    >
                      Detalles
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="sortProposals">
            <div className="propBT">Ver todas</div>
            <div className="propBT px-1">Mis propuestas</div>
            <div className="propBT">Por tipo</div>
          </div>
        </div>
      </div>
    </ZengoLayout>
  );
}
