export class Media {
    private _title: string;
    private _username: string;

    constructor(title: string, username: string) {
        this._title = title;
        this._username = username;
    }

    get title(): string {
        return this._title;
    }

    get username(): string {
        return this._username;
    }
}