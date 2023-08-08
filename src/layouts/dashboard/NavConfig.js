import Iconify from "../../components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Products",
    path: "/products",
    icon: getIcon("quill:stack-alt"),
  },
  {
    title: "Quiz",
    path: "/quiz",
    icon: getIcon("material-symbols:quiz"),
  },
  {
    title: "Users",
    path: "/users",
    icon: getIcon("clarity:user-solid"),
  },
  {
    title: "Members",
    path: "/members",
    icon: getIcon("pepicons-pop:people"),
  },
  {
    title: "Winners",
    path: "/winners",
    icon: getIcon("game-icons:podium-winner"),
  },
  {
    title: "Live Draw",
    path: "/live-draw",
    icon: getIcon("ep:place"),
  },
  {
    title: "CMS",
    path: "/cms",
    icon: getIcon("tabler:seo"),
  },
];

export default navConfig;
