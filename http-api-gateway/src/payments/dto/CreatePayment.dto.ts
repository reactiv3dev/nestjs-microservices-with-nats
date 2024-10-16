import { IsNumber, Min, Max } from "class-validator";

 
 

export class CreatePaymentDto{
    @IsNumber()
    @Min(100)
    @Max(10000)
    amount: number;

}