export interface ChatbotOptions {
    id: string;
    label: string;
    children?: ChatbotOptions[];
}

export interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  options?: ChatbotOptions[];
}

export interface ChatbotRequestDto {
  option: ChatbotOptions;
  subOption: ChatbotOptions;
  messageText: string;
}