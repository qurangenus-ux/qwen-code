/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import { connectCommand } from './connectCommand.js';
import { createMockCommandContext } from '../../test-utils/mockCommandContext.js';

describe('connectCommand', () => {
  it('should have the correct name and description', () => {
    expect(connectCommand.name).toBe('connect');
    expect(connectCommand.description).toBe('Connect a provider and model');
  });

  it('should open auth dialog', async () => {
    const context = createMockCommandContext();
    const result = await connectCommand.action!(context, '');

    expect(result).toEqual({
      type: 'dialog',
      dialog: 'auth',
    });
  });
});
