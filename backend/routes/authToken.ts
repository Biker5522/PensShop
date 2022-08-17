import jwt_decode from 'jwt-decode';
import jwt from 'jsonwebtoken';

function authUser(req: any, res: any, next: any) {
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

function authRole(req: any, res: any, next: any) {
	const token = req.header('token');
	let decoded: any = jwt_decode(token);
	if (!token) return res.status(401).send('Access Denied');
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET) && decoded.role == 'admin';

		req.user = verified;
		next();
	} catch (err) {
		res.status(400).send('Invalid Token');
	}
}

module.exports = {
	authUser,
	authRole
};
