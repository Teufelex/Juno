import React from 'react';
import renderer from 'react-test-renderer';

import PageMain from '../pages/Page_Main';

test('работа MainPage', () => {

    const component = renderer.create(
        <PageMain />
    );

    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

});