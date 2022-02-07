import resolve from '@rollup/plugin-node-resolve';
import virtual from '@rollup/plugin-virtual';
import commonjs from '@rollup/plugin-commonjs';
import iife from 'rollup-plugin-iife';

function multipleModules() {
  const exporter = ([name, path]) => `export * as ${name} from ${JSON.stringify(path)}`;
  let virtualisedEntry;
  let include;
  return {
    name: 'root',
    options(options) {
      include = options.input;
      return {
        ...options,
        input: 'root.js'
      };
    },
    outputOptions(options) {
      return {
        ...options,
        entryFileNames: 'root.js',
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
  iife(),
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
        autocomplete: [ './autocomplete/dist/index.js' ],
        basicsetup: [ './basic-setup/dist/index.js' ],
        closebrackets: [ './closebrackets/dist/index.js' ],
        commands: [ './commands/dist/index.js' ],
        comment: [ './comment/dist/index.js' ],
        fold: [ './fold/dist/index.js' ],
        gutter: [ './gutter/dist/index.js' ],
        highlight: [ './highlight/dist/index.js' ],
        history: [ './history/dist/index.js' ],
        language: [ './language/dist/index.js' ],
        lint: [ './lint/dist/index.js' ],
        matchbrackets: [ './matchbrackets/dist/index.js' ],
        panel: [ './panel/dist/index.js' ],
        rangeset: [ './rangeset/dist/index.js' ],
        rectangularselection: [ './rectangular-selection/dist/index.js' ],
        search: [ './search/dist/index.js' ],
        state: [ './state/dist/index.js' ],
        streamparser: [ './stream-parser/dist/index.js' ],
        text: [ './text/dist/index.js' ],
        tooltip: [ './tooltip/dist/index.js' ],
        view: [ './view/dist/index.js' ],
        lang_sql: [ 'lang-sql' ],
        lang_mllike : [ 'legacy-modes/mode/mllike.js' ],
      }
    },
    plugins: pluginOptions,
  },
];
