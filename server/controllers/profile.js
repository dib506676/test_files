import Profile from "../models/profile.js";

// Create or update profile
export const createOrUpdateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (profile) {
      profile = await Profile.findOneAndUpdate({}, req.body, { new: true });
    } else {
      profile = new Profile(req.body);
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get profile
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Query projects by skill
export const getProjectsBySkill = async (req, res) => {
  try {
    const { skill } = req.query;

    if (!skill) {
      return res
        .status(400)
        .json({ error: "Skill query parameter is required" });
    }

    // case-insensitive + partial match
    const regex = new RegExp(skill, "i");

    const profiles = await Profile.find({
      "projects.techStack": regex,
    });

    const projects = profiles.flatMap((profile) =>
      profile.projects.filter((project) =>
        project.techStack.some((ts) => regex.test(ts))
      )
    );

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get top skills
export const getTopSkills = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile?.skills.slice(0, 5) || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchProfile = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Query parameter q is required" });
    }

    const query = q.toLowerCase();

    // get all profiles
    const profiles = await Profile.find();
    if (!profiles.length) {
      return res.json({ skills: [], projects: [] });
    }

    // collect matches across all profiles
    let matchedSkills = [];
    let matchedProjects = [];

    profiles.forEach((profile) => {
      // match skills
      matchedSkills.push(
        ...profile.skills.filter((s) => s.toLowerCase().includes(query))
      );

      // match projects
      matchedProjects.push(
        ...profile.projects.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.techStack.some((ts) => ts.toLowerCase().includes(query))
        )
      );
    });

    // remove duplicate skills
    matchedSkills = [...new Set(matchedSkills)];

    res.json({ skills: matchedSkills, projects: matchedProjects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get projects by title
export const getProjectsByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res
        .status(400)
        .json({ error: "Project title query parameter is required" });
    }

    const regex = new RegExp(title, "i"); // case-insensitive partial match

    const profiles = await Profile.find();

    if (!profiles.length) {
      return res.json([]);
    }

    // collect projects where title matches
    const projects = profiles.flatMap((profile) =>
      profile.projects.filter((project) => regex.test(project.title))
    );

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProjectByTitle = async (req, res) => {
  try {
    const { title } = req.params;

    if (!title) {
      return res
        .status(400)
        .json({ error: "Project title parameter is required" });
    }
  const regex = new RegExp(title, "i");
    // case-insensitive regex match inside projects array
    const profiles = await Profile.find();

    const projects = profiles.flatMap((profile) =>
      profile.projects.filter((project) => regex.test(project.title))
    );

    res.json(projects); // return only the matched project
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add project to the single profile
export const addProject = async (req, res) => {
  try {
    const { title, description, techStack, links } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    // since only one profile exists, just findOne
    let profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Push new project
    profile.projects.push({
      title,
      description,
      techStack,
      links,
    });

    await profile.save();

    res.status(201).json(profile.projects[profile.projects.length - 1]); // return newly added project
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
