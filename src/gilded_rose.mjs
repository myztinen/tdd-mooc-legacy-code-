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
      if(this.items[i].name == "Sulfuras, Hand of Ragnaros" ) {
        this.updatQualityForSulfuras(i);
      } else if (this.items[i].name == "Aged Brie") {
        this.updateAgeBrieQuality(i);
      } else if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
        this.updateBackstagePassQuality(i);
      } else {
        this.updateQualityForNormalItems(i);
      }
    }
    return this.items;
  }

  updatQualityForSulfuras(i) {
    
  }
  
  updateAgeBrieQuality(i) {
    if (this.items[i].sellIn < 1) {
      this.increaseQuality(i, 2);
    } else this.increaseQuality(i);
    this.items[i].sellIn--;// = this.items[i].sellIn - 1;
  }

  updateBackstagePassQuality(i) {
    if (this.items[i].sellIn < 1) {
      this.items[i].quality = this.items[i].quality - this.items[i].quality;
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
    if (this.items[i].quality > 0) {
      this.reduceQuality(i);

      if (this.items[i].sellIn <= 0) {
        this.reduceQuality(i);
      }
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


