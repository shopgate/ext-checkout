import React from 'react';
import PropTypes from 'prop-types';
import { App } from '@shopgate/pwa-common/context';
import Grid from '@shopgate/pwa-common/components/Grid';
import I18n from '@shopgate/pwa-common/components/I18n';
import connect from './connector';
import * as style from './style';

/**
 * @param {Object} props props
 * @return {*}
 */
const Totals = ({ totals }) => (
  <App>
    {({ checkout }) => (
      <div className={style.container} data-test-id="totalsComponent">
        {
          totals.map(total => (
            <Grid key={total.id}>
              <Grid.Item
                grow={1}
                className={total.id === 'total' ? style.total : style.subTotal}
              >
                <div data-test-id={`totalLabel: ${total.id}`}>
                  <I18n.Text string={`checkout.totals.${total.id}`} />
                </div>
              </Grid.Item>
              <Grid.Item
                grow={0}
                className={total.id === 'total' ? style.total : style.subTotal}
              >
                <div data-test-id={`${total.id} amount: ${total.amount}`}>
                  <I18n.Price price={total.amount} currency={checkout.currency} />
                </div>
              </Grid.Item>
            </Grid>
          ))
        }
      </div>
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
