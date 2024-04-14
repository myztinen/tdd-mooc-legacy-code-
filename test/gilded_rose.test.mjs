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
    const gildedRose = new Shop([new Item("Aged Brie", -1, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-2);
    expect(items[0].quality).to.equal(50);
  });

  test("Quality increases after sell in date has passed", () => {
    // Bug. Should be 5 after the update
    const gildedRose = new Shop([new Item("Aged Brie", -2, 4) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-3);
    expect(items[0].quality).to.equal(6);
  });
});

describe("Sulfuras, Hand of Ragnaros", () => {

  test("Sell in date is not updated after quality update", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 80) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(10);
  });

  test("Quality stays the same", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 80) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
  });

  test("Quality stays the same after sell in date", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 80) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
    expect(items[0].sellIn).to.equal(-1);
  });

});

describe("Backstage passes to a TAFKAL80ETC concert", () => {
  let pass = new Item("Backstage passes to a TAFKAL80ETC concert", 11, 25);
  let anotherPass = new Item("Backstage passes to a TAFKAL80ETC concert", 1, 25);
  let thirdPass = new Item("Backstage passes to a TAFKAL80ETC concert", 4, 49);
  let fouthPass = new Item("Backstage passes to a TAFKAL80ETC concert", 6, 30);

  const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 25)]);

  test("Quality increases by one when sell in date is greater than 10", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(10);
    expect(items[0].quality).to.equal(26);
  });

  test("Quality increases by two when sell in date is greater than 5 but less than 10", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(27);
  });

  test("Quality increases by three when sell in date is greater than 0 but less than 5", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(28);
  });

  test("Quality increases by one when sell in date is 6", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(5);
    expect(items[0].quality).to.equal(27);
  });

  test("Quality drops to zero when sell in date is 1", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(28);
  });

  test("Quality drops to zero when sell in date is 0", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });

  test("Quality drops to zero when sell in date is -1", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-2);
    expect(items[0].quality).to.equal(0);
  });

  test("Quality does not increase over 50 when sell in date is 10", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(50);
  });

  test("Quality does not increase over when sell in date is 5", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(5);
    expect(items[0].quality).to.equal(50);
  });

  test("Quality does not increase over 50 when sell in date is 11", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 3, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(2);
    expect(items[0].quality).to.equal(50);
  });

});



