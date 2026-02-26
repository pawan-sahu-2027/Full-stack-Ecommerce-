var test = require('tape');
var jsone = require('../');

test('single identifier', function(t) {
  t.plan(3);
  t.deepEqual(jsone.parse('name'), ['name']);
  t.deepEqual(jsone.parse('homePhone'), ['homePhone']);
  t.deepEqual(jsone.parse('$'), ['$']);
});

test('dotted', function(t) {
  t.plan(1);
  t.deepEqual(jsone.parse('location.city'), ['location', 'city']);
});

test('bracket', function(t) {
  t.plan(1);
  t.deepEqual(jsone.parse("[0]"), [0]);
});

test('combined', function(t) {
  t.plan(1);
  t.deepEqual(jsone.parse("employees[0]"), ['employees', 0]);
});

