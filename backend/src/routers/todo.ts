import { desc, eq } from "drizzle-orm";
import express from "express";
import { db } from "../db/index";
import { todo } from "../db/schema/todo";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await db.query.todo.findMany({
      orderBy: desc(todo.created_at),
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.post("/new", async (req, res) => {
  try {
    const value: string | undefined = req.body.value;

    if (!value) {
      return res.status(500).json({
        error: "Value is required",
      });
    }

    const result = await db.insert(todo).values({
      title: value,
      completed: false,
    });

    if (!result) {
      return res.status(200).json({
        error: "Something went wrong!",
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const result = await db.delete(todo).where(eq(todo.id, req.body.id));

    if (!result) {
      return res.status(500).json({
        error: "Something went wrong!",
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.patch("/update", async (req, res) => {
  try {
    const values = req.body;
    const result = await db
      .update(todo)
      .set(values)
      .where(eq(todo.id, req.body.id));

    if (!result) {
      return res.status(500).json({
        error: "Something went wrong!",
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

export default router;
