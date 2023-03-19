
export async function getSummaries(urls: Array<string>) {
  //TODO: Hacky, better globally and statically set URL
  const endpoint = window.location.origin + '/api/summarize';

  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ urls: urls })
  });

  const summaries = response.json()

  return summaries;
}
