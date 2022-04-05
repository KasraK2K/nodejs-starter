export interface IFirebaseSendMessage {
  id: string;
  notification?: {
    title: string;
    body: string;
    icon?: string;
    image?: string;
  };
  data?: {
    [key: string]: any;
  };
}
