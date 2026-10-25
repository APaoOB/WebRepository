import express from "express";
import ejs from "ejs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const projectDirectory = path.dirname(fileURLToPath(import.meta.url));
const names = [];
const tasks = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", path.join(projectDirectory, "html"));

function renderIndex(res, options = {}) {
  res.render("index.html", {
    names,
    tasks,
    greeting: null,
    error: null,
    ...options,
  });
}

function httpError(message, status) {
  return Object.assign(new Error(message), { status });
}

function parseIndex(value, length, label) {
  if (typeof value !== "string" || !/^\d+$/.test(value)) {
    throw httpError(`The ${label} index is invalid.`, 400);
  }

  const index = Number(value);
  if (!Number.isSafeInteger(index) || index >= length) {
    throw httpError(`The ${label} index is out of range.`, 404);
  }

  return index;
}

app.get("/", (req, res) => {
  renderIndex(res);
});

app.get("/greet", (req, res, next) => {
  if (req.query.index !== undefined) {
    let index;
    try {
      index = parseIndex(req.query.index, names.length, "greeting");
    } catch (error) {
      return next(error);
    }

    return res.render("wazzup.html", { name: names[index] });
  }

  if (req.query.name !== undefined) {
    if (typeof req.query.name !== "string" || !req.query.name.trim()) {
      return next(httpError("Please enter a name.", 400));
    }

    const name = req.query.name.trim();
    names.push(name);
    console.log(name);
    return renderIndex(res, { greeting: `Hello, ${name}!` });
  }

  return renderIndex(res);
});

app.put("/greet/:name", (req, res, next) => {
  const name = req.params.name.trim();
  if (!name) {
    return next(httpError("Please provide a name.", 400));
  }

  names.push(name);
  return res.json(names);
});

app.get("/task", (req, res) => {
  res.json(tasks);
});

app.post("/task", (req, res, next) => {
  const task = typeof req.body?.task === "string" ? req.body.task.trim() : "";
  if (!task) {
    return next(httpError("Please enter a task.", 400));
  }

  tasks.push(task);
  return res.redirect(303, "/");
});

app.post("/task/delete", (req, res, next) => {
  let index;
  try {
    index = parseIndex(req.body?.index, tasks.length, "task");
  } catch (error) {
    return next(error);
  }

  tasks.splice(index, 1);
  return res.redirect(303, "/");
});

app.post("/task/move", (req, res, next) => {
  let index;
  try {
    index = parseIndex(req.body?.index, tasks.length, "task");
  } catch (error) {
    return next(error);
  }

  const direction = req.body?.direction;
  const destination = direction === "up" ? index - 1 : index + 1;
  if (!["up", "down"].includes(direction) || destination < 0 || destination >= tasks.length) {
    return next(httpError("That task cannot be moved in that direction.", 400));
  }

  [tasks[index], tasks[destination]] = [tasks[destination], tasks[index]];
  return res.redirect(303, "/");
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const status = Number.isInteger(error.status) ? error.status : 500;
  if (status >= 500) {
    console.error(error);
  }

  return res.status(status).render("index.html", {
    names,
    tasks,
    greeting: null,
    error: status >= 500 ? "Something went wrong." : error.message,
  });
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Express API listening on http://localhost:${port}`);
});