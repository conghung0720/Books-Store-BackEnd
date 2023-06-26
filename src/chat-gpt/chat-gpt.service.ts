import { Injectable } from '@nestjs/common';
const { Configuration, OpenAIApi } = require('openai');
@Injectable()
export class ChatGptService {
  async getText(textChat: string) {
    const configuration = new Configuration({
    });
    const openai = await new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${textChat}`,
      temperature: 0,
      max_tokens: 1000,
    });
    return response.data;
  }
}
