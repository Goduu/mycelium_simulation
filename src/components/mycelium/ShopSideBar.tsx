"use client"
import React from 'react'
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand, TbMoneybag } from '../Icons';
import { Spore, SporeNode } from './Spore';

export const ShopSideBar = () => {
    const [isSidebarVisible, setIsSidebarVisible] = React.useState(true);

    const toggleSidebarVisibility = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className={`flex fixed left-1 h-screen transition-all ease-in-out ${isSidebarVisible ? 'w-64' : 'w-0'}`}>
            {isSidebarVisible && (
                <div className="w-64 bg-gray-700 shadow">
                    <h2 className="flex gap-4 text-xl font-bold p-4">
                        <TbMoneybag className='w-10' />
                        Shop
                    </h2>
                    <ul className="p-4">
                        <li className="mb-2 flex gap-2 items-center">
                            <Spore energy={20} />
                            Small Spore

                        </li>
                        <li className="mb-2 flex gap-2 items-center">
                            <Spore energy={70} />
                            Mid Spore


                        </li>
                        <li className="mb-2 flex gap-2 items-center">
                            <Spore energy={80} />
                            Big Spore

                        </li>
                        <li className="mb-2 flex gap-2 items-center">
                            <Spore energy={120} />
                            Great Spore

                        </li>
                    </ul>
                </div>
            )}
            <button className="ml-2" onClick={toggleSidebarVisibility}>
                {isSidebarVisible ?
                    <TbLayoutSidebarLeftCollapse className='w-10 over:scale-110 duration-150' /> :
                    <TbLayoutSidebarLeftExpand className='w-10 hover:scale-110 duration-150' />}
            </button>
        </div>
    );
}
