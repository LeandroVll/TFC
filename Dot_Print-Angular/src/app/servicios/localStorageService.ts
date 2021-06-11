import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  constructor() { }

    set(key: string, data: any): void{
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.log(e)
        }
    }
    get(key: string): any{
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.log(e)
        }
    }
    remove(key: string): void{
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.log("ERROR BORRANDO EL OBJETO-->",key)
            console.log("ERROR-->",e)
        }
    }
    clear(): void{
        try {
            localStorage.clear();
        } catch (e) {
            console.log("ERROR LIMPIANDO LOCALSTORAGE-->",e)
        }
    }
}