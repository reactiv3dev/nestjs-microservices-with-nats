import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/CreatePayment.dto";
import { ClientProxy } from "@nestjs/microservices";


@Controller('payments')
export class PaymentsController {

    constructor(
        @Inject('NATS_SERVICE') private natsClient: ClientProxy
    ){}
    @Post()
    createPayment(@Body() createPaymentDto: CreatePaymentDto){
        return this.natsClient.send({ cmd: 'create_payment' }, {...createPaymentDto, userId: 1 });
    }
}