import {
    Injectable,
    OnModuleInit,
    OnModuleDestroy,
} from "@nestjs/common";

import{ PrismaClient } from "prisma/client";

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
    {
        async OnModuleInit(){
            await this.&connect();
            console.log ("Connected to PostgresSQL through Prisma.");
        }

        async OnModuleDestroy() {
            await this.$disconnect();
        }
    }

