import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./schemas/blockContent";
import event from "./schemas/event";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, blockContent],
};
