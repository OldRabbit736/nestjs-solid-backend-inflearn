import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/service/auth.service';
import { CatValidatedDto } from 'src/auth/dto/cat.validated.dto';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { multerOptions } from 'src/common/utils/multer.options';
import { CatsService } from '../service/cats.service';
import { CreateCatRequestDto } from '../dto/create.cat.request.dto';
import { CreateCatResponseDto } from '../dto/create.cat.response.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat: CatValidatedDto) {
    return cat;
  }

  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  @ApiResponse({
    status: 201,
    description: '성공',
    type: CreateCatResponseDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  signUp(@Body() body: CreateCatRequestDto): Promise<CreateCatResponseDto> {
    return this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  // frontend에서 jwt만 없애면 로그아웃과 마찬가지이므로 이 end point는 backend에서는 필요 없다.
  // @ApiOperation({ summary: '로그아웃' })
  // @Post('logout')
  // logOut() {
  //   return 'logout';
  // }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: CatValidatedDto,
  ) {
    return this.catsService.uploadImg(cat, files);
  }
}
