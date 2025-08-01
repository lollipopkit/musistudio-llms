import { LLMProvider, UnifiedChatRequest } from "./llm";

export interface TransformerOptions {
  [key: string]: any;
}

interface TransformerWithStaticName {
  new (options?: TransformerOptions): Transformer;
  TransformerName?: string;
}


interface TransformerWithInstanceName {
  new (): Transformer;
  name?: never;
}

export type TransformerConstructor = TransformerWithStaticName;

export type Transformer = {
  transformRequestIn?: (
    request: UnifiedChatRequest,
    provider: LLMProvider
  ) => Promise<Record<string, any>>;
  transformResponseIn?: (response: Response) => Promise<Response>;

  // 将请求格式转换为通用的格式
  transformRequestOut?: (request: any) => Promise<UnifiedChatRequest>;
  // 将相应格式转换为通用的格式
  transformResponseOut?: (response: Response) => Promise<Response>;

  endPoint?: string;
  name?: string;
};
