import IMailTemplateprovider from "../models/IMailTemplateProvider";


class FakeMailTemplateProvider implements IMailTemplateprovider {
  public async parse():  Promise <string> {
    return "Mail Provider";
  }
}

export default FakeMailTemplateProvider;