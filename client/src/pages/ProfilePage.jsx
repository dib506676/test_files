import React, { useState, useEffect } from "react";
import {
  getProfile,
  createOrUpdateProfile,
} from "../services/api";
import { Edit2, Mail, Book, Briefcase, Code, Link2, Plus } from "lucide-react";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    education: "",
    skills: [],
    projects: [],
    work: [],
    links: {},
  });

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    techStack: [],
    links: [],
  });

  useEffect(() => {
    (async () => {
      const data = await getProfile();
      setProfile(data);
      setForm(data || {});
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await createOrUpdateProfile(form);
    setProfile(updated);
    setShowForm(false);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const updatedProjects = [...(profile.projects || []), projectForm];
    const updated = await createOrUpdateProfile({
      ...profile,
      projects: updatedProjects,
    });
    setProfile(updated);
    setShowProjectForm(false);
    setProjectForm({ title: "", description: "", techStack: [], links: [] });
  };

  if (!profile) return <p className="p-6 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-10">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center relative">
          <button
            onClick={() => setShowForm(true)}
            className="absolute top-5 right-5 text-blue-600 hover:text-blue-800"
          >
            <Edit2 size={20} />
          </button>
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-md mb-4">
            {profile.name?.charAt(0)}
          </div>
          <h2 className="text-4xl font-extrabold mb-2 text-gray-900">
            {profile.name}
          </h2>
          <p className="flex items-center gap-2 text-gray-600">
            <Mail size={16} /> {profile.email}
          </p>
          <p className="flex items-center gap-2 mt-2 text-gray-700">
            <Book size={16} /> {profile.education}
          </p>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-semibold mb-5 flex items-center gap-2 text-blue-700">
            <Code size={20} /> Skills
          </h3>
          <div className="flex flex-wrap gap-3">
            {profile.skills.map((s, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-sm hover:bg-blue-200 transition"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Work Experience */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-semibold mb-5 flex items-center gap-2 text-blue-700">
            <Briefcase size={20} /> Work Experience
          </h3>
          <div className="space-y-4">
            {profile.work?.map((job, i) => (
              <div
                key={i}
                className="p-5 border border-gray-200 rounded-xl shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50"
              >
                <p className="font-semibold text-lg text-gray-900">
                  {job.role}{" "}
                  <span className="text-blue-700">@ {job.company}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">{job.duration}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-2xl font-semibold flex items-center gap-2 text-blue-700">
              <Code size={20} /> Projects
            </h3>
            <button
              onClick={() => setShowProjectForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              <Plus size={18} /> Add Project
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {profile.projects?.map((proj, i) => (
              <div
                key={i}
                className="p-6 border border-gray-200 rounded-xl shadow hover:shadow-md bg-gray-50 transition"
              >
                <h4 className="font-bold text-xl text-blue-700">{proj.title}</h4>
                <p className="text-gray-700 mt-2 line-clamp-3">
                  {proj.description}
                </p>
                <p className="text-sm mt-3">
                  <span className="font-semibold">Tech:</span>{" "}
                  {proj.techStack?.join(", ")}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {proj.links?.map((link, j) => (
                    <a
                      key={j}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition"
                    >
                      <Link2 size={14} /> Link
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-semibold mb-5 flex items-center gap-2 text-blue-700">
            <Link2 size={20} /> Links
          </h3>
          <div className="flex gap-6">
            {profile.links?.github && (
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                GitHub
              </a>
            )}
            {profile.links?.linkedin && (
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold mb-6 text-blue-700">
              Edit Profile
            </h3>

            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="w-full border border-gray-300 p-3 mb-4 rounded focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="w-full border border-gray-300 p-3 mb-4 rounded focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              value={form.education}
              onChange={(e) => setForm({ ...form, education: e.target.value })}
              placeholder="Education"
              className="w-full border border-gray-300 p-3 mb-4 rounded focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              value={form.skills?.join(", ")}
              onChange={(e) =>
                setForm({
                  ...form,
                  skills: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              placeholder="Skills (comma separated)"
              className="w-full border border-gray-300 p-3 mb-4 rounded focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2 border rounded font-medium hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded font-medium hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Project Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleProjectSubmit}
            className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold mb-6 text-blue-700">
              Add Project
            </h3>

            <input
              type="text"
              value={projectForm.title}
              onChange={(e) =>
                setProjectForm({ ...projectForm, title: e.target.value })
              }
              placeholder="Project Title"
              className="w-full border border-gray-300 p-3 mb-4 rounded focus:ring-2 focus:ring-blue-400"
              required
            />

            <textarea
              value={projectForm.description}
              onChange={(e) =>
                setProjectForm({ ...projectForm, description: e.target.value })
              }
              placeholder="Project Description"
              className="w-full border border-gray-300 p-3 mb-4 rounded focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="text"
              value={projectForm.techStack?.join(", ")}
              onChange={(e) =>
                setProjectForm({
                  ...projectForm,
                  techStack: e.target.value
                    .split(",")
                    .map((tech) => tech.trim()),
                })
              }
              placeholder="Tech Stack (comma separated)"
              className="w-full border border-gray-300 p-3 mb-4 rounded focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              value={projectForm.links?.join(", ")}
              onChange={(e) =>
                setProjectForm({
                  ...projectForm,
                  links: e.target.value.split(",").map((l) => l.trim()),
                })
              }
              placeholder="Links (comma separated)"
              className="w-full border border-gray-300 p-3 mb-4 rounded focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowProjectForm(false)}
                className="px-5 py-2 border rounded font-medium hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded font-medium hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
