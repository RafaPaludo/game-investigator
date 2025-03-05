export interface SocketApiResponse {
  status: "success" | "error",
  message: string,
  data: {
    roomCode?: string,
    players?: []
  }
}