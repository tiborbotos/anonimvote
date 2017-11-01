import {Injectable} from '@angular/core';
import Gun from 'gun/gun';
import GunPath from 'gun/lib/path';
import {IPromise} from 'q';

export interface Participant {
    id: number;
    name: string;
}

export interface Poll {
    id: string;
    creator: Participant;
    created: number;
    options: PollOptions;

    val: any;
}

export interface PollOptions {
    title: string;
    extendable: boolean;
    multiSelect: boolean;
    pointsPerOptionEnabled: boolean;
    maxPointsPerOption: string;
}

@Injectable()
export class GunDb {
    readonly gun = Gun(); // location.origin + '/gun');
    private readonly path = GunPath;

    createPoll(participant: Participant): Promise<Poll> {
        return new Promise((resolve, reject) => {
            const id = Math.floor((1 + Math.random()) * 0x100000000).toString(36).substring(1),
                pollToStore = {};

            pollToStore[id] = {
                id,
                creator: participant,
                created: Date.now(),
                options: {
                    title: 'Poll ' + id,
                    extendable: false,
                    multiSelect: false,
                    pointsPerOptionEnabled: false
                }
            } as Poll;

            console.log('pollToStore', pollToStore);
            this.gun.get('polls').put(pollToStore, (ack) => {
                if (ack.err) {
                    reject();
                } else {
                    resolve(pollToStore[id]);
                }
            });
        });
    }

    openPoll(pollId: string, user: Participant): Promise<Poll> {
        return new Promise((resolve) => {
            this.gun.get('polls').path(pollId).val((poll) => {
                this.gun.get('polls').path(pollId + '.options').val((pollOptions) => {
                    poll.options = pollOptions;
                    resolve(poll);
                });
            });
        });
    }
}
