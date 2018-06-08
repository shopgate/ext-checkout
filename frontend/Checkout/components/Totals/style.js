import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

export const container = css({
  padding: `${variables.gap.big}px`,
}).toString();

export const subTotal = css({
  fontSize: '14px',
  lineHeight: `${variables.gap.bigger + variables.gap.xsmall}px`,
  fontWeight: '500',
}).toString();

export const total = css({
  color: colors.primary,
  lineHeight: `${variables.gap.bigger + variables.gap.small}px`,
  fontWeight: '500',
}).toString();
