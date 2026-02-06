import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaServices } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // JwtModule.register({
    //   secret: `${process.env.JWT_SECRET}`,
    //   signOptions: { expiresIn: "1d" },
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaServices],
})
export class AuthModule {}
