declare global {
  namespace Express {
    interface Request {
      requestId: string;
      auth?: {
        userId: string;
        email: string | null;
      };
      floworderAccess?: import("../floworder/floworder.types.js").FlowOrderAccess;
    }
  }
}

export {};
