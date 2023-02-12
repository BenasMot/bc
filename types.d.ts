declare module '@swensson/p2p' {
  type Callback = () => void;
  type NodeCallback = (data: { nodeId: string }) => void;
  type OriginCallback<T> = (data: { origin: string; message: T }) => void;

  type ConnectFn = (ip: string, port: number, callback?: Callback) => void;
  type ListenFn = (port: number, callback?: Callback) => void;
  type BroadcastFn = <T>(data: T) => void;
  type DirectFn = <T>(recipientId: string, data: T) => void;
  type CloseFn = (callback?: Callback) => void;

  type onConnectFn = (event: 'connect', callback?: NodeCallback) => void;
  type onDisconnectFn = (event: 'disconnect', callback?: NodeCallback) => void;
  type onBroadcastFn = <T>(
    event: 'broadcast',
    callback?: OriginCallback<T>,
  ) => void;
  type onDirectFn = <T>(event: 'direct', callback?: OriginCallback<T>) => void;
  type onEventFn = onConnectFn & onDisconnectFn & onBroadcastFn & onDirectFn;

  type Node = {
    listen: ListenFn;
    connect: ConnectFn;
    broadcast: BroadcastFn;
    direct: DirectFn;
    close: CloseFn;
    on: onEventFn;
  };
  type createp2pnodeFn = () => Node;

  const createp2pnode: createp2pnodeFn;

  export { Node, NodeCallback, OriginCallback };
  export default createp2pnode;
}
