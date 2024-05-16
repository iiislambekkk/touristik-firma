import {makeAutoObservable} from "mobx";
import {HubConnection} from "@microsoft/signalr";

class AppStore {
    isAuth: boolean = false;
    userId: string = ""
    isDarkMode: boolean = false;
    isAdmin: boolean = false;
    user: User = {} as User;
    avatarPath: string = "";
    connection: HubConnection = {} as HubConnection;
    isNotifyActive: boolean = false;
    refreshComments: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: User) {
        this.user = user;
    }

    setIsNotifyActive(isNA: boolean) {
        this.isNotifyActive = isNA;
    }

    setAuth(isAuth: boolean) {
        this.isAuth = isAuth;
    }

    setRefreshComments(isRefreshNeeded: boolean) {
        this.refreshComments = isRefreshNeeded;
    }

    setUserId(id: string) {
        this.userId = id;
    }

    setConnection(connection: HubConnection) {
        this.connection = connection;
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