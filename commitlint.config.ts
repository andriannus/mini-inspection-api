import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'chore',
        'revert',
        'feat',
        'fix',
        'improvement',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
      ],
    ],
  },
};

export default config;
