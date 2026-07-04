type ReadOrWrite = 'read' | 'write';
type Bukl = 'bulk' | '';

type Access = `can${Capitalize<ReadOrWrite>}${Capitalize<Bukl>}`;

type ReadOrWriteBulk<T> = T extends `can${infer R}` ? R  : never;

type Access2 = ReadOrWriteBulk<Access>; 

type ErrorOrSuccess = 'error' | 'success';

type ResponseT = {
    result: `http${Capitalize<ErrorOrSuccess>}`;
}

const res2 : ResponseT = {
    result: 'httpSuccess'
}