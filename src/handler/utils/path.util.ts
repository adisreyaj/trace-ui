import { ProjectName } from '../schema';

export const getPath = (project: ProjectName, sourceRoot: string = '', path: string) => {
  switch (project) {
    case ProjectName.App:
      return `${sourceRoot}/app/${path}`;
    case ProjectName.Security:
      return `${sourceRoot}/${path}`;
  }
};
