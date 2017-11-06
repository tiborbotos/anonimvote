import {Injectable} from '@angular/core';
import Gun from 'gun/gun';
import GunPath from 'gun/lib/path';
import GunOpen from 'gun/lib/open';
import {IPromise} from 'q';

export interface User {
    id: number;
    name: string;
}

export interface Poll {
    id: string;
    creator: User;
    created: number;
    parameters: PollParameters;

    val: any;
}

export interface PollParameters {
    title: string;
    extendable: boolean;
    multiSelect: boolean;
    pointsPerOptionEnabled: boolean;
    maxPointsPerOption: string;
    options: any;
}

export interface PollOption {
    label: string;
    addedBy: User;
}

@Injectable()
export class GunDb {
    readonly gun; // location.origin + '/gun');
    private readonly open = GunOpen;
    private readonly path = GunPath;

    constructor() {
        this.gun = Gun();
    }

    createPoll(participant: User): Promise<Poll> {
        return new Promise((resolve, reject) => {
            const id = Math.floor((1 + Math.random()) * 0x100000000).toString(36).substring(1),
                pollToStore = {};

            pollToStore[id] = {
                id,
                creator: participant,
                created: Date.now(),
                parameters: {
                    title: 'Poll ' + id,
                    extendable: false,
                    multiSelect: false,
                    pointsPerOptionEnabled: false
                }
            } as Poll;

            this.gun.get('polls').put(pollToStore, (ack) => {
                if (ack.err) {
                    reject();
                } else {
                    resolve(pollToStore[id]);
                }
            });
        });
    }

    openPoll(pollId: string): Promise<Poll> {
        return new Promise((resolve) => {
            this.gun.get('polls').path(pollId).open((poll) => {
                resolve(poll);
            });
        });
    }

    addOption(pollId: string, option: any) {
        this.gun.get('polls').path(pollId + '.parameters.options').set(option);
    }

    getOptions(pollId: string, cb: (args) => void) {
        return this.gun.get('polls').path(pollId + '.parameters.options').map().val(cb);
    }
}
