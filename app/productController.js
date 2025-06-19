import db from "../config/db.js";
import { errMsg } from "../helpers/functions.js";

export const createProduct = async (req, res) => {
  const { name, price } = req.body;

  if (!name) return res.status(400).json({ error: `Name is required` });
  if (!price) return res.status(400).json({ error: `Price is required` });

  try {
    const [data] = await db.query("INSERT INTO Products (name, price) VALUES (?, ?)", [name, price]);
    res.status(201).json({ message: `Create ${name} success` });
  } catch (error) {
    errMsg(res, error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM Products ORDER BY createdAt DESC");
    res.status(200).json(data);
  } catch (error) {
    errMsg(res, error);
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await db.query("SELECT * FROM Products WHERE id = ?", [id]);
    if (data.length === 0) return res.status(400).json({ error: `Product id ${id} not found` });
    res.status(200).json(data[0]);
  } catch (error) {
    errMsg(res, error);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  if (!name) return res.status(400).json({ error: `Name is required` });
  if (!price) return res.status(400).json({ error: `Price is required` });

  try {
    const [data] = await db.query("SELECT * FROM Products WHERE id = ?", [id]);
    if (data.length === 0) return res.status(400).json({ error: `Product id ${id} not found` });

    const [result] = await db.query("UPDATE Products SET name = ?, price = ? WHERE id = ?", [name, price, id]);
    if (result.affectedRows === 0) return res.status(400).json({ error: `Product id ${id} not found` });
    res.status(200).json({ message: `Update ${name} success` });
  } catch (error) {
    errMsg(res, error);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM Products WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(400).json({ error: `Product id ${id} not found` });
    res.status(200).json({ message: `Delete product success` });
  } catch (error) {
    errMsg(res, error);
  }
};
