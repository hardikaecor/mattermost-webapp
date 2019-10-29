// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {installMarketplacePlugin} from 'actions/marketplace';

import MarketplaceItem from './marketplace_item.js';

function mapStateToProps(state, props) {
    const installing = Boolean(state.views.marketplace.installing[props.id]);
    const error = state.views.marketplace.error[props.id];

    return {
        installing,
        error,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            installMarketplacePlugin,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketplaceItem);
