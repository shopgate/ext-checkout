import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

export const container = css({
  flexGrow: 1,
  background: colors.background,
  padding: `${variables.gap.big}px 0`,
}).toString();

export const buttonWrapper = css({
  padding: `0 ${variables.gap.big}px`,
}).toString();

export const button = css({
  width: '100%',
}).toString();
