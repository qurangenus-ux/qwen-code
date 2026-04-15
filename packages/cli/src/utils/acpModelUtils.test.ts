/**
 * @license
 * Copyright 2025 Doct Team
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { AuthType } from '@doct-code/doct-code-core';
import {
  formatAcpModelId,
  parseAcpBaseModelId,
  parseAcpModelOption,
} from './acpModelUtils.js';

describe('acpModelUtils', () => {
  it('formats modelId(authType)', () => {
    expect(formatAcpModelId('doct3', AuthType.DOCT_OAUTH)).toBe(
      `doct3(${AuthType.DOCT_OAUTH})`,
    );
  });

  it('extracts base model id when string ends with parentheses', () => {
    expect(parseAcpBaseModelId(`doct3(${AuthType.USE_OPENAI})`)).toBe('doct3');
  });

  it('does not strip when parentheses are not a trailing suffix', () => {
    expect(parseAcpBaseModelId('doct3(x) y')).toBe('doct3(x) y');
  });

  it('parses modelId and validates authType', () => {
    expect(parseAcpModelOption(` doct3(${AuthType.USE_OPENAI}) `)).toEqual({
      modelId: 'doct3',
      authType: AuthType.USE_OPENAI,
    });
  });

  it('returns trimmed input as modelId when authType is invalid', () => {
    expect(parseAcpModelOption('doct3(not-a-real-auth)')).toEqual({
      modelId: 'doct3(not-a-real-auth)',
    });
  });
});
