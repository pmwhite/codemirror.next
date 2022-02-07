import resolve from '@rollup/plugin-node-resolve';
import virtual from '@rollup/plugin-virtual';
import commonjs from '@rollup/plugin-commonjs';

function multipleModules() {
  const exporter = ([name, path]) => `export * as ${name} from ${JSON.stringify(path)}`;
  let virtualisedEntry;
  let include;
  return {
    name: 'multiple-modules',
    options(options) {
      include = options.input;
      return {
        ...options,
        input: 'multiple-modules.js'
      };
    },
    outputOptions(options) {
      return {
        ...options,
        entryFileNames: 'multiple-modules.js',
      };
    },
    buildStart(options) {
      const entries = include.map(exporter).join('\n');
      virtualisedEntry = virtual({ [options.input]: entries });
    },
    resolveId(id, importer) {
      return virtualisedEntry && virtualisedEntry.resolveId(id, importer);
    },
    load(id) {
      return virtualisedEntry && virtualisedEntry.load(id);
    }
  };
}

let pluginOptions = [
  multipleModules(),
  resolve({
    jsnext: true,
    browser: true,
  }),
  commonjs(),
];

export default [
  {
    input: [
      [ 'Autocomplete', './autocomplete/dist/index.js' ],
      [ 'Basic_setup', './basic-setup/dist/index.js' ],
      [ 'Closebrackets', './closebrackets/dist/index.js' ],
      [ 'Commands', './commands/dist/index.js' ],
      [ 'Comment', './comment/dist/index.js' ],
      [ 'Fold', './fold/dist/index.js' ],
      [ 'Gutter', './gutter/dist/index.js' ],
      [ 'Highlight', './highlight/dist/index.js' ],
      [ 'History', './history/dist/index.js' ],
      [ 'Language', './language/dist/index.js' ],
      //[ 'Language_data', './language-data/dist/index.js' ],
      [ 'Lint', './lint/dist/index.js' ],
      [ 'Matchbrackets', './matchbrackets/dist/index.js' ],
      [ 'Panel', './panel/dist/index.js' ],
      [ 'Rangeset', './rangeset/dist/index.js' ],
      [ 'Rectangular_selection', './rectangular-selection/dist/index.js' ],
      [ 'Search', './search/dist/index.js' ],
      [ 'State', './state/dist/index.js' ],
      [ 'Stream_parser', './stream-parser/dist/index.js' ],
      [ 'Text', './text/dist/index.js' ],
      [ 'Tooltip', './tooltip/dist/index.js' ],
      [ 'View', './view/dist/index.js' ],
      [ 'Legacy_modes_mllike', './legacy-modes/mode/mllike.js' ],
      [ 'Lang_sql', './lang-sql/dist/index.js' ],
    ],
    output: {
      name: 'codemirror',
      dir: 'chunks',
      format: 'esm',
      manualChunks: {
        codemirror: [
          './autocomplete/dist/index.js',
          './basic-setup/dist/index.js',
          './closebrackets/dist/index.js',
          './commands/dist/index.js',
          './comment/dist/index.js',
          './fold/dist/index.js',
          './gutter/dist/index.js',
          './highlight/dist/index.js',
          './history/dist/index.js',
          './language/dist/index.js',
          './lint/dist/index.js',
          './matchbrackets/dist/index.js',
          './panel/dist/index.js',
          './rangeset/dist/index.js',
          './rectangular-selection/dist/index.js',
          './search/dist/index.js',
          './state/dist/index.js',
          './stream-parser/dist/index.js',
          './text/dist/index.js',
          './tooltip/dist/index.js',
          './view/dist/index.js',
        ],
        lang_sql: [ 'lang-sql' ],
        lang_mllike : [ 'legacy-modes/mode/mllike.js' ],
      }
    },
    plugins: pluginOptions,
  },
];
