import * as taskService from "../services/taskService.js";
import { configure, renderFile } from "../deps.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };

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

const addTask = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    await taskService.create(name);

    return redirectTo("/tasks");
};

const viewTasks = async (request) => {
    const data = {
        tasks: await taskService.listTBD(),
    };

    return new Response(await renderFile("tasks.eta", data), responseDetails);
};

export { addTask, viewTasks };