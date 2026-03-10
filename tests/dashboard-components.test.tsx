import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Header from '../src/components/dashboard/Header.tsx';
import Recommended from '../src/components/dashboard/Recommended.tsx';
import RightPanel from '../src/components/dashboard/RightPanel.tsx';
import Sidebar from '../src/components/dashboard/Sidebar.tsx';
import TopGrid from '../src/components/dashboard/TopGrid.tsx';

test('dashboard sections render from extracted component modules', () => {
  const sidebarHtml = renderToStaticMarkup(<Sidebar />);
  const headerHtml = renderToStaticMarkup(<Header />);
  const topGridHtml = renderToStaticMarkup(<TopGrid />);
  const recommendedHtml = renderToStaticMarkup(<Recommended />);
  const rightPanelHtml = renderToStaticMarkup(<RightPanel />);

  assert.match(sidebarHtml, /MindDance/);
  assert.match(sidebarHtml, /Dashboard/);

  assert.match(headerHtml, /Dashboard/);
  assert.match(headerHtml, /Search/);

  assert.equal((topGridHtml.match(/data-card-shell=/g) ?? []).length, 4);
  assert.match(recommendedHtml, /Mindful Moments/);
  assert.match(recommendedHtml, /Calm Flow Journey/);
  assert.match(rightPanelHtml, /Good Morning/);
  assert.match(rightPanelHtml, /Ease into Sleep/);
});
