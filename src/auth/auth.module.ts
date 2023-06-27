import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config'
import { JwtAuthGuard } from './decorator/guards/jwt-guard';
import { RolesGuard } from './decorator/guards/roles.guard';
import { JwtStrategy } from './decorator/guards/jwt-strategy';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '24h' }
      })
    })],
  providers: [AuthService, JwtAuthGuard, RolesGuard, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
