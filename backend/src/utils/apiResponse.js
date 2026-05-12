export const ok = (res, data) => res.json(data);
export const error = (res, msg, code = 400) => res.status(code).json({ msg });
