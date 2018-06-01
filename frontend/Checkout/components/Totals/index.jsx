import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@shopgate/pwa-common/components/Grid';
import I18n from '@shopgate/pwa-common/components/I18n';
import connect from './connector';
import { textRight } from './style';

/**
 * @param {Object} props props
 * @return {*}
 */
const Totals = ({ currency, totals }) => (
  <Fragment>
    {
      totals.map(total => (
        <Fragment key={total.id}>
          <Grid>
            <Grid.Item grow={1}>{total.label}</Grid.Item>
            <Grid.Item grow={999} schrink={0} className={textRight}>
              <I18n.Price price={total.amount} currency={currency} />
            </Grid.Item>
          </Grid>
        </Fragment>
      ))
    }
  </Fragment>
);

Totals.propTypes = {
  currency: PropTypes.string,
  totals: PropTypes.arrayOf(PropTypes.shape()),
};

Totals.defaultProps = {
  currency: '',
  totals: [],
};

export default connect(Totals);
