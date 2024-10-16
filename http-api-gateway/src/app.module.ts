import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers:[`nats://${process.env.NATS_SERVER_ADDRESS}`]
        }
      }
    ])
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
