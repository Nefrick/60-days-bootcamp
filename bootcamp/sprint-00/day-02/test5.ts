// ============================================================
//  МИКСИНЫ (mixins) в TypeScript
//  Идея: функция принимает класс и возвращает НОВЫЙ класс,
//  расширенный дополнительным поведением. Поведение можно
//  "подмешивать" в любой класс и комбинировать между собой.
// ============================================================

// Вспомогательный тип: "любой конструктор класса".
// new (...args: any[]) => T  — то, что можно вызвать через `new`.
type Constructor<T = {}> = new (...args: any[]) => T;

// --- Базовый класс, к которому будем подмешивать поведение ---
class UIComponent {
    constructor(public name: string) {}
}

// --- Миксин 1: List (список элементов) ---
// Добавляет классу коллекцию items и методы управления ею.
function Listable<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        items: string[] = [];

        addItem(item: string): void {
            this.items.push(item);
        }

        removeItem(item: string): void {
            this.items = this.items.filter(i => i !== item);
        }

        get count(): number {
            return this.items.length;
        }
    };
}

// --- Миксин 2: Accordion (раскрытие/сворачивание) ---
// Добавляет состояние isOpen и методы управления им.
function Accordionable<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        isOpen: boolean = false;

        open(): void {
            this.isOpen = true;
        }

        close(): void {
            this.isOpen = false;
        }

        toggle(): void {
            this.isOpen = !this.isOpen;
        }
    };
}

// --- Композиция: подмешиваем ОБА поведения к UIComponent ---
// Читается изнутри наружу: сначала Listable(UIComponent),
// потом Accordionable(...) оборачивает результат.
const ListAccordion = Accordionable(Listable(UIComponent));

// Теперь у menu есть ВСЁ сразу:
//  - name    (из UIComponent)
//  - items / addItem / removeItem / count  (из Listable)
//  - isOpen / open / close / toggle        (из Accordionable)
const menu = new ListAccordion("Main Menu");

menu.addItem("Home");
menu.addItem("About");
menu.addItem("Contacts");
menu.removeItem("About");
menu.toggle();

console.log("Name:", menu.name);
console.log("Items:", menu.items);
console.log("Count:", menu.count);
console.log("Is open:", menu.isOpen);

// Миксины можно применять и по отдельности:
const SimpleList = Listable(UIComponent);
const shoppingList = new SimpleList("Groceries");
shoppingList.addItem("Milk");
console.log("Shopping:", shoppingList.name, shoppingList.items);
