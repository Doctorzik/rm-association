const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const mongoDb = require("./config/database.js");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("./models/models.js");
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(
	session({
		secret: process.env.sessionSecret,
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 6000 * 60,
		},
	})
); 
app.use(passport.initialize());
//Allow passport to use express session
app.use(passport.session());
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.CALLBACK_URL,
		},
		async function (accessToken, refreshToken, profile, done) {
			try {
				let user = await User.findOne({ googleId: profile.id });
				if (!user) {
					user = await User.create({
						googleId: profile.id,
						username: profile.displayName,
            email : profile.emails[0].value 
					});

     
				}
				return done(null, user);
			} catch (err) {
				return done(err, null);
			}
		}  
	)
);
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err, null);
	}
});
//Basic express session initialization


app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-origin", "*");
	res.setHeader(
		"Access-Control-Headers",
		"Origin, x-Requested-With, Content-Type, Accept, Accept z-key, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"POST, GET, PUT, PATCH,  OPTIONS, DELETE"
	);

	next();
});

app.use(
	cors({
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
	})
);

app.use(cors({ origin: "*" }));

app.use("/", require("./routes/index.js"));

app.get("/", (req, res) => {
  console.log(req.session)
	res.send(
		req.session.user !== undefined
			? `Logged in as ${req.session.user.username}`
			: "Logged Out"
	);
});

app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
	"/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/login" }),
	function (req, res) {
      req.session.user = req.user
		// Successful authentication, redirect home.
		res.redirect("/");
	}
);
 
mongoDb.initDb((err) => {
	if (err) {
		console.log(err);
	} else {
		app.listen(port, () => {
			console.log(`App is listening at port ${port}`);
		});
	}
});
