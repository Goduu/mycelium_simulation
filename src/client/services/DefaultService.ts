/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EvolutionaryInput } from '../models/EvolutionaryInput';
import type { Item } from '../models/Item';
import type { NewPhaseInput } from '../models/NewPhaseInput';
import type { RunPhaseInput } from '../models/RunPhaseInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
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
    /**
     * Get Graph
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getGraphGraphGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/graph',
        });
    }
    /**
     * Start Phase
     * @returns any Successful Response
     * @throws ApiError
     */
    public static startPhaseApiStartPhasePost({
        requestBody,
    }: {
        requestBody: NewPhaseInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/start_phase',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Run Phase
     * @returns any Successful Response
     * @throws ApiError
     */
    public static runPhaseApiRunPhasePost({
        requestBody,
    }: {
        requestBody: RunPhaseInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/run_phase',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
