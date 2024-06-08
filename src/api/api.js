const FIREBASE_DOMAIN = import.meta.env.VITE_FIREBASE_DOMAIN;

export async function addItem(requestData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/items.json`, {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Could not add item.");
  }

  const data = await response.json();
  console.log("Item added:", data);
  return data;
}

export async function getItems() {
  const response = await fetch(`${FIREBASE_DOMAIN}/items.json`);

  if (!response.ok) {
    throw new Error("Could not fetch items.");
  }

  const data = await response.json();
  const transformedItems = Object.entries(data).map(([id, item]) => ({
    id,
    ...item,
  }));
  return transformedItems;
}

export async function editItem(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/items/${requestData.itemID}.json`,
    {
      method: "PATCH",
      body: JSON.stringify(requestData.item),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(data.message || "Could not create quote.");
  }
  const data = await response.json();

  return;
}

export async function deleteItem(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/items/${requestData.itemID}.json`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Could not delete.");
  }

  return null;
}
