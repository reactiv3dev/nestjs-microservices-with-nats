import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto } from "./dto/CreateUser.dto";


@Controller('users')
export class UsersController{

    constructor(
        @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy
    ){}
    @Get('/')
    getAll(){
        return [];
    }

    @Post('')
    async createUser(@Body() createUserDto: CreateUserDto){
        const newUser = this.natsClient.send({ cmd: 'create_user' }, createUserDto);
        return newUser;
    }
}