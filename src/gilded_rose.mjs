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
        
      } else {
        if (this.items[i].name != "Aged Brie" && this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
          if ( this.items[i].quality > 0) {
            this.reduceQuality(i);
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
            if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
              if (this.items[i].sellIn < 11 && this.items[i].quality < 50) {
                this.increaseQuality(i);
              }
              if (this.items[i].sellIn < 6) {
                if (this.items[i].quality < 50) {
                  this.increaseQuality(i);
                }
              }
            }
          }
        }
        this.items[i].sellIn = this.items[i].sellIn - 1;
        if (this.items[i].sellIn < 0) {
          if (this.items[i].name != "Aged Brie") {
            if (this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
              if (this.items[i].quality > 0) {
                this.reduceQuality(i);
              }
            } else {
              this.items[i].quality = this.items[i].quality - this.items[i].quality;
            }
          } else {
            if (this.items[i].quality < 50) {
              this.increaseQuality(i);
            }
          }
        }
      }
    }
    return this.items;
  }
  
  reduceQuality(itemIndex, amount=1) {
    this.items[itemIndex].quality = this.items[itemIndex].quality - amount;
  }

  increaseQuality(itemIndex, amount=1) {
    this.items[itemIndex].quality = this.items[itemIndex].quality + amount;
  }
}
