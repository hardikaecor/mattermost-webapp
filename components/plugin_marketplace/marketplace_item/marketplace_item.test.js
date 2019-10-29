// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {shallow} from 'enzyme';

import MarketplaceItem from './marketplace_item.js';

describe('components/MarketplaceItem', () => {
    const baseProps = {
        id: 'id',
        name: 'name',
        description: 'test plugin',
        version: '1.0.0',
        downloadUrl: 'http://example.com/download',
        signatureUrl: 'http://example.com/signature',
        homepageUrl: 'http://example.com',
        iconUrl: '',
        installedVersion: '1.0.0',
        onConfigure: () => {}, // eslint-disable-line no-empty-function
        installing: false,
        actions: {
            installMarketplacePlugin: () => {}, // eslint-disable-line no-empty-function
        },
    };

    test('should match snapshot, no plugin icon', () => {
        const wrapper = shallow(
            <MarketplaceItem {...baseProps}/>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, with plugin icon', () => {
        const props = {
            ...baseProps,
            iconData: 'icon',
        };
        const wrapper = shallow(
            <MarketplaceItem {...props}/>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, with homepage url', () => {
        const wrapper = shallow(
            <MarketplaceItem {...baseProps}/>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, no homepage url', () => {
        const props = {
            ...baseProps,
        };
        delete props.homepageUrl;

        const wrapper = shallow(
            <MarketplaceItem {...props}/>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, with server error', () => {
        const props = {
            ...baseProps,
            error: 'An error occurred.',
        };

        const wrapper = shallow(
            <MarketplaceItem {...props}/>
        );

        expect(wrapper).toMatchSnapshot();
    });
});
