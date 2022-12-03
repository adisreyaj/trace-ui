import { normalize, workspaces } from '@angular-devkit/core';
import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  strings,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { ProjectName, Schema } from './schema';
import { createDescriptionFromName, symbolify } from './utils/helper.util';
import { createHost } from './utils/host.util';
import { getPath } from './utils/path.util';

const projectToAppMap = new Map<ProjectName, string>([
  [ProjectName.App, 'traceable-ui'],
  [ProjectName.Security, 'security'],
]);

export default function (options: Schema): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    const host = createHost(tree);
    const { workspace } = await workspaces.readWorkspace('/', host);
    const projectName = projectToAppMap.get(options.project);
    if (!projectName) {
      throw new SchematicsException(`Invalid project name: ${options.project}`);
    }
    const project = workspace.projects.get(projectName);
    if (!project) {
      throw new SchematicsException(`Invalid project name: ${options.project}`);
    }
    const handlerLocation = getPath(options.project, project.sourceRoot, options.path);

    const templateSource = apply(url(`./files/${options.type}`), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: options.name,
        symbolify: symbolify,
        description: createDescriptionFromName,
      }),
      move(normalize(handlerLocation)),
    ]);
    return chain([mergeWith(templateSource)]);
  };
}
