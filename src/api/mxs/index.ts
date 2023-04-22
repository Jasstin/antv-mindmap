import data from './index.json';
export const getData = ()=>{
    return Promise.resolve(data);
}