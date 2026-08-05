import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ChatbotService } from '../../shared/service/chatbot-service';
import { ChatbotOptions, ChatbotRequestDto, ChatMessage } from '../../shared/interface/chatbot';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit {
  @Input()
  isOpen = false;

  isInputBlocked: boolean = true;

  messages: ChatMessage[] = [];
  chatOptions: ChatbotOptions[] = [];

  selectedOption?: ChatbotOptions;
  selectedSubOption?: ChatbotOptions;
  searchTerm = '';

  constructor(private chatbotService: ChatbotService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.chatbotService.initChatbot().subscribe(response => {

      this.chatOptions = response.data as unknown as ChatbotOptions[];

      this.messages.push({
        sender: 'bot',
        text: 'Olá! Eu sou o assistente virtual da NexusShop. Como posso ajudá-lo hoje? Escolha uma das opções abaixo:',
        options: this.chatOptions
      });
      this.cdr.detectChanges();

    });
  }

  selectOption(option: ChatbotOptions) {

    this.messages.push({
      sender: 'user',
      text: option.label
    });

    if (!option.children || option.children.length === 0) {
      this.messages.push({
        sender: 'bot',
        text: 'Por favor, digite o item que você deseja pesquisar.'
      });
      this.isInputBlocked = false;
      this.selectedSubOption = option;

      this.cdr.detectChanges();
      return;
    }

    this.messages.push({
      sender: 'bot',
      text: 'Perfeito! Agora escolha uma das opções abaixo:',
      options: option.children
    });
    this.selectedOption = option;

    this.cdr.detectChanges();
  }

  search() {
    this.messages.push({
      sender: 'user',
      text: this.searchTerm
    });

    const requestDto: ChatbotRequestDto = {
      option: this.selectedOption as ChatbotOptions,
      subOption: this.selectedSubOption as ChatbotOptions,
      messageText: this.searchTerm
    }

    //TODO: Add spinner or 'writing' status while the bot retrieves the response

    this.chatbotService.sendMessage(requestDto).subscribe(response => {
      const data = response.data as any;

      this.messages.push({
        sender: 'bot',
        text: `${data.products[0]?.name}, ${data.products[0]?.description}, Price: ${data.products[0]?.price}`
      });
      this.cdr.detectChanges();
    });

    this.searchTerm = '';
    this.selectedOption = undefined;
    this.selectedSubOption = undefined;
    this.isInputBlocked = true;
    this.cdr.detectChanges();
  }

  buildFirstMessage(): string {
    let message: string = '';
    let index: number = 1;

    console.log()
    for (const option of this.chatOptions) {
      message += `${index}- ${option.label}\n`;
      index++;
    }
    return message;
  }


  close() {
    this.isOpen = false;
  }
}
