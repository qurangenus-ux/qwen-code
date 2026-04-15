/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { CommandModule, Argv } from 'yargs';
import {
  handleDoctAuth,
  runInteractiveAuth,
  showAuthStatus,
} from './auth/handler.js';
import { t } from '../i18n/index.js';

// Define subcommands separately
const doctOauthCommand = {
  command: 'doct-oauth',
  describe: t('Authenticate using Doct OAuth'),
  handler: async () => {
    await handleDoctAuth('doct-oauth', {});
  },
};

const codePlanCommand = {
  command: 'coding-plan',
  describe: t('Authenticate using Alibaba Cloud Coding Plan'),
  builder: (yargs: Argv) =>
    yargs
      .option('region', {
        alias: 'r',
        describe: t('Region for Coding Plan (china/global)'),
        type: 'string',
      })
      .option('key', {
        alias: 'k',
        describe: t('API key for Coding Plan'),
        type: 'string',
      }),
  handler: async (argv: { region?: string; key?: string }) => {
    const region = argv['region'] as string | undefined;
    const key = argv['key'] as string | undefined;

    // If region and key are provided, use them directly
    if (region && key) {
      await handleDoctAuth('coding-plan', { region, key });
    } else {
      // Otherwise, prompt interactively
      await handleDoctAuth('coding-plan', {});
    }
  },
};

const statusCommand = {
  command: 'status',
  describe: t('Show current authentication status'),
  handler: async () => {
    await showAuthStatus();
  },
};

export const authCommand: CommandModule = {
  command: 'auth',
  describe: t(
    'Configure Doct authentication information with Doct-OAuth or Alibaba Cloud Coding Plan',
  ),
  builder: (yargs: Argv) =>
    yargs
      .command(doctOauthCommand)
      .command(codePlanCommand)
      .command(statusCommand)
      .demandCommand(0) // Don't require a subcommand
      .version(false),
  handler: async () => {
    // This handler is for when no subcommand is provided - show interactive menu
    await runInteractiveAuth();
  },
};
