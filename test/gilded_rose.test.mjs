import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";


describe("For random Item in store", () => {
  let randomi = new Item("Random", 2, 3);
  const gildedRose = new Shop([randomi]);

  test("Items have properties", () => {
    expect(gildedRose.items[0].name).to.equal("Random");
    expect(gildedRose.items[0].sellIn).to.equal(2);
    expect(gildedRose.items[0].quality).to.equal(3);
    expect(gildedRose.items).to.contain(randomi);

  });
});

describe("Store", () => {

  test("Can be initialized with empty array", () => {
    const gildedRose = new Shop([]);
    expect(gildedRose).to.have.property("items");
    expect(gildedRose.items).to.deep.equal([]);
    expect(gildedRose.items.length).to.equal(0);
  });

  test("Can be initialized without any paramaters", () => {
    const gildedRose = new Shop();
    expect(gildedRose.items).to.deep.equal([]);
    expect(gildedRose.items.length).to.equal(0);
  });

  test("Can be initialized with one item", () => {
    const gildedRose = new Shop([new Item("Random", 0, 0)]);
    expect(gildedRose.items).to.deep.equal([new Item("Random", 0, 0)]);
    expect(gildedRose.items.length).to.equal(1);
  });

  test("Can be initialized with many items", () => {
    let items = [new Item("Random", 0, 0), new Item("Random", 0, 0) , new Item("Random", 0, 0)];
    const gildedRose = new Shop(items);
    expect(gildedRose.items).to.deep.equal(items);
    expect(gildedRose.items.length).to.equal(3);
  });
  
  
});

describe("For normal items in store after updating quality", () => {

  test("Quality does not degrade under 0", () => {
    const gildedRose = new Shop([new Item("Random", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  test("items degrade twice as fast on sell inn date ", () => {
    const gildedRose = new Shop([ new Item("Expensive", 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(48);
  });

  test("items degrade twice as fast after sell inn date ", () => {
    const gildedRose = new Shop([ new Item("Expensive", -1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(48);
  });

  test("items degrade normally", () => {
    const gildedRose = new Shop([new Item("Random", 2, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(2);
  });

  test("items sell in date is reduced", () => {
    const gildedRose = new Shop([new Item("Random", 2, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(1);
  });

});


describe("Aged Brie", () => {
  test("Sell in date is updated normally", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(1);
    expect(items[0].quality).to.equal(1);
  });

  test("Quality increases after sell in date", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 49) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(50);
  });

  test("Quality does not go over 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 1) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(1);
    expect(items[0].quality).to.equal(2);
  });

  test("Quality does not go over 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 1) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(2);
  });


  test("Quality does not go over 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-2);
    expect(items[0].quality).to.equal(50);
  });

  test("Quality increases after sell in date has passed", () => {
    const gildedRose = new Shop([new Item("Aged Brie", -2, 4) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-3);
    expect(items[0].quality).to.equal(6);
  });
});

describe("Sulfuras", () => {

  test("Sell in date is not updated after quality update", () => {
    const gildedRose = new Shop([new Item("Sulfuras", 10, 80) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(10);
  });

  test("Quality stays the same", () => {
    const gildedRose = new Shop([new Item("Sulfuras", 1, 80) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
  });

  test("Quality stays the same after sell in date", () => {
    const gildedRose = new Shop([new Item("Sulfuras", -1, 80) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
    expect(items[0].sellIn).to.equal(-1);
  });

});

describe("Backstage passes", () => {
  let pass = new Item("Backstage passes", 11, 25);
  let anotherPass = new Item("Backstage passes", 1, 25);
  let thirdPass = new Item("Backstage passes", 4, 49);
  let fouthPass = new Item("Backstage passes", 6, 30);

  const gildedRose = new Shop([new Item("Backstage passes", 11, 25)]);

  test("Quality increases by one when sell in date is greater than 10", () => {
    const gildedRose = new Shop([new Item("Backstage passes", 11, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(10);
    expect(items[0].quality).to.equal(26);
  });

  test("Quality increases by two when sell in date is greater than 5 but less than 10", () => {
    const gildedRose = new Shop([new Item("Backstage passes", 10, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(27);
  });

  test("Quality increases by three when sell in date is greater than 0 but less than 5", () => {
    const gildedRose = new Shop([new Item("Backstage passes", 5, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(28);
  });

  test("Quality increases by one when sell in date is 6", () => {
    const gildedRose = new Shop([new Item("Backstage passes", 6, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(5);
    expect(items[0].quality).to.equal(27);
  });

  test("Quality drops to zero when sell in date is 1", () => {
    const gildedRose = new Shop([new Item("Backstage passes", 1, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(28);
  });

  test("Quality drops to zero when sell in date is 0", () => {
    const gildedRose = new Shop([new Item("Backstage passes", 0, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });

  test("Quality drops to zero when sell in date is -1", () => {
    const gildedRose = new Shop([new Item("Backstage passes", -1, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-2);
    expect(items[0].quality).to.equal(0);
  });

  test("Quality does not increase over 50 when sell in date is 10", () => {
    const gildedRose = new Shop([new Item("Backstage passes", 10, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(50);
  });

  test("Quality does not increase over when sell in date is 5", () => {
    const gildedRose = new Shop([new Item("Backstage passes", 6, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(5);
    expect(items[0].quality).to.equal(50);
  });

  test("Quality does not increase over 50 when sell in date is 11", () => {
    const gildedRose = new Shop([new Item("Backstage passes", 3, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(2);
    expect(items[0].quality).to.equal(50);
  });

});

describe("Conjured", () => {

  test("Sell in date drops by one", () => {
    const gildedRose = new Shop([new Item("Conjured", 10, 40) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
  });

  test("Quality reduces by 2 when sell in date is greater than 0", () => {
    const gildedRose = new Shop([new Item("Conjured", 1, 40) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(38);
  });

  test("Quality reduces by 4 when sell in date is 0 or less", () => {
    const gildedRose = new Shop([new Item("Conjured", 0, 40) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(36);
    expect(items[0].sellIn).to.equal(-1);
  });

  test("Quality reduces cannot be smaller than 0", () => {
    const gildedRose = new Shop([new Item("Conjured", -2, 3) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(-3);
  });

});


