Nestjs Microservices With NATS

1. Generate nest http-api-gateway and install 2 main packages:
```
nest new http-api-gateway
cd http-api-gateway
pnpm add @nestjs/microservices nats
```

2. In http-api-gateway main app module, we need to register NATS as service module:
```ts
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

```

3. Prepare for Dockerization by makeing Dockerfile and .dockerignore,
and add next configuration into `tsconfig.json`
```
 "watchOptions": {
    "watchFile": "dynamicPriorityPolling",
    "watchDirectory": "dynamicPriorityPolling",
    "excludeDirectories": ["**/node_modules","dist"]
  }
```

4. Initialize the  same way microservices i.e. users-microservice and payments-microservice, install same packages, make cleanup, and setup in main modules as microservices without listening to port and  with next factory method:
```ts
const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [`nats://${process.env.NATS_SERVER_ADDRESS}`]
      }
    }
  );
  await app.listen();
```

5. In the root directory of project create `docker-compose.yaml` file with 
instructions how to build app all containers and with defined volumes so hot-relead is working on `./src` directory files change from our code editor:
```yaml
services:
  http-api-gateway:
    build: ./http-api-gateway
    ports: 
      - 3000:3000
    volumes:
      - ./http-api-gateway/src:/app/src
    command: pnpm start:dev
  
  users_microservice:
    build: ./users-microservice
    volumes: 
      - ./users-microservice/src:/app/src
    command: pnpm start:dev

  payments_microservice:
    build: ./payments-microservice
    volumes:
      - ./payments-microservice/src:/app/src
    command: pnpm start:dev
  
  nats:
    image: nats
    ports:
      - 4222:4222
    
```