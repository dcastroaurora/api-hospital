const menu = (role = "USER_ROLE") => {
  const menu = [
    {
      title: "COURSES",
      menus: [
        {
          title: "Dashboard",
          icon: "mdi mdi-gauge",
          submenus: [
            {
              title: "Main",
              url: "/",
            },
            {
              title: "Progressbar",
              url: "progress",
            },
            {
              title: "Chart",
              url: "chart",
            },
          ],
        },
        {
          title: "Maintainers",
          icon: "mdi mdi-folder-lock-open",
          submenus: [
            // {
            //   title: "Users",
            //   url: "users",
            // },
            {
              title: "Hospitals",
              url: "hospitals",
            },
            {
              title: "Doctors",
              url: "doctors",
            },
          ],
        },
      ],
    },
    {
      title: "MATERIALS",
      menus: [
        {
          title: "Courses",
          icon: "mdi mdi-gauge",
          submenus: [
            {
              title: "Main",
              url: "/",
            },
            {
              title: "Progressbar",
              url: "progress",
            },
            {
              title: "Chart",
              url: "chart",
            },
          ],
        },
        {
          title: "Videos",
          icon: "mdi mdi-bullseye",
          submenus: [
            {
              title: "Canvan",
              url: "/",
            },
            {
              title: "TEA",
              url: "",
            },
            {
              title: "Google Fonts",
              url: "",
            },
            {
              title: "Comportamientos",
              url: "",
            },
          ],
        },
      ],
    },
  ];

  if (role == "ADMIN_ROLE") {
    menu[0].menus[1].submenus.unshift({
      title: "Users",
      url: "users",
    });
  }

  return menu;
};

export default menu;
