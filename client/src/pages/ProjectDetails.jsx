import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectByTitle } from "../services/api";

const ProjectDetails = () => {
  const { title } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getProjectByTitle(title);

        if (data?.length > 0) {
          setProject(data[0]);
        } else {
          setError("Project not found");
        }
      } catch (err) {
        setError("Failed to fetch project details");
      } finally {
        setLoading(false);
      }
    })();
  }, [title]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{project.title}</h2>
      <p className="text-gray-700 my-4">{project.description}</p>

      {/* Tech Stack */}
      {project.techStack?.length > 0 && (
        <>
          <h3 className="font-semibold">Tech Stack:</h3>
          <div className="flex flex-wrap gap-2 my-2">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="bg-gray-200 px-2 py-1 rounded text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </>
      )}

      {/* Links (array instead of single link) */}
      {project.links?.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Links:</h3>
          <ul className="list-disc ml-5">
            {project.links.map((link, i) => (
              <li key={i}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  🔗 {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
