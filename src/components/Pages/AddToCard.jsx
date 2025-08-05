import React, { useState, useEffect } from "react";

const AddToCard = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([]);

  console.log("🔁 AddToCard component rendered");

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("plantoProjects");
    if (stored) {
      const parsedProjects = JSON.parse(stored);
      console.log("📦 Loaded from localStorage:", parsedProjects);
      setProjects(parsedProjects);
    } else {
      console.log("📦 No data found in localStorage");
    }
  }, []);

  // Save to localStorage when projects update
  useEffect(() => {
    console.log("💾 Saving projects to localStorage:", projects);
    localStorage.setItem("plantoProjects", JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = () => {
    if (!projectName.trim()) {
      console.warn("⚠️ Project name is empty, not adding.");
      return;
    }
    const newProject = {
      id: Date.now(),
      name: projectName.trim(),
      description: description.trim(),
    };
    console.log("➕ Adding new project:", newProject);
    setProjects([...projects, newProject]);
    setProjectName("");
    setDescription("");
  };

  const handleDeleteProject = (id) => {
    console.log("❌ Deleting project with id:", id);
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <section className="px-6 py-12 min-h-screen bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6">
        Add Project Card
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="flex-1 border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={handleAddProject}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
        >
          Add
        </button>
      </div>

      {projects.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No projects yet. Add your first one!
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {project.name}
            </h3>
            {project.description && (
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                {project.description}
              </p>
            )}
            <button
              onClick={() => handleDeleteProject(project.id)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AddToCard;
