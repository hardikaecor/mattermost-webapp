// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {ActionTypes, ModalIdentifiers} from 'utils/constants';

export default function marketplace(state = {installing: {}, error: {}}, action) {
    switch (action.type) {
    case ActionTypes.INSTALLING_MARKETPLACE_PLUGIN: {
        const newState = {
            ...state,
            installing: {
                ...state.installing,
                [action.id]: true,
            },
            error: {
                ...state.error,
            },
        };
        delete newState.error[action.id];

        return newState;
    }

    case ActionTypes.INSTALLING_MARKETPLACE_PLUGIN_SUCCEEDED: {
        const newState = {
            ...state,
            installing: {
                ...state.installing,
                [action.id]: false,
            },
            error: {
                ...state.error,
            },
        };
        delete newState.error[action.id];

        return newState;
    }

    case ActionTypes.INSTALLING_MARKETPLACE_PLUGIN_FAILED: {
        return {
            ...state,
            installing: {
                ...state.installing,
                [action.id]: false,
            },
            error: {
                ...state.error,
                [action.id]: action.error,
            },
        };
    }

    case ActionTypes.MODAL_CLOSE:
        if (action.modalId !== ModalIdentifiers.PLUGIN_MARKETPLACE) {
            return state;
        }

        return {installing: {}, error: {}};

    default:
        return state;
    }
}