/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EvolutionaryInput } from '../models/EvolutionaryInput';
import type { Item } from '../models/Item';
import type { ResponseMessage } from '../models/ResponseMessage';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Create Item
     * @returns ResponseMessage Successful Response
     * @throws ApiError
     */
    public static createItemApiPostItemsPost({
        requestBody,
    }: {
        requestBody: Item,
    }): CancelablePromise<ResponseMessage> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post_items',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Items
     * @returns Item Successful Response
     * @throws ApiError
     */
    public static getItemsApiItemsGet(): CancelablePromise<Array<Item>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/items',
        });
    }
    /**
     * Hello World
     * @returns any Successful Response
     * @throws ApiError
     */
    public static helloWorldApiPythonGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/python',
        });
    }
    /**
     * Start Task
     * @returns Item Successful Response
     * @throws ApiError
     */
    public static startTaskApiStartTaskPost({
        requestBody,
    }: {
        requestBody: EvolutionaryInput,
    }): CancelablePromise<Array<Array<Item>>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/start_task',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
