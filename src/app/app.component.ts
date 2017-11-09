import {Component} from '@angular/core';
import {GunDb, PollParameters, User, Poll, PollOption} from './db.service';

enum AppMode {
    OPEN_POLL,
    CREATOR,
    LOGIN
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    pollId = 'dpzoee';
    errorMessage = '';
    currentUser: User;
    pollParameters: PollParameters;
    pollOptions: Array<PollOption>;
    newOption: PollOption;

    private mode = AppMode.OPEN_POLL;
    private poll: Poll = null;

    constructor(private gunDb: GunDb) {
        this.currentUser = {
            name: 'Anonym User ' + Math.ceil(Math.random() * 100 + 10),
            id: Math.random() * 10000000
        };
    }

    isCurrentModeOpenPoll() {
        return this.mode === AppMode.OPEN_POLL;
    }

    isCurrentModeCreator() {
        return this.mode === AppMode.CREATOR;
    }

    isValidRoom() {
        return this.pollId.match('^[a-z,A-Z,0-9]{6,6}$');
    }

    isPollLoaded() {
        return this.poll !== null;
    }

    // creates a new poll instance
    createPoll() {
        this.gunDb.createPoll(this.currentUser)
            .then(this.enterPoll.bind(this))
            .catch(() => {
                this.errorMessage = 'An error occurred and we couldn\'t create this poll';
            });
    }

    // connects to an existing poll
    openPoll() {
        this.gunDb.openPoll(this.pollId)
            .then(this.enterPoll.bind(this))
            .catch(() => {
                this.errorMessage = 'An error occurred and we couldn\'t connect to this poll';
            });
    }

    addNewOption(newOption: PollOption) {
        newOption.addedByName = this.currentUser.name;
        newOption.addedById = this.currentUser.id;
        newOption.id = this.pollOptions.length + 1;

        this.gunDb.addOption(this.pollId, newOption);
        this.newOption = {} as PollOption;
    }

    private enterPoll(poll) {
        this.mode = AppMode.CREATOR;
        this.poll = poll;
        this.pollParameters = this.poll.parameters;
        this.newOption = {} as PollOption;

        // load options
        this.pollOptions = [];
        this.gunDb.getOptions(this.pollId, (result) => {
            console.log('Options changed ', result);

            const existingOption = this.pollOptions.find((pollOption) => pollOption.id === result.id);
            if (!existingOption) {
                this.pollOptions.push(result);
            } else {
                existingOption.label = result.label;
            }
        });
    }
}
