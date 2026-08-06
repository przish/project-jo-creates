"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Graphic Design");
  const [completedAt, setCompletedAt] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving...");

    const { error } = await supabase.from("commissions").insert([
      {
        title,
        category,
        completed_at: completedAt,
      },
    ]);

    if (error) {
      setStatus(`Error: ${error.message}`);
    } else {
      setStatus("Commission recorded successfully!");
      setTitle("");
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-xl shadow-md border">
      <h1 className="text-2xl font-bold mb-4">Add Delivered Commission</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">
            Project Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g., Lumina Studio Logo"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option>Cover Page</option>
            <option>Profile Page Template</option>
            <option>Background Template</option>
            <option>Resume</option>
            <option>Advertisement Poster</option>
            <option>Digital Collage Design</option>
            <option>Graphic Design</option>
            <option>Multiple-Page Design with Cover Page</option>
            <option>Simple-page Design</option>
            <option>Commission Sheet</option>
            <option>Editorial Page Design</option>
            <option>Class Schedule Wallpaper</option>
            <option>Restaurant Menu Design</option>
            <option>Infographics</option>
            <option>Flyer</option>
            <option>Brochures</option>
            <option>Magazine</option>
            <option>Business / Calling Card</option>
            <option>Product Packaging Template with Label Stickers</option>
            <option>Business Logo</option>
            <option>Business Profile Picture</option>
            <option>Campus Publication Material</option>
            <option>K-POP Visual Banners</option>
            <option>X / Twitter Header</option>
            <option>Laptop Wallpaper Design</option>
            <option>Video Edits</option>
            <option>Other / Consultation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Completion Date
          </label>
          <input
            type="date"
            required
            value={completedAt}
            onChange={(e) => setCompletedAt(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
        >
          Add to Heatmap
        </button>

        {status && <p className="text-sm mt-2 text-center">{status}</p>}
      </form>
    </div>
  );
}
