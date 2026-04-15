/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { type ColorsTheme, Theme } from './theme.js';
import { lightSemanticColors } from './semantic-tokens.js';

const doctLightColors: ColorsTheme = {
  type: 'light',
  Background: '#f8f9fa',
  Foreground: '#5c6166',
  LightBlue: '#55b4d4',
  AccentBlue: '#399ee6',
  AccentPurple: '#a37acc',
  AccentCyan: '#4cbf99',
  AccentGreen: '#86b300',
  AccentYellow: '#f2ae49',
  AccentRed: '#f07171',
  AccentYellowDim: '#8B7000',
  AccentRedDim: '#993333',
  DiffAdded: '#86b300',
  DiffRemoved: '#f07171',
  Comment: '#ABADB1',
  Gray: '#CCCFD3',
  GradientColors: ['#399ee6', '#86b300'],
};

export const DoctLight: Theme = new Theme(
  'Doct Light',
  'light',
  {
    hljs: {
      display: 'block',
      overflowX: 'auto',
      padding: '0.5em',
      background: doctLightColors.Background,
      color: doctLightColors.Foreground,
    },
    'hljs-comment': {
      color: doctLightColors.Comment,
      fontStyle: 'italic',
    },
    'hljs-quote': {
      color: doctLightColors.AccentCyan,
      fontStyle: 'italic',
    },
    'hljs-string': {
      color: doctLightColors.AccentGreen,
    },
    'hljs-constant': {
      color: doctLightColors.AccentCyan,
    },
    'hljs-number': {
      color: doctLightColors.AccentPurple,
    },
    'hljs-keyword': {
      color: doctLightColors.AccentYellow,
    },
    'hljs-selector-tag': {
      color: doctLightColors.AccentYellow,
    },
    'hljs-attribute': {
      color: doctLightColors.AccentYellow,
    },
    'hljs-variable': {
      color: doctLightColors.Foreground,
    },
    'hljs-variable.language': {
      color: doctLightColors.LightBlue,
      fontStyle: 'italic',
    },
    'hljs-title': {
      color: doctLightColors.AccentBlue,
    },
    'hljs-section': {
      color: doctLightColors.AccentGreen,
      fontWeight: 'bold',
    },
    'hljs-type': {
      color: doctLightColors.LightBlue,
    },
    'hljs-class .hljs-title': {
      color: doctLightColors.AccentBlue,
    },
    'hljs-tag': {
      color: doctLightColors.LightBlue,
    },
    'hljs-name': {
      color: doctLightColors.AccentBlue,
    },
    'hljs-builtin-name': {
      color: doctLightColors.AccentYellow,
    },
    'hljs-meta': {
      color: doctLightColors.AccentYellow,
    },
    'hljs-symbol': {
      color: doctLightColors.AccentRed,
    },
    'hljs-bullet': {
      color: doctLightColors.AccentYellow,
    },
    'hljs-regexp': {
      color: doctLightColors.AccentCyan,
    },
    'hljs-link': {
      color: doctLightColors.LightBlue,
    },
    'hljs-deletion': {
      color: doctLightColors.AccentRed,
    },
    'hljs-addition': {
      color: doctLightColors.AccentGreen,
    },
    'hljs-emphasis': {
      fontStyle: 'italic',
    },
    'hljs-strong': {
      fontWeight: 'bold',
    },
    'hljs-literal': {
      color: doctLightColors.AccentCyan,
    },
    'hljs-built_in': {
      color: doctLightColors.AccentRed,
    },
    'hljs-doctag': {
      color: doctLightColors.AccentRed,
    },
    'hljs-template-variable': {
      color: doctLightColors.AccentCyan,
    },
    'hljs-selector-id': {
      color: doctLightColors.AccentRed,
    },
  },
  doctLightColors,
  lightSemanticColors,
);
