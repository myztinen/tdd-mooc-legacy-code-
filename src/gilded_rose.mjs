export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if(this.items[i].name == "Sulfuras" ) {

      } else if (this.items[i].name == "Aged Brie") {
        this.updateAgeBrieQuality(i);
      } else if (this.items[i].name == "Backstage passes") {
        this.updateBackstagePassQuality(i);
      } else if (this.items[i].name == "Conjured") {
        this.updateConjuredQuality(i);
      } else {
        this.updateQualityForNormalItems(i);
      }
    }
    return this.items;
  }

  updateConjuredQuality(i) {
    this.reduceQuality(i, 2);
    if (this.items[i].sellIn < 1) {
      this.reduceQuality(i, 2);
    } 
    this.items[i].sellIn--;
  }
  
  updateAgeBrieQuality(i) {
    if (this.items[i].sellIn < 1) {
      this.increaseQuality(i, 2);
    } else this.increaseQuality(i);
    this.items[i].sellIn--;
  }

  updateBackstagePassQuality(i) {
    if (this.items[i].sellIn < 1) {
      this.items[i].quality = 0;
    }
    if (this.items[i].sellIn > 0) {
      this.increaseQuality(i);
      if (this.items[i].sellIn < 11) {
        this.increaseQuality(i);
      }
      if (this.items[i].sellIn < 6) {
        this.increaseQuality(i);
      }
    }
    this.items[i].sellIn--;
  }

  updateQualityForNormalItems(i) {
    this.reduceQuality(i);
    if (this.items[i].sellIn <= 0) {
      this.reduceQuality(i);
    }
  
    this.items[i].sellIn--;
  }

  reduceQuality(itemIndex, amount=1) {
    this.items[itemIndex].quality = Math.max(0, this.items[itemIndex].quality - amount);
  }

  increaseQuality(itemIndex, amount=1) {
    this.items[itemIndex].quality = Math.min(50, this.items[itemIndex].quality + amount);
  }
}


