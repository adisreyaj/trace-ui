export interface Schema {
  name: string;
  type: HandlerType;
  project: ProjectName;

  path: string;
}

export const enum ProjectName {
  App = 'app',
  Security = 'security',
}

export const enum HandlerType {
  Query = 'query',
  Mutation = 'mutation',
}
