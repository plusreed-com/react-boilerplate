import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';

const Example = lazy(() => import('./components/Example'));
const Example2 = lazy(() => import('./components/Example2'));

render(
    <Suspense fallback={<div>Loading...</div>}>
        <Example />
        <Example2 />
    </Suspense>,
    document.querySelector('#app')
    || document.querySelector('[data-react-root]'),
);