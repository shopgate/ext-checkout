import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { App } from '@shopgate/pwa-common/context';
import Grid from '@shopgate/pwa-common/components/Grid';
import I18n from '@shopgate/pwa-common/components/I18n';
import connect from './connector';
import { textRight } from './style';

/**
 * @param {Object} props props
 * @return {*}
 */
const Totals = ({ totals }) => (
  <App>
    {({ checkout }) => (
      <Fragment>
        {
          totals.map(total => (
            <Fragment key={total.id}>
              <Grid>
                <Grid.Item grow={1}>{total.label}</Grid.Item>
                <Grid.Item grow={999} schrink={0} className={textRight}>
                  <I18n.Price price={total.amount} currency={checkout.currency} />
                </Grid.Item>
              </Grid>
            </Fragment>
          ))
        }
      </Fragment>
    )}
  </App>
);

Totals.propTypes = {
  totals: PropTypes.arrayOf(PropTypes.shape()),
};

Totals.defaultProps = {
  totals: [],
};

export default connect(Totals);
