
import { atom } from 'nanostores';

export const searchTerm = atom('');

export const setSearchTerm= (term:string)=>{
    searchTerm.set(term);
}

 export const getSearchTerm= ()=>{
    return searchTerm.get()
}
