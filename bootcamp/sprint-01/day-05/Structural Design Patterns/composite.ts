abstract class DeliveryItem {
    items: DeliveryItem[] = [];

    addItem(item: DeliveryItem): void {
        this.items.push(item);
    }

    abstract getPrice(): number;

    getItemPrices(): number {
        return this.items.reduce((total: number, item: DeliveryItem) => total += item.getPrice(), 0);
    }
}

export class DeliveryShop extends DeliveryItem {
    constructor(private deliveryFee: number) {
        super();
    }

    getPrice(): number {
        return this.getItemPrices() + this.deliveryFee;
    }
}

export class Package extends DeliveryItem {

    getPrice(): number {
        return this.getItemPrices();
    }
}

export class Product extends DeliveryItem {
    constructor(private price: number) {
        super();
    } 

    getPrice(): number {
        return this.price;
    }
}

const shop = new DeliveryShop(10);
const package1 = new Package();
console.log(shop.getPrice()); // 10
package1.addItem(new Product(20));
package1.addItem(new Product(30));
console.log(package1.getPrice()); // 50
shop.addItem(package1);

console.log(shop.getPrice()); // 60