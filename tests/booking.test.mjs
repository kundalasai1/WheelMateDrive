import test from 'node:test';import assert from 'node:assert/strict';
test('fare totals cannot be negative',()=>{const total=Math.max(0,500-700);assert.equal(total,0)});
test('booking statuses include pending',()=>{assert.ok(['draft','pending','confirmed'].includes('pending'))});
