import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatbotService } from '../../shared/service/chatbot-service';
import { ChatbotOptions, ChatbotRequestDto, ChatMessage } from '../../shared/interface/chatbot';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize, delay } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit, AfterViewChecked {
  @Input()
  isOpen = false;

  @ViewChild('chatBody', { static: false }) chatBody!: ElementRef;

  isInputBlocked: boolean = true;
  isWriting: boolean = false;

  messages: ChatMessage[] = [];
  chatOptions: ChatbotOptions[] = [];

  selectedOption?: ChatbotOptions;
  selectedSubOption?: ChatbotOptions;
  searchTerm = '';

  private ngAfterViewCheckedCalled = false;

  constructor(private chatbotService: ChatbotService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.chatbotService.initChatbot().subscribe(response => {

      this.chatOptions = response.data as unknown as ChatbotOptions[];

      this.messages.push({
        sender: 'bot',
        text: 'Hello! I am the NexusShop virtual assistant. How can I help you today? Choose one of the options below:',
        options: this.chatOptions
      });
      this.cdr.detectChanges();
      this.scrollToBottom();

    });
  }

  ngAfterViewChecked() {
    if (this.ngAfterViewCheckedCalled) {
      this.scrollToBottom();
    }
    this.ngAfterViewCheckedCalled = true;
  }

  selectOption(option: ChatbotOptions) {

    this.messages.push({
      sender: 'user',
      text: option.label
    });

    this.scrollToBottom();

    if (!option.children || option.children.length === 0) {
      this.messages.push({
        sender: 'bot',
        text: 'Please type the item you want to search for.'
      });
      this.isInputBlocked = false;
      this.selectedSubOption = option;

      this.cdr.detectChanges();
      this.scrollToBottom();
      return;
    }

    this.messages.push({
      sender: 'bot',
      text: 'Great! Now choose one of the options below:',
      options: option.children
    });
    this.selectedOption = option;

    this.cdr.detectChanges();
    this.scrollToBottom();
  }

  search() {
    this.messages.push({
      sender: 'user',
      text: this.searchTerm
    });

    this.scrollToBottom();

    const requestDto: ChatbotRequestDto = {
      option: this.selectedOption as ChatbotOptions,
      subOption: this.selectedSubOption as ChatbotOptions,
      messageText: this.searchTerm
    }

    this.isWriting = true;

    this.chatbotService.sendMessage(requestDto).pipe(
      delay(1000),
      finalize(() => {
        this.isWriting = false;
        this.cdr.detectChanges();
      })
    ).subscribe(response => {
      const data = response.data as any;

      this.messages.push({
        sender: 'bot',
        text: `${data.products[0]?.name}, ${data.products[0]?.description}, Price: ${data.products[0]?.price}`
      });
      this.cdr.detectChanges();
      this.scrollToBottom();
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

    for (const option of this.chatOptions) {
      message += `${index}- ${option.label}\n`;
      index++;
    }
    return message;
  }


  close() {
    this.isOpen = false;
  }

  private scrollToBottom(): void {
    if (this.chatBody?.nativeElement) {
      const el = this.chatBody.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }
}
