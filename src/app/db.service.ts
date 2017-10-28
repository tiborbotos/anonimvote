import {Injectable} from '@angular/core';
import Gun from 'gun/gun';
import GunPath from 'gun/lib/path';

export interface Participant {
    id: number;
    name: string;
}

export interface Poll {
    id: string;
    creator: Participant;
    created: number;
    options: {};
}

export interface PollOptions {
    title: string;
    extendable: boolean;
    multiSelect: boolean;
    maxPointsPerOption: string;
}

@Injectable()
export class GunDb {
    readonly gun = Gun(location.origin + '/gun');
    private readonly path = GunPath;

    createPoll(participant: Participant) {
        return new Promise((resolve, reject) => {
            const id = Math.floor((1 + Math.random()) * 0x100000000).toString(36).substring(1),
                pollToStore = {};

            pollToStore[id] = {
                id,
                creator: participant,
                created: Date.now()
            };
            this.gun.get('polls').put(pollToStore, (ack) => {
                if (ack.err) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    }

    openPoll(pollId: string, user: Participant) {
        return new Promise((resolve, reject) => {
            this.gun.get('polls').path(pollId).val((poll) => {
                resolve(poll);
            });
        });
    }
}
