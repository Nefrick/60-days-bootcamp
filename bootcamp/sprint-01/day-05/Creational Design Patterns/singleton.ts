class MyMap {

    private static instance: MyMap;

    map: Map<number, string> = new Map();

    private constructor() { }

    public static get(): MyMap {
        if (!MyMap.instance) {
            MyMap.instance = new MyMap();
        }
        return MyMap.instance;
    }

    clean(): void {
        this.map.clear();
    }
}

class Service {

   addMap(key: number, value: string): void {
        const myMap = MyMap.get();
        myMap.map.set(key, value);
    }
}

class Service2 {

   getKeys(key: number): string | undefined {
        const myMap = MyMap.get();
        console.log(myMap.map.get(key));
        myMap.clean();
        console.log(myMap.map.get(key));
        return myMap.map.get(key);
    }
}

new Service().addMap(1, 'one');
new Service2().getKeys(1);  
