"use client"
import React from 'react'
import { DefaultService } from '../client'

export const GetAllItemsButton = () => {
    const handleGetAllItems = async () => {
        // DefaultService.createItemApiItemsPost({ requestBody: { name: "Test", price: 1.0, weight: 2.0 } }).then(data => {
        //     console.log(data);
        // })
        DefaultService.getItemsApiItemsGet().then(data => {
            console.log(data);
        });
    }


    return (
        <button onClick={handleGetAllItems}>

            <h2 className={`mb-3 text-2xl font-semibold`}>
                Get All items{" "}
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Find in-depth information about Next.js features and API.
            </p>
        </button>
    )
}
