import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import VideoService from './video.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResponseSuccess } from '../../common/decorators/reponse-success.decorator';

@Controller(`video`)
export default class VideoController {
  constructor(protected videoService: VideoService) {}
  @ResponseSuccess(`Lấy list video thành công`)
  @Get(`video-list`)
  @ApiBearerAuth()
  async getListVideo(
    @Query()
    query: any,

    @Query(`page`)
    page: string,

    @Query(`pageSize`)
    pageSize: string,
    @Req()
    req: Request,
  ) {
    const result = await this.videoService.getListVideo(req, query);
    return result;
  }
  @Get(`video-detail/:id`)
  async videoDetail(
    @Param()
    param: any,
    @Param(`id`)
    id: string,
    @Headers()
    header: any,
  ) {
    console.log({ param, id });
    console.log({ header });

    return await this.videoService.videoDetail(id);
  }
  @Post(`video-create`)
  async createVideo(
    @Body()
    body: any,
  ) {
    console.log({ body });
    return `createVideo`;
  }
}
