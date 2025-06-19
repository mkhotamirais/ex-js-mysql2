export function errMsg(res, error) {
  console.log(error);
  res.status(400).json({ message: error.message });
}
