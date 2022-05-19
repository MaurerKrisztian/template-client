import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {Utils} from './utils';
import {ITemplateOptions} from "./ITemplate-options";
import * as Mail from "nodemailer/lib/mailer";

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

    getTemplateHtml(templateName: string, data: any): Promise<string>{
        return this.client.post(`/template/${templateName}?type=html_string`, data);
    }

    getTemplatePdfBuffer(templateName: string, data: any): Promise<ArrayBuffer> {
        return this.client.post(`/template/${templateName}?type=pdf_buffer`, data, {
            responseType: 'arraybuffer'
        });
    }

    getTemplatePdfStream(templateName: string, data: any): Promise<ArrayBuffer> {
        return this.client.post(`/template/${templateName}?type=pdf_stream`, data, {
            responseType: 'stream'
        });
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


    /**
     * Send mail with template
    * */
    sendMailWithTemplate(body: IEmailBody) {
        return this.client.post(`/mail`, body);
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


export interface IEmailBody {
    mailOptions: Omit<Mail.Options, 'html'>;
    template: { name: string; data: any };
}
