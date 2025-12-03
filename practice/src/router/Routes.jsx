import MainLayout from "../Layout/MainLayout";
import { Accordion, Counter, Search, Form } from "../Pages";

export const Routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "search", element: <Search /> },
      { path: "counter", element: <Counter /> },
      { path: "accordion", element: <Accordion /> },
      { path: "contact-form", element: <Form /> },
      { path: "", element: "" },
    ],
  },
];
