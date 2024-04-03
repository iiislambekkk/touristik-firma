import {makeAutoObservable} from "mobx";

class AppStore {
    isAuth: boolean = false;
    isDarkMode: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(isAuth: boolean) {
        this.isAuth = isAuth;
    }

    setDarkMode(){
        this.isDarkMode = !this.isDarkMode;
    }
}

const appStore = new AppStore()

export {appStore};