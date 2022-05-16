import { DynamicModule, Global, Module, Type } from '@nestjs/common';
import { TemplateClient } from './template.client';
import {OptionsFactory} from './options-factorty.interface';
import {ITemplateOptions} from "./ITemplate-options";

@Global()
@Module({})
export class TemplateModule {
    static forRoot(options: ITemplateOptions): DynamicModule {
        return {
            module: TemplateModule,
            providers: [
                TemplateClient,
                {
                    provide: 'CLIENT_OPTIONS',
                    useValue: options,
                },
            ],
            exports: [TemplateClient],
            controllers: [],
        };
    }
    static forRootAsync(classForOptions: Type<OptionsFactory<ITemplateOptions>>): DynamicModule {
        return {
            module: TemplateModule,
            providers: [
                TemplateClient,
                {
                    provide: 'CLIENT_OPTIONS',
                    useFactory: async (optionsFactory: OptionsFactory<ITemplateOptions>) =>
                        await optionsFactory.createOptions(),
                    inject: [classForOptions as Type<OptionsFactory<ITemplateOptions>>],
                },
                {
                    provide: classForOptions,
                    useClass: classForOptions,
                },
            ],
            exports: [TemplateClient],
            controllers: [],
        };
    }
}
