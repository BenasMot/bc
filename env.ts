import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

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

export const env: Env = config();
