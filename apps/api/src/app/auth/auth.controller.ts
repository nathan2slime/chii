import { Body, Controller, Get, HttpStatus, Patch, Post, Req, Res, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

import { AppRequest } from '~/app/app.types'
import { SignInDto, SignUpDto } from '~/app/auth/auth.dto'
import { JwtAuthGuard } from '~/app/auth/auth.guard'
import { AuthService } from '~/app/auth/auth.service'
import { JwtRefreshGuard } from '~/app/auth/refresh.guard'
import { AppConfig } from '~/config'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<AppConfig>
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200
  })
  async auth(@Req() req: AppRequest, @Res() res: Response) {
    console.log(req.user)

    return res.status(HttpStatus.OK).json(req.user)
  }

  @Post('signout')
  @ApiResponse({
    status: 200
  })
  @UseGuards(JwtAuthGuard)
  async signOut(@Req() req: AppRequest, @Res() res: Response) {
    const session = req.user
    await this.authService.signOut(session)
    return res.status(HttpStatus.OK).send()
  }

  @Patch('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiResponse({
    status: 200
  })
  async refresh(@Req() req: AppRequest, @Res() res: Response) {
    const session = req.user
    const { accessToken, refreshToken } = session

    res.cookie(
      this.configService.get('AUTH_COOKIE'),
      { accessToken, refreshToken },
      {
        httpOnly: true,
        expires: new Date(Date.now() + require('ms')(this.configService.get('REFRESH_TOKEN_EXPIRES_IN')))
      }
    )
    return res.status(HttpStatus.OK).json(session)
  }

  @Post('signin')
  @ApiResponse({ status: 200 })
  async signIn(@Body() body: SignInDto, @Res() res: Response) {
    const data = await this.authService.signIn(body)

    const { accessToken, refreshToken } = data

    res.cookie(
      this.configService.get('AUTH_COOKIE'),
      { accessToken, refreshToken },
      {
        httpOnly: true,
        expires: new Date(Date.now() + require('ms')(this.configService.get('REFRESH_TOKEN_EXPIRES_IN')))
      }
    )
    return res.status(HttpStatus.OK).json(data)
  }

  @Post('signup')
  @ApiResponse({ status: 200 })
  async signUp(@Body() body: SignUpDto, @Res() res: Response) {
    const data = await this.authService.signUp(body)

    const { accessToken, refreshToken } = data

    res.cookie(
      this.configService.get('AUTH_COOKIE'),
      { accessToken, refreshToken },
      {
        httpOnly: true,
        expires: new Date(Date.now() + require('ms')(this.configService.get('REFRESH_TOKEN_EXPIRES_IN')))
      }
    )
    return res.status(HttpStatus.OK).json(data)
  }
}
