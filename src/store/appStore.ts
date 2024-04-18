import {makeAutoObservable} from "mobx";

class AppStore {
    isAuth: boolean = false;
    userId: string = ""
    isDarkMode: boolean = false;
    isAdmin: boolean = false;
    user: User = {} as User;
    avatarPath: string = "";

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

    setIsAdmin(isAdmin: boolean) {
        this.isAdmin = isAdmin;
    }

    setAvatarPath(path: string) {
        this.avatarPath = path;
    }

    setDarkMode(){
        this.isDarkMode = !this.isDarkMode;
    }
}

const appStore = new AppStore()

export {appStore};