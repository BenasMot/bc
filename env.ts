type EnvKey =
  | 'PORT'
  | 'ADDRESS'
  | 'MAX_PEERS'
  | 'PEERS'
  | 'NAME'
  | 'PRIVATE_KEY'
  | 'PUBLIC_KEY'
  | 'ENVIRONMENT';
type Env = {
  [key in EnvKey]?: string;
};

export const env: Env = Deno.env.toObject();
