"use strict";

var _MenuUtil = require("./MenuUtil");
describe('MenuUtil', function () {
  /* TEST CASES */

  // #region flattenMenu
  describe('flattenMenu', function () {
    test('empty menu', function () {
      // Declaration
      var menu = {
        items: []
      };
      // Execution
      var result = (0, _MenuUtil.flattenMenu)(menu);
      // Assertions
      expect(result).toEqual([]);
    });
  });
  // #endregion

  // #region flattenMenuItem
  describe('flattenMenuItem', function () {
    test('empty menu item', function () {
      // Declaration
      var menuItem = {};
      // Execution
      var result = (0, _MenuUtil.flattenMenuItem)([], menuItem);
      // Assertions
      expect(result).toEqual([{
        parents: [],
        item: menuItem
      }]);
    });
    test('one level menu', function () {
      // Declaration
      var menuItem1 = {
        name: 'item1'
      };
      var menuItem2 = {
        name: 'item2'
      };
      var menuItem = {
        name: 'item',
        items: [menuItem1, menuItem2]
      };
      // Execution
      var result = (0, _MenuUtil.flattenMenuItem)([], menuItem);
      // Assertions
      var parent = {
        parents: [],
        item: menuItem
      };
      var parent1 = {
        parents: [parent],
        item: menuItem1
      };
      var parent2 = {
        parents: [parent],
        item: menuItem2
      };
      expect(result).toEqual([parent, parent1, parent2]);
    });
    test('two level menu', function () {
      // Declaration
      var menuItem2 = {
        name: 'item2'
      };
      var menuItem1 = {
        name: 'item1',
        items: [menuItem2]
      };
      var menuItem = {
        name: 'item',
        items: [menuItem1]
      };
      // Execution
      var result = (0, _MenuUtil.flattenMenuItem)([], menuItem);
      // Assertions
      var parent = {
        parents: [],
        item: menuItem
      };
      var parent1 = {
        parents: [parent],
        item: menuItem1
      };
      var parent2 = {
        parents: [parent, parent1],
        item: menuItem2
      };
      expect(result).toEqual([parent, parent1, parent2]);
    });
  });
  // #endregion

  // #region buildMenuItemDef
  describe('buildMenuItemDef', function () {
    test('when sent a menu item', function () {
      // Declaration
      var parents = [];
      var menuItem = {
        name: 'name',
        icon: ['fas', 'vial'],
        description: 'description',
        items: []
      };
      // Execution
      var result = (0, _MenuUtil.buildMenuItemDef)(parents, menuItem);
      // Assertions
      expect(result.parents).toBe(parents);
      expect(result.name).toBe(menuItem.name);
      expect(result.description).toBe(menuItem.description);
      expect(result.icon).toBe(menuItem.icon);
      expect(result.items).toEqual([]);
    });
  });
  // #endregion
});