import React, { useState } from "react";
import { getProjectsByTitle, getProjectsBySkill } from "../services/api";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearchByTitle = async () => {
    if (!query.trim()) {
      setError("Please enter a project title");
      setProjects([]);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await getProjectsByTitle(query);
      setProjects(data?.length ? data : []);
      if (!data?.length) setError("No projects found for this title");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchBySkill = async () => {
    if (!query.trim()) {
      setError("Please enter a skill");
      setProjects([]);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await getProjectsBySkill(query);
      setProjects(data?.length ? data : []);
      if (!data?.length) setError("No projects found for this skill");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Search Projects</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter project title or skill"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={handleSearchByTitle}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          By Title
        </button>
        <button
          onClick={handleSearchBySkill}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          By Skill
        </button>
      </div>

      {/* Loading State */}
      {loading && <p className="text-gray-500">Searching...</p>}

      {/* Error or No Data */}
      {error && <p className="text-red-600 font-medium">{error}</p>}

      {/* Projects List */}
      <div className="grid gap-4 mt-4">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="p-4 border rounded shadow-sm bg-white hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg">{project.title}</h3>
            <p className="text-gray-600">{project.description}</p>
            <Link
              to={`/project/${project.title}`}
              className="text-blue-600 mt-2 block"
            >
              🔗 View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;