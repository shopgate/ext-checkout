import { css } from 'glamor'
import { themeConfig } from '@shopgate/pwa-common/helpers/config'
const { variables } = themeConfig

const container = css({
  flexGrow: 1,
  padding: `${variables.gap.small * 3}px ${variables.gap.big}px`
}).toString()

const buttonWrapper = css({
  paddingTop: variables.gap.big * 2,
  paddingBottom: variables.gap.big * 1.5
}).toString()

const button = css({
  width: '100%'
}).toString()

export default {
  container,
  buttonWrapper,
  button
}
