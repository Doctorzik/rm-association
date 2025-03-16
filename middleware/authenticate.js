const isAuthenticated = (req, res, next) => {
	if (req.session.user === undefined) {
		return res.status(401).json({ message: "You dont have access." });
	}

	next();
};

module.exports = {
	isAuthenticated,
};
