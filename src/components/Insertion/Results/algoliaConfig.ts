import { searchClient } from '@algolia/client-search';

const appID = import.meta.env.VITE_ANGOLIA_APP_ID;
const apiKey = import.meta.env.VITE_ANGOLIA_API_KEY;

export const algoliaClient = searchClient(appID, apiKey);
