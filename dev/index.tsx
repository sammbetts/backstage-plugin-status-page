import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { statusPagePlugin, StatusPage } from '../src/plugin';
import { StatusWidget } from '../src/components';

createDevApp()
  .registerPlugin(statusPagePlugin)
  .addPage({
    element: <StatusPage />,
    title: 'Status Page',
    path: '/status-page',
  })
  .addPage({
    element: (
      <div style={{ width: '550px', margin: '10px' }}>
        <StatusWidget title={'Status Overview'} />
      </div>
    ),
    title: 'Widget',
    path: '/widget',
  })
  .render();
