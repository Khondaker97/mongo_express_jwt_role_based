import { createBrowserRouter } from "react-router-dom";
import { Home, Login, NotFound, Register } from "../components";
import Banner from "../components/Banner";
// import Main from "../layout/Main";
// import PrivateRoute from "./PrivateRoute";
export const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Main />,
  //   children: [
  //     {
  //       path: "/",
  //       errorElement: <Error />,
  //       element: <Home />,
  //     },
  //     {
  //       path: "/home",
  //       errorElement: <Error />,
  //       element: <Home />,
  //     },
  //     {
  //       path: "/about",
  //       errorElement: <Error />,
  //       element: <About />,
  //     },
  //     {
  //       path: "/blog",
  //       errorElement: <Error />,
  //       element: <Blog />,
  //     },
  //     {
  //       path: "/login",
  //       errorElement: <Error />,
  //       element: <Login />,
  //     },
  //     {
  //       path: "/register",
  //       errorElement: <Error />,
  //       element: <Register />,
  //     },
  //     {
  //       path: "/courses",
  //       errorElement: <Error />,
  //       element: <Courses />,
  //       children: [
  //         {
  //           path: "",
  //           loader: async () => {
  //             return await fetch(`https://ph10server.vercel.app/api/courses`);
  //           },
  //           element: <AllCourse />,
  //         },
  //         {
  //           path: ":courseId",
  //           loader: async ({ params }) => {
  //             return await fetch(
  //               `https://ph10server.vercel.app/api/courses/${params.courseId}`
  //             );
  //           },
  //           errorElement: <Error />,
  //           element: <Subject />,
  //         },
  //         {
  //           path: ":courseId/:id",
  //           errorElement: <Error />,
  //           element: <SubjectDetails />,
  //         },
  //       ],
  //     },
  //     {
  //       path: "/checkout",
  //       errorElement: <Error />,
  //       element: (
  //         <PrivateRoute>
  //           <Checkout />
  //         </PrivateRoute>
  //       ),
  //     },
  //   ],
  // },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Banner />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
