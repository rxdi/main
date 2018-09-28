import { NgModule } from "@angular/core";
import { ServerService } from "./services/server/server.service";

@NgModule({
    providers: [
        ServerService
    ]
})
export class CoreModule {}