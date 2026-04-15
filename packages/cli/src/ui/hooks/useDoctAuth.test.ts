/**
 * @license
 * Copyright 2025 Doct
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { DeviceAuthorizationData } from '@doct-code/doct-code-core';
import { useDoctAuth } from './useDoctAuth.js';
import {
  AuthType,
  doctOAuth2Events,
  DoctOAuth2Event,
} from '@doct-code/doct-code-core';

// Mock the doctOAuth2Events
vi.mock('@doct-code/doct-code-core', async () => {
  const actual = await vi.importActual('@doct-code/doct-code-core');
  const mockEmitter = {
    on: vi.fn().mockReturnThis(),
    off: vi.fn().mockReturnThis(),
    emit: vi.fn().mockReturnThis(),
  };
  return {
    ...actual,
    doctOAuth2Events: mockEmitter,
    DoctOAuth2Event: {
      AuthUri: 'authUri',
      AuthProgress: 'authProgress',
    },
  };
});

const mockDoctOAuth2Events = vi.mocked(doctOAuth2Events);

describe('useDoctAuth', () => {
  const mockDeviceAuth: DeviceAuthorizationData = {
    verification_uri: 'https://oauth.doct.com/device',
    verification_uri_complete: 'https://oauth.doct.com/device?user_code=ABC123',
    user_code: 'ABC123',
    expires_in: 1800,
    device_code: 'device_code_123',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default state when not Doct auth', () => {
    const { result } = renderHook(() =>
      useDoctAuth(AuthType.USE_GEMINI, false),
    );

    expect(result.current.doctAuthState).toEqual({
      deviceAuth: null,
      authStatus: 'idle',
      authMessage: null,
    });
    expect(result.current.cancelDoctAuth).toBeInstanceOf(Function);
  });

  it('should initialize with default state when Doct auth but not authenticating', () => {
    const { result } = renderHook(() =>
      useDoctAuth(AuthType.DOCT_OAUTH, false),
    );

    expect(result.current.doctAuthState).toEqual({
      deviceAuth: null,
      authStatus: 'idle',
      authMessage: null,
    });
    expect(result.current.cancelDoctAuth).toBeInstanceOf(Function);
  });

  it('should set up event listeners when Doct auth and authenticating', () => {
    renderHook(() => useDoctAuth(AuthType.DOCT_OAUTH, true));

    expect(mockDoctOAuth2Events.on).toHaveBeenCalledWith(
      DoctOAuth2Event.AuthUri,
      expect.any(Function),
    );
    expect(mockDoctOAuth2Events.on).toHaveBeenCalledWith(
      DoctOAuth2Event.AuthProgress,
      expect.any(Function),
    );
  });

  it('should handle device auth event', () => {
    let handleDeviceAuth: (deviceAuth: DeviceAuthorizationData) => void;

    mockDoctOAuth2Events.on.mockImplementation((event, handler) => {
      if (event === DoctOAuth2Event.AuthUri) {
        handleDeviceAuth = handler;
      }
      return mockDoctOAuth2Events;
    });

    const { result } = renderHook(() => useDoctAuth(AuthType.DOCT_OAUTH, true));

    act(() => {
      handleDeviceAuth!(mockDeviceAuth);
    });

    expect(result.current.doctAuthState.deviceAuth).toEqual(mockDeviceAuth);
    expect(result.current.doctAuthState.authStatus).toBe('polling');
  });

  it('should handle auth progress event - success', () => {
    let handleAuthProgress: (
      status: 'success' | 'error' | 'polling' | 'timeout' | 'rate_limit',
      message?: string,
    ) => void;

    mockDoctOAuth2Events.on.mockImplementation((event, handler) => {
      if (event === DoctOAuth2Event.AuthProgress) {
        handleAuthProgress = handler;
      }
      return mockDoctOAuth2Events;
    });

    const { result } = renderHook(() => useDoctAuth(AuthType.DOCT_OAUTH, true));

    act(() => {
      handleAuthProgress!('success', 'Authentication successful!');
    });

    expect(result.current.doctAuthState.authStatus).toBe('success');
    expect(result.current.doctAuthState.authMessage).toBe(
      'Authentication successful!',
    );
  });

  it('should handle auth progress event - error', () => {
    let handleAuthProgress: (
      status: 'success' | 'error' | 'polling' | 'timeout' | 'rate_limit',
      message?: string,
    ) => void;

    mockDoctOAuth2Events.on.mockImplementation((event, handler) => {
      if (event === DoctOAuth2Event.AuthProgress) {
        handleAuthProgress = handler;
      }
      return mockDoctOAuth2Events;
    });

    const { result } = renderHook(() => useDoctAuth(AuthType.DOCT_OAUTH, true));

    act(() => {
      handleAuthProgress!('error', 'Authentication failed');
    });

    expect(result.current.doctAuthState.authStatus).toBe('error');
    expect(result.current.doctAuthState.authMessage).toBe(
      'Authentication failed',
    );
  });

  it('should handle auth progress event - polling', () => {
    let handleAuthProgress: (
      status: 'success' | 'error' | 'polling' | 'timeout' | 'rate_limit',
      message?: string,
    ) => void;

    mockDoctOAuth2Events.on.mockImplementation((event, handler) => {
      if (event === DoctOAuth2Event.AuthProgress) {
        handleAuthProgress = handler;
      }
      return mockDoctOAuth2Events;
    });

    const { result } = renderHook(() => useDoctAuth(AuthType.DOCT_OAUTH, true));

    act(() => {
      handleAuthProgress!('polling', 'Waiting for user authorization...');
    });

    expect(result.current.doctAuthState.authStatus).toBe('polling');
    expect(result.current.doctAuthState.authMessage).toBe(
      'Waiting for user authorization...',
    );
  });

  it('should handle auth progress event - rate_limit', () => {
    let handleAuthProgress: (
      status: 'success' | 'error' | 'polling' | 'timeout' | 'rate_limit',
      message?: string,
    ) => void;

    mockDoctOAuth2Events.on.mockImplementation((event, handler) => {
      if (event === DoctOAuth2Event.AuthProgress) {
        handleAuthProgress = handler;
      }
      return mockDoctOAuth2Events;
    });

    const { result } = renderHook(() => useDoctAuth(AuthType.DOCT_OAUTH, true));

    act(() => {
      handleAuthProgress!(
        'rate_limit',
        'Too many requests. The server is rate limiting our requests. Please select a different authentication method or try again later.',
      );
    });

    expect(result.current.doctAuthState.authStatus).toBe('rate_limit');
    expect(result.current.doctAuthState.authMessage).toBe(
      'Too many requests. The server is rate limiting our requests. Please select a different authentication method or try again later.',
    );
  });

  it('should handle auth progress event without message', () => {
    let handleAuthProgress: (
      status: 'success' | 'error' | 'polling' | 'timeout' | 'rate_limit',
      message?: string,
    ) => void;

    mockDoctOAuth2Events.on.mockImplementation((event, handler) => {
      if (event === DoctOAuth2Event.AuthProgress) {
        handleAuthProgress = handler;
      }
      return mockDoctOAuth2Events;
    });

    const { result } = renderHook(() => useDoctAuth(AuthType.DOCT_OAUTH, true));

    act(() => {
      handleAuthProgress!('success');
    });

    expect(result.current.doctAuthState.authStatus).toBe('success');
    expect(result.current.doctAuthState.authMessage).toBe(null);
  });

  it('should clean up event listeners when auth type changes', () => {
    const { rerender } = renderHook(
      ({ pendingAuthType, isAuthenticating }) =>
        useDoctAuth(pendingAuthType, isAuthenticating),
      {
        initialProps: {
          pendingAuthType: AuthType.DOCT_OAUTH,
          isAuthenticating: true,
        },
      },
    );

    // Change to non-Doct auth
    rerender({ pendingAuthType: AuthType.USE_GEMINI, isAuthenticating: true });

    expect(mockDoctOAuth2Events.off).toHaveBeenCalledWith(
      DoctOAuth2Event.AuthUri,
      expect.any(Function),
    );
    expect(mockDoctOAuth2Events.off).toHaveBeenCalledWith(
      DoctOAuth2Event.AuthProgress,
      expect.any(Function),
    );
  });

  it('should clean up event listeners when authentication stops', () => {
    const { rerender } = renderHook(
      ({ isAuthenticating }) =>
        useDoctAuth(AuthType.DOCT_OAUTH, isAuthenticating),
      { initialProps: { isAuthenticating: true } },
    );

    // Stop authentication
    rerender({ isAuthenticating: false });

    expect(mockDoctOAuth2Events.off).toHaveBeenCalledWith(
      DoctOAuth2Event.AuthUri,
      expect.any(Function),
    );
    expect(mockDoctOAuth2Events.off).toHaveBeenCalledWith(
      DoctOAuth2Event.AuthProgress,
      expect.any(Function),
    );
  });

  it('should clean up event listeners on unmount', () => {
    const { unmount } = renderHook(() =>
      useDoctAuth(AuthType.DOCT_OAUTH, true),
    );

    unmount();

    expect(mockDoctOAuth2Events.off).toHaveBeenCalledWith(
      DoctOAuth2Event.AuthUri,
      expect.any(Function),
    );
    expect(mockDoctOAuth2Events.off).toHaveBeenCalledWith(
      DoctOAuth2Event.AuthProgress,
      expect.any(Function),
    );
  });

  it('should reset state when switching from Doct auth to another auth type', () => {
    let handleDeviceAuth: (deviceAuth: DeviceAuthorizationData) => void;

    mockDoctOAuth2Events.on.mockImplementation((event, handler) => {
      if (event === DoctOAuth2Event.AuthUri) {
        handleDeviceAuth = handler;
      }
      return mockDoctOAuth2Events;
    });

    const { result, rerender } = renderHook(
      ({ pendingAuthType, isAuthenticating }) =>
        useDoctAuth(pendingAuthType, isAuthenticating),
      {
        initialProps: {
          pendingAuthType: AuthType.DOCT_OAUTH,
          isAuthenticating: true,
        },
      },
    );

    // Simulate device auth
    act(() => {
      handleDeviceAuth!(mockDeviceAuth);
    });

    expect(result.current.doctAuthState.deviceAuth).toEqual(mockDeviceAuth);
    expect(result.current.doctAuthState.authStatus).toBe('polling');

    // Switch to different auth type
    rerender({ pendingAuthType: AuthType.USE_GEMINI, isAuthenticating: true });

    expect(result.current.doctAuthState.deviceAuth).toBe(null);
    expect(result.current.doctAuthState.authStatus).toBe('idle');
    expect(result.current.doctAuthState.authMessage).toBe(null);
  });

  it('should reset state when authentication stops', () => {
    let handleDeviceAuth: (deviceAuth: DeviceAuthorizationData) => void;

    mockDoctOAuth2Events.on.mockImplementation((event, handler) => {
      if (event === DoctOAuth2Event.AuthUri) {
        handleDeviceAuth = handler;
      }
      return mockDoctOAuth2Events;
    });

    const { result, rerender } = renderHook(
      ({ isAuthenticating }) =>
        useDoctAuth(AuthType.DOCT_OAUTH, isAuthenticating),
      { initialProps: { isAuthenticating: true } },
    );

    // Simulate device auth
    act(() => {
      handleDeviceAuth!(mockDeviceAuth);
    });

    expect(result.current.doctAuthState.deviceAuth).toEqual(mockDeviceAuth);
    expect(result.current.doctAuthState.authStatus).toBe('polling');

    // Stop authentication
    rerender({ isAuthenticating: false });

    expect(result.current.doctAuthState.deviceAuth).toBe(null);
    expect(result.current.doctAuthState.authStatus).toBe('idle');
    expect(result.current.doctAuthState.authMessage).toBe(null);
  });

  it('should handle cancelDoctAuth function', () => {
    let handleDeviceAuth: (deviceAuth: DeviceAuthorizationData) => void;

    mockDoctOAuth2Events.on.mockImplementation((event, handler) => {
      if (event === DoctOAuth2Event.AuthUri) {
        handleDeviceAuth = handler;
      }
      return mockDoctOAuth2Events;
    });

    const { result } = renderHook(() => useDoctAuth(AuthType.DOCT_OAUTH, true));

    // Set up some state
    act(() => {
      handleDeviceAuth!(mockDeviceAuth);
    });

    expect(result.current.doctAuthState.deviceAuth).toEqual(mockDeviceAuth);

    // Cancel auth
    act(() => {
      result.current.cancelDoctAuth();
    });

    expect(result.current.doctAuthState.deviceAuth).toBe(null);
    expect(result.current.doctAuthState.authStatus).toBe('idle');
    expect(result.current.doctAuthState.authMessage).toBe(null);
  });

  it('should handle different auth types correctly', () => {
    // Test with Doct OAuth - should set up event listeners when authenticating
    const { result: doctResult } = renderHook(() =>
      useDoctAuth(AuthType.DOCT_OAUTH, true),
    );
    expect(doctResult.current.doctAuthState.authStatus).toBe('idle');
    expect(mockDoctOAuth2Events.on).toHaveBeenCalled();

    // Test with other auth types - should not set up event listeners
    const { result: geminiResult } = renderHook(() =>
      useDoctAuth(AuthType.USE_GEMINI, true),
    );
    expect(geminiResult.current.doctAuthState.authStatus).toBe('idle');

    const { result: oauthResult } = renderHook(() =>
      useDoctAuth(AuthType.USE_OPENAI, true),
    );
    expect(oauthResult.current.doctAuthState.authStatus).toBe('idle');
  });

  it('should initialize with idle status when starting authentication with Doct auth', () => {
    const { result } = renderHook(() => useDoctAuth(AuthType.DOCT_OAUTH, true));

    expect(result.current.doctAuthState.authStatus).toBe('idle');
    expect(mockDoctOAuth2Events.on).toHaveBeenCalled();
  });
});
