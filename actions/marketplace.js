// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {getMarketplacePlugins} from 'mattermost-redux/actions/plugins';
import {getMarketplaceInstalledPlugins} from 'mattermost-redux/selectors/entities/plugins';
import {installPluginFromUrl} from 'mattermost-redux/actions/admin';

import {ActionTypes} from 'utils/constants';

export {
    getMarketplacePlugins,
    getMarketplaceInstalledPlugins,
};

// installMarketplacePlugin installs the latest version of the given plugin from the marketplace.
//
// On success, it also requests the current state of the plugins to reflect the newly installed plugin.
export function installMarketplacePlugin(id) {
    return async (dispatch, getState) => {
        dispatch({
            type: ActionTypes.INSTALLING_MARKETPLACE_PLUGIN,
            id,
        });

        const state = getState();
        const marketplacePlugins = state.entities.plugins.marketplacePlugins;

        const marketplacePlugin = marketplacePlugins.find(((p) => p.manifest && p.manifest.id === id));
        const downloadUrl = marketplacePlugin.download_url;

        const {error} = await dispatch(installPluginFromUrl(downloadUrl, true));
        if (error) {
            dispatch({
                type: ActionTypes.INSTALLING_MARKETPLACE_PLUGIN_FAILED,
                id,
                error: error.message,
            });
            return;
        }

        await dispatch(getMarketplacePlugins());
        dispatch({
            type: ActionTypes.INSTALLING_MARKETPLACE_PLUGIN_SUCCEEDED,
            id,
        });
    };
}