import { Module } from "@nestjs/common";
import { PaymentsMicroservicesController } from "./payments.controller";
import { NatsClientModule } from "src/nats-client/nats-client.module";


@Module({
    imports: [NatsClientModule],
    controllers: [PaymentsMicroservicesController],
    providers:[]
})
export class PaymentsModule{}