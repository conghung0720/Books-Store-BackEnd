import { Controller } from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';
import { Body, Post } from '@nestjs/common';
@Controller('chat-gpt')
export class ChatGptController {
  constructor(private chatGpt: ChatGptService) {}
  @Post()
  async displayTextChat(@Body() chat: Record<string, any>) {
    const textChat = await chat.textChat;
    if (textChat) {
      const getAnswer = await this.chatGpt.getText(chat.textChat);
      return await getAnswer.choices.at(0);
    }
    return {
      text: 'Trying again',
    };
  }
}
