export type NotificationChannel = "email" | "line" | "webhook";

export interface NotificationRequest {
  organizationId: string;
  channel: NotificationChannel;
  recipient: string;
  template: string;
  variables: Readonly<Record<string, string>>;
}

export interface NotificationProvider {
  send(request: NotificationRequest): Promise<{ providerMessageId: string }>;
}
