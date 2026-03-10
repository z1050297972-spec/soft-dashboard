import test from 'node:test';
import assert from 'node:assert/strict';

import {
  chatMessages,
  navigationSections,
  recommendationTabs,
  recommendedItems,
  topGridCards,
} from '../src/data/dashboard.ts';

test('dashboard data exports the expected content groups', () => {
  assert.equal(navigationSections.length, 2);
  assert.deepEqual(
    navigationSections.map((section) => section.title),
    ['General', 'Others'],
  );

  assert.equal(topGridCards.length, 4);
  assert.deepEqual(
    topGridCards.map((card) => card.id),
    ['meditate', 'move', 'sleep', 'music'],
  );

  assert.deepEqual(recommendationTabs, ['Mindfulness', 'Focus', 'Relaxation']);
  assert.equal(recommendedItems.length, 3);
  assert.equal(recommendedItems[0]?.title, 'Mindful Moments');

  assert.equal(chatMessages.length, 2);
  assert.equal(chatMessages[0]?.author, 'You');
  assert.equal(chatMessages[1]?.author, 'Sense');
});
