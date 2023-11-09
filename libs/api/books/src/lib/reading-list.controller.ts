import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Book, ReadingListItem, AppConstants } from '@tmo/shared/models';
import { ReadingListService } from './reading-list.service';

@Controller()
export class ReadingListController {
  constructor(private readonly readingList: ReadingListService) {}

  @Get(AppConstants.API.PATH_GET_READING_LIST)
  async getReadingList() {
    return await this.readingList.getList();
  }

  @Post(AppConstants.API.PATH_GET_READING_LIST)
  async addToReadingList(@Body() item: Book) {
    return await this.readingList.addBook(item);
  }

  @Delete(AppConstants.API.PATH_DELETE_READING_LIST)
  async removeFromReadingList(@Param() params) {
    return await this.readingList.removeBook(params.id);
  }

  @Put(AppConstants.API.PATH_READING_COMPLETED)
  async markBookAsFinished(@Body() body): Promise<ReadingListItem> {
    return await this.readingList.markBookAsFinished(body);
  }
}