# Gun Violence Data Explorer

A personal, experimental project that uses a visual web-based interface to explore various datasets
about gun violence in the United States/

## Technologies Used

- React 16 with hooks
  - CSS in JS
- Typescript (throughout)
- Backend Server: Node.js
- HTTP Server: Express
- GraphQL Server: Apollo Server
- GraphQL Client & Frontend Cache: Apollo Client (GraphQL API)
- Packaging frontend: Webpack, Babel
- Database: Postgres
- Deployment: Docker, Kubernetes, and CircleCI
- Testing & Linting: Jest, Enzyme, EsLint
- Lerna - monorepo management
- Storybook

## Lerna

This was helpful in figuring out how to use lerna with a typescript/react project with storybook, because the official documentation is super brief.

- [Typescript monorepo for React project (by stereobooster)](https://github.com/stereobooster/typescript-monorepo)
- [Learn-A](https://github.com/RyanCavanaugh/learn-a)

Lerna takeaways:

1. Lerna mainly takees care of "wiring" / "dependencies" between YOUR packages. Not so much on node_modules, except it will TRY to have them share ".bin" binaries for node_modules that are dev-dependencies (not plain dependencies, because lerna itself is a dev dependency)

Setup:

```bash
npm i -g lerna
mkdir my-mono-repo && cd my-mono-repo
lerna init
# This creates a top-level package.json, lerna.json, and packages subdirectory
```

- Add scripts to the root package.json: start, test, lint. Then install jest, eslint, as devDependencies of this root package,json
  Add some npm packages to the root package.json that are used to run the scripts.

1. At the very beginning, put all your "packages" / "independent apps" that would normally have been in their own respository in a folder `/packages/` (although I use `/apps/` AND `/packages`).

   1. These already-existing sub-packages probably already have their package.json and node_modules installed. That's okay. Just move them into this directory.

2. At the top level/root directory, TBP

### Package setup

Each sub-package should have its own dependencies completely listed out, even though a bug might mean the package will run without them all listed if another package is using one.

so, you could still do `npm install -D <npmPackage>` for your subpackages, and then follow it with a `lerna bootstrap --hoist` from the root directory.

OR... you could alternatively
`lerna add <npmPackage` to add it to all the subproject's node modules.
or `lerna add <npmpackage> --dev`, or `lerna add <npmPkg> --dev --scope=module1`

### Package naming

Seems like it's best to use 'scoped' nams for each package: ie. `"name": "@resilience-app/frontend"`

You then add these between-my-package dependencies in the package's package.json 'dependencies' section.

### Key commands

- `lerna add <npmPkg> (--dev) (--scope=my-subpacakage)`
- `lerna bootstrap --hoist` (if you make changes to the package.json of subpackages) and maybe used npm install instead of lerna add. USE THIS instead of `npm install`. This will resolve the dependencies between your own packages and also try to share some of the commonly used node_modules.
- `lerna import <pathToOtherRepoOnLocal>`- It will import a separate repo as a subpackage into this monorepo, preserving the git history.
- `npm init` - yep, still gotta create new packages for the monorepo using npm init.
- `lerna run XXX` - do an 'npm run XXX' on each of the subpackages.
- `lerna link` - `lerna bootstrap` includes this. It resolves the dependencies between our lerna subpackages via symbolic links.
- `lerna clean` - blows away node_modules for all packages.
- `lerna publish` - 'publishes' a new version of all subpackages that were updated since the last release to npm direcgtory.

## Typescript setup

There is a tsconfig.json at the root level with settings that should apply to all packages. Each package should also have its own tsconfig.tson that extends the root tsconfig.json and selectively overrides some of its values as needed.

Note that the top-level tsconfig.json needs to have these compiler-flags set to true: 'composite', 'declaration', 'declarationMap', 'sourceMap'. It also needs a 'references' section that lists the paths to the sub-packages.

Note that using the above compiler-flags means we can't have tsc (typescript compiler) parse or check javascript files. (TODO: find workaround if it becomes necessary)

### Lerna: Setting up ESLint, Prettier, VSCode

From top-level
`lerna run lint`
