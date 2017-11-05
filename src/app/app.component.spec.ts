import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {GunDb} from './db.service';
import {NgbAlertModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';

class MockGunDb {
}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                NgbAlertModule,
                NgbTabsetModule
            ],
            declarations: [
                AppComponent,
                GunDb
            ],
            providers: [{provide: GunDb, useClass: MockGunDb}]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    xit(`should have as title 'Anonym Poll'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toContain('Anonym Poll');
    }));

    xit('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Anonymvote');
    }));
});
