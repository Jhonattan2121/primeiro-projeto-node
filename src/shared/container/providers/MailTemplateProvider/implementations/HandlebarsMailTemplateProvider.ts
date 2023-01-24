import Handlebars from "handlebars";

import IParseMailproviderDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateprovider from "../models/IMailTemplateProvider";


class HandlebarsTemplateProvider implements IMailTemplateprovider {
  public async parse({
    template, 
    variables
  }: IParseMailproviderDTO): Promise <string> {
   const parseTemplate = Handlebars.compile(template);

   return parseTemplate(variables);
  }
}

export default HandlebarsTemplateProvider;