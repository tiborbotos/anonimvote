import {Component} from '@angular/core';
import {GunDb} from './db.service';

enum AppMode {
    WELCOME,
    CREATOR
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    mode = AppMode.WELCOME;
    roomId = '';

    constructor(private gunDb: GunDb) {}

    isCurrentModeWelcome() {
        return this.mode === AppMode.WELCOME;
    }

    isCurrentModeCreator() {
        return this.mode === AppMode.CREATOR;
    }

    createVote() {
        this.mode = AppMode.CREATOR;
    }
}
