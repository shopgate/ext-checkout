import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const container = css({
  padding: variables.gap.big,
}).toString();

const headline = css({
  fontWeight: 500,
}).toString();

const subLine = css({
  fontSize: '0,875rem',
  color: colors.shade3,
  margin: `${variables.gap.big}px 0`,
}).toString();

const buttonWrapper = css({
  margin: `${variables.gap.xbig}px 0`,
}).toString();

const button = css({
  width: '100%',
}).toString();

export default {
  container,
  headline,
  subLine,
  buttonWrapper,
  button,
};
