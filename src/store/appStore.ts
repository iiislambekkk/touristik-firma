import {makeAutoObservable} from "mobx";

class AppStore {
    isAuth: boolean = false;
    userId: string = ""
    isDarkMode: boolean = false;
    user: User = {} as User;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: User) {
        this.user = user;
    }

    setAuth(isAuth: boolean) {
        this.isAuth = isAuth;
    }

    setUserId(id: string) {
        this.userId = id;
    }

    setDarkMode(){
        this.isDarkMode = !this.isDarkMode;
    }
}

const appStore = new AppStore()

export {appStore};