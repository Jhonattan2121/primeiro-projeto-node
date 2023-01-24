import IParseMailproviderDTO from "../dtos/IParseMailTemplateDTO"

export default interface IMailTemplateprovider {
  parse(data: IParseMailproviderDTO): Promise<string>;
}

