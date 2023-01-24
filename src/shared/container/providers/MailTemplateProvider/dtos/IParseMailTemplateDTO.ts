interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailproviderDTO {
  file: string;
  variables: ITemplateVariables;
}
 