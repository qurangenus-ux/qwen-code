/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { type ColorsTheme, Theme } from './theme.js';
import { darkSemanticColors } from './semantic-tokens.js';

const doctDarkColors: ColorsTheme = {
  type: 'dark',
  Background: '#0b0e14',
  Foreground: '#bfbdb6',
  LightBlue: '#59C2FF',
  AccentBlue: '#39BAE6',
  AccentPurple: '#D2A6FF',
  AccentCyan: '#95E6CB',
  AccentGreen: '#AAD94C',
  AccentYellow: '#FFD700',
  AccentRed: '#F26D78',
  AccentYellowDim: '#8B7530',
  AccentRedDim: '#8B3A4A',
  DiffAdded: '#AAD94C',
  DiffRemoved: '#F26D78',
  Comment: '#646A71',
  Gray: '#3D4149',
  GradientColors: ['#FFD700', '#da7959'],
};

export const DoctDark: Theme = new Theme(
  'Doct Dark',
  'dark',
  {
    hljs: {
      display: 'block',
      overflowX: 'auto',
      padding: '0.5em',
      background: doctDarkColors.Background,
      color: doctDarkColors.Foreground,
    },
    'hljs-keyword': {
      color: doctDarkColors.AccentYellow,
    },
    'hljs-literal': {
      color: doctDarkColors.AccentPurple,
    },
    'hljs-symbol': {
      color: doctDarkColors.AccentCyan,
    },
    'hljs-name': {
      color: doctDarkColors.LightBlue,
    },
    'hljs-link': {
      color: doctDarkColors.AccentBlue,
    },
    'hljs-function .hljs-keyword': {
      color: doctDarkColors.AccentYellow,
    },
    'hljs-subst': {
      color: doctDarkColors.Foreground,
    },
    'hljs-string': {
      color: doctDarkColors.AccentGreen,
    },
    'hljs-title': {
      color: doctDarkColors.AccentYellow,
    },
    'hljs-type': {
      color: doctDarkColors.AccentBlue,
    },
    'hljs-attribute': {
      color: doctDarkColors.AccentYellow,
    },
    'hljs-bullet': {
      color: doctDarkColors.AccentYellow,
    },
    'hljs-addition': {
      color: doctDarkColors.AccentGreen,
    },
    'hljs-variable': {
      color: doctDarkColors.Foreground,
    },
    'hljs-template-tag': {
      color: doctDarkColors.AccentYellow,
    },
    'hljs-template-variable': {
      color: doctDarkColors.AccentYellow,
    },
    'hljs-comment': {
      color: doctDarkColors.Comment,
      fontStyle: 'italic',
    },
    'hljs-quote': {
      color: doctDarkColors.AccentCyan,
      fontStyle: 'italic',
    },
    'hljs-deletion': {
      color: doctDarkColors.AccentRed,
    },
    'hljs-meta': {
      color: doctDarkColors.AccentYellow,
    },
    'hljs-doctag': {
      fontWeight: 'bold',
    },
    'hljs-strong': {
      fontWeight: 'bold',
    },
    'hljs-emphasis': {
      fontStyle: 'italic',
    },
  },
  doctDarkColors,
  darkSemanticColors,
);
