import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaServices } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {

  constructor(
    // private jwtTokenService: JwtService,
    private readonly prisma: PrismaServices
  ) {}

  async register(createRegisterAuthDto: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(createRegisterAuthDto.password, 10);
      const users = await this.prisma.user.create({
        data: {
          email: createRegisterAuthDto.email,
          username: createRegisterAuthDto.username,
          name: createRegisterAuthDto.name,
          password: hashedPassword,
          role: createRegisterAuthDto.role || 'USER',
        },
        select: {
          id: true,
          email: true,
          username: true,
          name: true,
          role: true,
        },
      })
      return {
        data: users,
        message: 'User registered successfully',
        status: 'success',
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email or Username already exists');
        } else if (error.code === 'P2025') {
          throw new ConflictException('Related record not found');
        }
      }
      throw error
    }
  }

  login(loginDto: LoginDto) {
    return { message: 'Login successful'}
  }

  async getAllUser(userId: string) {

    const currentUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if(!currentUser || currentUser.role !== 'ADMIN') {
      throw new ConflictException("Access denied. Admins only.");
    }

    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        role: true,
        created_at: true,
        updated_at: true,
      }
    })

    return {
      data: users,
      message: 'Success get all user data',
      status: 200,
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number,) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
