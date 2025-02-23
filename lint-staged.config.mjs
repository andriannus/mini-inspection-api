/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
  '*.{mjs,ts}': (filenames) => {
    const onOneLine = filenames.join(' ');
    return `yarn lint ${onOneLine}`;
  },
};

export default config;
