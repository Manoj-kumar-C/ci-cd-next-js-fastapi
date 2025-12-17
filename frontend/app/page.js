
"use client";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000/items";

export default function Home() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchItems = async () => {
    const res = await fetch(API_URL);
    setItems(await res.json());
  };

  const addItem = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    setName("");
    setDescription("");
    fetchItems();
  };

  const deleteItem = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">FastAPI CRUD</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={addItem}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="bg-white p-3 rounded shadow flex justify-between">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <button
              onClick={() => deleteItem(item.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
