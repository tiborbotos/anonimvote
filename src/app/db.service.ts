import {Injectable} from '@angular/core';
import Gun from 'gun/gun';

@Injectable()
export class GunDb {
    readonly gun = Gun(location.origin + '/gun');

    createVote(name: string) {
        const vote = this.gun.get('votes').put({
            name
        });

        return vote;
    }
}
