import { Controller, Logger } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { CreatedPaytmentDto } from "./dto/CreatedPayment.dto";

@Controller()
export class UsersMicroserviceController{
    private readonly logger = new Logger(UsersMicroserviceController.name);
    @MessagePattern({ cmd: 'create_user' })
    handleCreateUser(@Payload() createUserDto: CreateUserDto){
        this.logger.debug(createUserDto);
        return "Ok";
    }

    @EventPattern('created_payment')
    handleCreatedPayment(@Payload() createdPaymentDto: CreatedPaytmentDto ){
        this.logger.debug(`Sending mail to user with id: ${createdPaymentDto.userId} about created payment!`)
    }
}