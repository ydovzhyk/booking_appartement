export const fields = {
  username: {
    label: "User name",
    name: "username",
    type: "text",
    placeholder: "User name",
    title: "*The Name field must be more than 2 and less than 15 characters",
    required: true,
  },
  email: {
    label: "Email",
    name: "email",
    type: "text",
    placeholder: "Email",
    title: "*Enter a valid email",
    required: true,
  },
  password: {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Password",
    title:
      "*The Password field must be more than 2 and less than 21 characters",
    required: true,
  },
  search: {
    name: "search",
    type: "text",
    title: "",
    required: false,
  },
  keyword: {
    name: "keyword",
    type: "text",
    title: "",
    required: false,
  },
};
