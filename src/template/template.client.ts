import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {Utils} from './utils';
import {ITemplateOptions} from "./ITemplate-options";

@Injectable()
export class TemplateClient {
    client: AxiosInstance;
    constructor(@Inject('CLIENT_OPTIONS') private readonly options: ITemplateOptions) {
        this.options.baseUrl = Utils.removeSlashes(this.options.baseUrl);
        this.client = axios.create({ baseURL: options.baseUrl });
        this.client.interceptors.response.use((res) => {
            return res.data;
        });
    }

    getVersion(): Promise<{version: string}> {
        return this.client.get(`/`);
    }

    getTemplateWithData(templateName: string, data: any): Promise<string>{
        return this.client.post(`/template/${templateName}`, data);
    }

    getAllTemplateInformation(): Promise<IAllTemplateInfo> {
        return this.client.get(`/template/`);
    }

    getTemplateExample(templateName: string): Promise<string> {
        return this.client.get(`/template/${templateName}/example`);
    }

    getTemplateExampleData(templateName: string): Promise<any>{
        return this.client.get(`/template/${templateName}/exampleData`);
    }

    getRawTemplate(templateName: string): Promise<string>{
        return this.client.get(`/template/${templateName}/raw`);
    }

}


export type IAllTemplateInfo = ITemplateInfo[]

export interface ITemplateInfo {
    name: string,
    link: string,
    playground: string,
    exampleData: any,
    templateWithExampleData: string,
    exampleDataLink: string,
    rawHtml: string,
    note: string
}
