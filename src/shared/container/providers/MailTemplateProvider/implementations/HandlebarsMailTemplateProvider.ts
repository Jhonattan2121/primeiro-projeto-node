import Handlebars from "handlebars";
import fs from 'fs';
import IParseMailproviderDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateprovider from "../models/IMailTemplateProvider";


class HandlebarsTemplateProvider implements IMailTemplateprovider {
  public async parse({
    file, 
    variables
  }: IParseMailproviderDTO): Promise <string> {
  const templateFileContent = await fs.promises.readFile(file , {
    encoding: 'utf-8',
  })

  const parseTemplate = Handlebars.compile(templateFileContent)

   return parseTemplate(variables);
  }
}

export default HandlebarsTemplateProvider;