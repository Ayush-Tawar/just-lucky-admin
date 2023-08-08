//API
const apiHook = "cmsApi";
const endPoints = {
  get: "cms/getAllCMS?limit=100",
  create: "cms/create",
  update: "cms/update/",
  remove: "cms/delete/",
};

export default {
  apiHook,
  endPoints,
};
