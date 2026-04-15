/**
 * @license
 * Copyright 2025 Doct
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect } from 'react';
import {
  AuthType,
  doctOAuth2Events,
  DoctOAuth2Event,
  type DeviceAuthorizationData,
} from '@doct-code/doct-code-core';

export interface DoctAuthState {
  deviceAuth: DeviceAuthorizationData | null;
  authStatus:
    | 'idle'
    | 'polling'
    | 'success'
    | 'error'
    | 'timeout'
    | 'rate_limit';
  authMessage: string | null;
}

export const useDoctAuth = (
  pendingAuthType: AuthType | undefined,
  isAuthenticating: boolean,
) => {
  const [doctAuthState, setDoctAuthState] = useState<DoctAuthState>({
    deviceAuth: null,
    authStatus: 'idle',
    authMessage: null,
  });

  const isDoctAuth = pendingAuthType === AuthType.DOCT_OAUTH;

  // Set up event listeners when authentication starts
  useEffect(() => {
    if (!isDoctAuth || !isAuthenticating) {
      // Reset state when not authenticating or not Doct auth
      setDoctAuthState({
        deviceAuth: null,
        authStatus: 'idle',
        authMessage: null,
      });
      return;
    }

    setDoctAuthState((prev) => ({
      ...prev,
      authStatus: 'idle',
    }));

    // Set up event listeners
    const handleDeviceAuth = (deviceAuth: DeviceAuthorizationData) => {
      setDoctAuthState((prev) => ({
        ...prev,
        deviceAuth: {
          verification_uri: deviceAuth.verification_uri,
          verification_uri_complete: deviceAuth.verification_uri_complete,
          user_code: deviceAuth.user_code,
          expires_in: deviceAuth.expires_in,
          device_code: deviceAuth.device_code,
        },
        authStatus: 'polling',
      }));
    };

    const handleAuthProgress = (
      status: 'success' | 'error' | 'polling' | 'timeout' | 'rate_limit',
      message?: string,
    ) => {
      setDoctAuthState((prev) => ({
        ...prev,
        authStatus: status,
        authMessage: message || null,
      }));
    };

    // Add event listeners
    doctOAuth2Events.on(DoctOAuth2Event.AuthUri, handleDeviceAuth);
    doctOAuth2Events.on(DoctOAuth2Event.AuthProgress, handleAuthProgress);

    // Cleanup event listeners when component unmounts or auth finishes
    return () => {
      doctOAuth2Events.off(DoctOAuth2Event.AuthUri, handleDeviceAuth);
      doctOAuth2Events.off(DoctOAuth2Event.AuthProgress, handleAuthProgress);
    };
  }, [isDoctAuth, isAuthenticating]);

  const cancelDoctAuth = useCallback(() => {
    // Emit cancel event to stop polling
    doctOAuth2Events.emit(DoctOAuth2Event.AuthCancel);

    setDoctAuthState({
      deviceAuth: null,
      authStatus: 'idle',
      authMessage: null,
    });
  }, []);

  return {
    doctAuthState,
    cancelDoctAuth,
  };
};
