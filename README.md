# template-client

Nestjs Api client for https://github.com/MaurerKrisztian/tempalte-api-tm

```typescript

    getTemplateHtml(templateName: string, data: any): Promise<string>
    getTemplatePdfBuffer(templateName: string, data: any): Promise<ArrayBuffer> 
    getTemplatePdfStream(templateName: string, data: any): Promise<ArrayBuffer> 
    
```
