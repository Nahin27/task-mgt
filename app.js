import { serve } from "./deps.js";
import { configure, renderFile } from "./deps.js";
import { sql } from "./database/database.js";
import * as taskController from "./controllers/taskController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const redirectTo = path => {
  return new Response("", {
      status: 303,
      headers: {
          "Location": path,
      },
  });
};

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if(request.method === "GET" && url.pathname === "/") {
    return redirectTo("/tasks");
  } else if (request.method === "GET" && url.pathname === "/tasks") {
    return await taskController.viewTasks(request);
  } else if (request.method === "POST" && url.pathname === "/tasks") {
    return await taskController.addTask(request);
  } else {
    return new Response("Not Found", {
      status: 404,
    })
  }
};

serve(handleRequest, { port: 7777 });

