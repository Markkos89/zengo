import React from 'react';
import Link from "next/link"

export default function daoProposals () {
    
    return(
        <div className='h-screen from-cit to-mod bg-gradient-to-t grid items-center '>
            <div className="card0">
                <div className="propDashboard">
                    <div className="propCard relative">
                        <div className="bg-white rounded-gen grid grid-cols-6 relative">
                            <div className="col-span-4 p-3">
                                <div className="italic">Proposal #2</div>
                                <div className="font-bold text-2xl">Clean the park</div>
                                <div className="italic"> <span className="not-italic text-2xl">👷</span>Request work or maintenance</div>
                                <div className="">made on 02/06/2023</div>
                                <div className="">Queretaro, Mexico</div>
                            </div>
                            <div className="
                                col-span-2                                 
                                border-gray-500/50 
                                rounded-gen grid grid-rows-3"
                            >
                                <div className="
                                    grid 
                                    items-center text-center 
                                    font-bold text-xl 
                                    rounded-tr-gen rounded-bl-gen 
                                    bg-cit"
                                >
                                    On review
                                </div>
                                <div className="text-center grid grid-cols-3 items-center gap-3 mx-auto p-3 w-full divide-x divide-gray-300">
                                    <div className="mx-auto">
                                        <div className="completed"></div>     
                                    </div>
                                    {/* This will change depending on the proposal stage (pending, currentCit, currentMod, completed) */}
                                    <div className="mx-auto flex gap-1 h-full items-center pl-3">
                                        <div className="completed"></div>     
                                        <div className="currentCit"></div>
                                        <div className="pending"></div>
                                    </div>
                                    <div className="mx-auto h-full grid items-center pl-3">
                                        <div className="pending"></div>     
                                    </div>  
                                </div>
                                <Link href='/proposal-id-2'>
                                    <div className="
                                        bg-gray-300 hover:bg-gray-500 
                                        hover:text-white 
                                        cursor-pointer 
                                        grid items-center 
                                        text-xl text-center 
                                        rounded-tl-gen
                                        rounded-br-gen"
                                    > 
                                        Details
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Link href='/newProposal'>
                        <div className="newProp">+ Add a new proposal</div>
                    </Link>
                </div>
                <div className='sortProposals'>
                    <div className='propBT'>Ver todas</div>
                    <div className='propBT'>Mis propuestas</div>
                    <div className='propBT'>Por tipo</div>
                </div>
            </div>

        </div>
    )
}