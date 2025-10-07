## Commit guidelines
We follow the conventional commit guidelines as specified by [Angular](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit).
For `scope` you have to use a scope that is relevant to the project and changes you've done. For example: 
- Changed something in the `Brand` type? Use `Brand` as the scope.
- Changed something in the `BrandApi` resource? Use `BrandApi` as the scope.
- etc.


Commits **must** follow these guidelines in order for `semantic-release` to create proper automated releases. 
Furthermore, this format allows for easier to read commit history. Commits will be evaluated against the 
[default release rules](https://github.com/semantic-release/commit-analyzer/blob/master/lib/default-release-rules.js) 
of `semantic-release`. This means that:
- `feat:` would be associated with a `minor` release;
- `fix:` would be associated with a `patch` release;
- If `BREAKING CHANGE` is included in the commit message, a `major` release will be triggered;
- etc.

If your commit closes/fixes any issues, please mention them in the footer of your commit message.

## Publishing a release
Publishing releases is done automatically by `semantic-release`. This means that the `"version"` inside the `package.json` 
file should **never** be updated manually as the version management is done by `semantic-release`.

A release publish is triggered by a push to the `production` branch. Merging a PR will immediately trigger this behavior. 
This means that if there are many changes being made at once, the changes must be bundled (read 'merged') into the `main` branch first.