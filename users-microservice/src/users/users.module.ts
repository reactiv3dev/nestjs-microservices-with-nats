import { Module } from "@nestjs/common";
import { UsersMicroserviceController } from "./users-microservice.controller";

@Module({
    imports: [],
    controllers: [UsersMicroserviceController],
    providers: []
})
export class UsersModule{}