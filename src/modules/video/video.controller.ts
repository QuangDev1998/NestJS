import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import VideoService from './video.service';

@Controller(`video`)
export default class VideoController {
  constructor(public videoService: VideoService) {}

  @Get(`video-list`)
  async getListVideo(
    @Query()
    query: any,

    @Query(`page`)
    page: string,

    @Query(`pageSize`)
    pageSize: string,
  ) {
    console.log({ query });
    console.log({ page, pageSize });
    const result = await this.videoService.getListVideo(query);
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
