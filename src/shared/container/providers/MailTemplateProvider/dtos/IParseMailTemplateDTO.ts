interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailproviderDTO {
  template: string;
  variables: ITemplateVariables;
}
 