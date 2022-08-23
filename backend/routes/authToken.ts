import jwt_decode from 'jwt-decode';
const jwt = require('jsonwebtoken');

export function authUser(req: any, res: any, next: any) {
	const token = req.header('token');
	if (!token) return res.status(401).send('Access Denied');
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).send('Invalid Token');
	}
}

export function authRoleAdmin(req: any, res: any, next: any) {
	const token = req.header('token');
	let decoded: any = jwt_decode(token);
	if (!token) return res.status(401).send('Access Denied');
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET) && decoded.role == 'admin';
		req.user = verified;
		if (!verified) return res.status(401).send('Access Denied');
		next();
	} catch (err) {
		res.status(400).send('Invalid Token');
	}
}
export function authRole(req: any, res: any, next: any) {
	const token = req.header('token');
	let decoded: any = jwt_decode(token);
	if (!token) return res.status(401).send('Access Denied');
	try {
		const verified =
			jwt.verify(token, process.env.TOKEN_SECRET) && (decoded.role == 'admin' || decoded.role == 'moderator');

		req.user = verified;
		next();
	} catch (err) {
		res.status(400).send('Invalid Token');
	}
}

module.exports = {
	authUser,
	authRoleAdmin,
	authRole
};
