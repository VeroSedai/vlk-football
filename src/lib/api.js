const JSONSERVER_DOMAIN = 'http://localhost:8000';

export async function getAllPlayers() {
  const response = await fetch(`${JSONSERVER_DOMAIN}/players`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quotes.');
  }

  return data;
}

export async function addPlayer(playerData) {
  const response = await fetch(`${JSONSERVER_DOMAIN}/players`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(playerData)
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create quote.');
  }

  return null;
}

export async function addMatch(matchData) {
  const response = await fetch(`${JSONSERVER_DOMAIN}/match`, {
    method: 'POST',
    body: JSON.stringify(matchData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add comment.');
  }

  return null;
}

export async function getAllMatch(quoteId) {
  const response = await fetch(`${JSONSERVER_DOMAIN}/comments/${quoteId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get comments.');
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
