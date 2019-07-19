import { declare } from "@babel/helper-plugin-utils";
import transformTypeScript from "@babel/plugin-transform-typescript";

export default declare(
  (api, { jsxPragma, allExtensions = false, isTSX = false, allowNamespaces = false }) => {
    api.assertVersion(7);

    if (typeof allExtensions !== "boolean") {
      throw new Error(".allExtensions must be a boolean, or undefined");
    }
    if (typeof isTSX !== "boolean") {
      throw new Error(".isTSX must be a boolean, or undefined");
    }
    if (typeof allowNamespaces !== "boolean") {
      throw new Error(".allowNamespaces must be a boolean, or undefined");
    }

    if (isTSX && !allExtensions) {
      throw new Error("isTSX:true requires allExtensions:true");
    }

    return {
      overrides: allExtensions
        ? [
            {
              plugins: [[transformTypeScript, { jsxPragma, isTSX, allowNamespaces }]],
            },
          ]
        : [
            {
              // Only set 'test' if explicitly requested, since it requires that
              // Babel is being called`
              test: /\.ts$/,
              plugins: [[transformTypeScript, { jsxPragma, allowNamespaces }]],
            },
            {
              // Only set 'test' if explicitly requested, since it requires that
              // Babel is being called`
              test: /\.tsx$/,
              plugins: [[transformTypeScript, { jsxPragma, isTSX: true, allowNamespaces }]],
            },
          ],
    };
  },
);
