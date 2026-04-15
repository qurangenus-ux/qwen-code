/**
 * @license
 * Copyright 2025 Doct Team
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthType } from '@doct-code/doct-code-core';
import type { AuthMethod } from '@agentclientprotocol/sdk';

export function buildAuthMethods(): AuthMethod[] {
  return [
    {
      id: AuthType.USE_OPENAI,
      name: 'Use OpenAI API key',
      description: 'Requires setting the `OPENAI_API_KEY` environment variable',
      _meta: {
        type: 'terminal',
        args: ['--auth-type=openai'],
      },
    },
    {
      id: AuthType.DOCT_OAUTH,
      name: 'Doct OAuth',
      description:
        'OAuth authentication for Doct models with free daily requests (ending 2026-04-15)',
      _meta: {
        type: 'terminal',
        args: ['--auth-type=doct-oauth'],
      },
    },
  ];
}

export function filterAuthMethodsById(
  authMethods: AuthMethod[],
  authMethodId: string,
): AuthMethod[] {
  return authMethods.filter((method) => method.id === authMethodId);
}

export function pickAuthMethodsForDetails(details?: string): AuthMethod[] {
  const authMethods = buildAuthMethods();
  if (!details) {
    return authMethods;
  }
  if (details.includes('doct-oauth') || details.includes('Doct OAuth')) {
    const narrowed = filterAuthMethodsById(authMethods, AuthType.DOCT_OAUTH);
    return narrowed.length ? narrowed : authMethods;
  }
  return authMethods;
}
