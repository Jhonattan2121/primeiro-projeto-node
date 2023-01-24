import IParseMailproviderDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateprovider from "../models/IMailTemplateProvider";


class FakeMailTemplateProvider implements IMailTemplateprovider {
  public async parse({
    template,
  }: IParseMailproviderDTO): Promise <string> {
    return template;
  }
}

export default FakeMailTemplateProvider;