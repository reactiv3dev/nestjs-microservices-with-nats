import { Controller, Inject } from "@nestjs/common";
import { ClientProxy, MessagePattern, Payload } from "@nestjs/microservices";
import { CreatePaymentDto } from "./dto/CreatePayment.dto";

@Controller()
export class PaymentsMicroservicesController{

    constructor(
        @Inject('NATS_SERVICE') private natsClient: ClientProxy
    ){}
    @MessagePattern({ cmd: 'create_payment' })
    handleCreatePayment(@Payload() createPaymentDto: CreatePaymentDto){
        this.natsClient.emit('created_payment', { userId: createPaymentDto.userId})
        return createPaymentDto;
    }
}