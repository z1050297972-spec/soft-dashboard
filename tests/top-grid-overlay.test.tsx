import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import App from '../src/App.tsx';

type ParsedNode = {
  tagName: string;
  attrs: Record<string, string>;
  children: ParsedNode[];
  parent?: ParsedNode;
};

const VOID_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

function parseHtml(html: string) {
  const root: ParsedNode = { tagName: 'root', attrs: {}, children: [] };
  const stack = [root];
  const tagPattern = /<[^>]+>/g;

  for (const match of html.matchAll(tagPattern)) {
    const rawTag = match[0];

    if (rawTag.startsWith('</')) {
      stack.pop();
      continue;
    }

    const isSelfClosing = rawTag.endsWith('/>');
    const content = rawTag.slice(1, rawTag.length - (isSelfClosing ? 2 : 1)).trim();
    const tagNameMatch = content.match(/^([^\s/>]+)/);

    if (!tagNameMatch) {
      continue;
    }

    const tagName = tagNameMatch[1];
    const attrString = content.slice(tagName.length).trim();
    const attrs: Record<string, string> = {};

    for (const attrMatch of attrString.matchAll(/([^\s=]+)(?:="([^"]*)")?/g)) {
      const [, name, value = ''] = attrMatch;
      attrs[name] = value;
    }

    const node: ParsedNode = {
      tagName,
      attrs,
      children: [],
      parent: stack[stack.length - 1],
    };

    stack[stack.length - 1].children.push(node);

    if (!isSelfClosing && !VOID_TAGS.has(tagName)) {
      stack.push(node);
    }
  }

  return root;
}

function findNodeByAttr(node: ParsedNode, attrName: string, attrValue: string): ParsedNode | undefined {
  if (node.attrs[attrName] === attrValue) {
    return node;
  }

  for (const child of node.children) {
    const match = findNodeByAttr(child, attrName, attrValue);

    if (match) {
      return match;
    }
  }

  return undefined;
}

function findNodeByClassToken(node: ParsedNode, token: string): ParsedNode | undefined {
  if (nodeHasClassToken(node, token)) {
    return node;
  }

  for (const child of node.children) {
    const match = findNodeByClassToken(child, token);

    if (match) {
      return match;
    }
  }

  return undefined;
}

function assertImageIsNotBlended(tree: ParsedNode, alt: string) {
  const image = findNodeByAttr(tree, 'alt', alt);

  assert.ok(image, `expected image node for ${alt}`);
  assert.ok(!nodeHasClassToken(image, 'mix-blend-overlay'), `expected ${alt} image to avoid blend overlay`);
}

function hasAncestorWithAttr(node: ParsedNode, attrName: string, attrValue: string) {
  let current = node.parent;

  while (current) {
    if (current.attrs[attrName] === attrValue) {
      return true;
    }

    current = current.parent;
  }

  return false;
}

function hasDescendantWithClassToken(node: ParsedNode, token: string): boolean {
  const className = node.attrs.class ?? '';
  const tokens = className.split(/\s+/).filter(Boolean);

  if (tokens.includes(token)) {
    return true;
  }

  for (const child of node.children) {
    if (hasDescendantWithClassToken(child, token)) {
      return true;
    }
  }

  return false;
}

function nodeHasClassToken(node: ParsedNode, token: string): boolean {
  const className = node.attrs.class ?? '';
  return className.split(/\s+/).filter(Boolean).includes(token);
}

function countDescendantsWithClassToken(node: ParsedNode, token: string): number {
  let count = nodeHasClassToken(node, token) ? 1 : 0;

  for (const child of node.children) {
    count += countDescendantsWithClassToken(child, token);
  }

  return count;
}

test('top grid cards and right panel logos render with the expected static layout', () => {
  const html = renderToStaticMarkup(<App />);
  const tree = parseHtml(html);
  const topGrid = findNodeByAttr(tree, 'data-top-grid', 'root');
  const leftColumn = findNodeByAttr(tree, 'data-top-grid-column', 'left');
  const rightColumn = findNodeByAttr(tree, 'data-top-grid-column', 'right');
  const rightPanel = findNodeByClassToken(tree, 'rounded-[40px]');

  assert.ok(topGrid, 'expected a top-grid root node');
  assert.ok(rightPanel, 'expected the right chat panel container');
  assert.ok(nodeHasClassToken(topGrid, 'xl:grid-cols-[minmax(0,_1.55fr)_minmax(0,_1fr)]'), 'expected the top grid to use the screenshot desktop columns');
  assert.ok(nodeHasClassToken(topGrid, 'xl:gap-5'), 'expected the top grid to use the screenshot desktop gap');
  assert.ok(leftColumn, 'expected a left desktop column');
  assert.ok(rightColumn, 'expected a right desktop column');
  assert.equal(
    countDescendantsWithClassToken(rightPanel, 'animate-float'),
    0,
    'expected the right chat panel logos to avoid floating animation',
  );

  const meditateShell = findNodeByAttr(tree, 'data-card-shell', 'meditate');
  const sleepShell = findNodeByAttr(tree, 'data-card-shell', 'sleep');
  const moveShell = findNodeByAttr(tree, 'data-card-shell', 'move');
  const musicShell = findNodeByAttr(tree, 'data-card-shell', 'music');

  assert.ok(meditateShell, 'expected the default active meditate shell');
  assert.equal(meditateShell.attrs['data-card-state'], 'active', 'expected meditate to be the active desktop card');
  assert.ok(!nodeHasClassToken(meditateShell, 'xl:scale-[1.1]'), 'expected the old desktop overlap scale to be removed');
  assert.ok(leftColumn && hasAncestorWithAttr(meditateShell, 'data-top-grid-column', 'left'), 'expected meditate in the left desktop column');

  assert.ok(sleepShell, 'expected an inactive sleep shell');
  assert.equal(sleepShell.attrs['data-card-state'], 'inactive', 'expected sleep to be inactive by default');
  assert.ok(!nodeHasClassToken(sleepShell, 'xl:scale-[0.92]'), 'expected inactive desktop overlap scale to be removed');
  assert.ok(rightColumn && hasAncestorWithAttr(sleepShell, 'data-top-grid-column', 'right'), 'expected sleep in the right desktop column');
  assert.ok(moveShell && hasAncestorWithAttr(moveShell, 'data-top-grid-column', 'left'), 'expected move in the left desktop column');
  assert.ok(musicShell && hasAncestorWithAttr(musicShell, 'data-top-grid-column', 'right'), 'expected music in the right desktop column');

  for (const cardId of ['meditate', 'sleep', 'move', 'music']) {
    const shell = findNodeByAttr(tree, 'data-card-shell', cardId);
    const visual = findNodeByAttr(tree, 'data-card-visual', cardId);
    const overlay = findNodeByAttr(tree, 'data-card-overlay', cardId);

    assert.ok(shell, `expected a shell node for ${cardId}`);
    assert.ok(nodeHasClassToken(shell, 'p-[2px]'), `expected ${cardId} shell to use smaller padding`);
    assert.ok(nodeHasClassToken(shell, 'sm:p-[3px]'), `expected ${cardId} shell to use smaller small-screen padding`);
    assert.equal(visual, undefined, `expected ${cardId} to avoid an extra visual wrapper`);
    assert.ok(overlay, `expected an overlay node for ${cardId}`);
    assert.ok(
      hasAncestorWithAttr(overlay, 'data-card-media', cardId),
      `expected ${cardId} overlay to be inside its media container`,
    );
    assert.ok(
      hasDescendantWithClassToken(overlay, 'text-gray-900'),
      `expected ${cardId} overlay title to use dark text`,
    );
  }

  const meditateArrow = findNodeByAttr(tree, 'data-card-arrow', 'meditate');

  assert.ok(meditateArrow, 'expected the meditate arrow overlay');
  assert.ok(
    hasAncestorWithAttr(meditateArrow, 'data-card-media', 'meditate'),
    'expected the meditate arrow to be inside the meditate media container',
  );

  assertImageIsNotBlended(tree, 'Sleep');
  assertImageIsNotBlended(tree, 'Move');
  assertImageIsNotBlended(tree, 'Music');
});
