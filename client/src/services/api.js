import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/profile" });

// Profile APIs
export const createOrUpdateProfile = async (data) =>
  (await API.post("/", data)).data;

export const getProfile = async () =>
  (await API.get("/")).data;

export const getProjectsBySkill = async (skill) =>
  (await API.get(`/projects?skill=${skill}`)).data;

export const getTopSkills = async () =>
  (await API.get("/skills/top")).data;

export const searchProfile = async (query) =>
  (await API.get(`/search?q=${query}`)).data;

export const getProjectsByTitle = async (title) =>
  (await API.get(`/projects/title?title=${title}`)).data;

// If you add single project route with params
export const getProjectByTitle = async (title) =>
  (await API.get(`/project/${title}`)).data;

// Add a new project to the profile
export const addProject = async (data) =>
  (await API.post("/projects", data)).data;
