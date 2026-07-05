type A = Awaited<Promise<string>>; // A is of type Promise<string>
type B = Awaited<Promise<Promise<string>>>; // B is of type Promise<string>

interface IMenu {
    name: string;
    url: string;
}

async function getMenu(): Promise<IMenu[]> {
    return [{ name: 'Analytics', url: 'https://analytics.com'}]
}

type Menu = Awaited<ReturnType<typeof getMenu>>; // Menu is of type IMenu[]