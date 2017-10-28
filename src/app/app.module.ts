import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {EditorComponent} from './editor/editor.component';
import {EditorItemComponent} from './editor-item/editor-item.component';
import {AdminComponent} from './admin/admin.component';
import {VotingComponent} from './voting/voting.component';
import {GunDb} from './db.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        EditorComponent,
        EditorItemComponent,
        AdminComponent,
        VotingComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot()
    ],
    providers: [GunDb],
    bootstrap: [AppComponent]
})
export class AppModule {
}
