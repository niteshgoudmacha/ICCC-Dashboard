const router = require('express').Router();
const User = require('../models/user');
const Contest = require('../models/contest');
const Feedback = require('../models/feedback');
// const jwt = require('jsonwebtoken');

// router.post('/register',  async (req, res) => {
//     console.log(req.body);
//     const { fullname, username, email, gender, motto, collegeName, branch, presentYear, codechefId, codeforcesId, hackerrankId } = req.body;
//     const check = await User.findOne({ email });
//     if(check) {
//         res.status(400).send({ message: "Email already exists"});
//     }
//     const user = new User({
//         fullname,
//         email,
//         username,
//         gender,
//         motto,
//         password: User.hashPassword(req.body.password),
//         collegeName,
//         branch,
//         presentYear,
//         codechefId,
//         codeforcesId,
//         hackerrankId,
//         createdDate: Date.now()
//     });

//     try {
//         let userRecord = await user.save();
//         console.log(userRecord);
//         return res.status(200).send(userRecord);
//     } catch(err) {
//         console.log(err);
//         return res.status(501).json({message: "error registering user, please try again"});
//     }
// });

// router.post('/login', async (req, res) => {
//     console.log(req.body);
//     try {
//         const user = await User.findOne({email: req.body.email}).exec();
//         if(!user) {
//             return res.status(200).json({message: "email not registered, please register"});
//         }
//         console.log(user);
//         if(user.isValid(user.password, req.body.password)) {
//             // generate token
//             console.log('true--');
//             const token = jwt.sign({username: user.username, id: user._id}, 'HalwaJay', { expiresIn: '18h'});
//             return res.status(200).json(token);
//         }
//         else {
//             return res.status(401).json({message: "Invalid Credentials"});
//         }
//     } catch(error) {
//         console.log('error', error);
//         return res.status(501).json({ message: "Internal Server Error"});
//     }
    
// });

// var decodedToken = '';
// function verifyToken(req, res, next) {
//     var token = req.headers.token;
//     // console.log('token', req.headers);
//     jwt.verify(token, 'HalwaJay', (err, tokenData) => {
//         if(err && err.name === 'TokenExpiredError') {
//             return res.status(201).json({message: err.name});
//         }
//         if(err) {
//             console.log('err = ', err);
//             return res.status(404).json({message: 'Unauthorized request'});
//         }
//         if(tokenData) {
//             decodedToken = tokenData;
//         }
//         next();
//     });
// }

// router.get('/profile', verifyToken, async (req, res) => {
//     console.log('username\n');
//     try {
//         const user = await User.findById({ _id: decodedToken.id }, { password: 0, _id: 0, _v: 0 });
//         if(!user) {
//             res.status(404).send({ message: 'user not found'});
//         }
//         res.status(200).send(user);
//     } catch (err) {
//         console.log(err);
//         return res.status(501).json({ message: "Internal Server Error"});
//     }
//     // return res.status(200).json(decodedToken.username);
// });

// router.get('/getUsernames', verifyToken, async (req, res) => {
//     try {
//         const usernames = await User.find({}, {username: 1});
//         if(!usernames) {
//             res.status(404).send({ message: 'users not found'});
//         }
//         res.status(200).send(user);
//     } catch (err) {
//         console.log(err);
//         return res.status(501).json({ message: "Internal Server Error"});
//     }
// });

// router.post('/update/profile', verifyToken, async (req, res) => {
//     try {
//         console.log('body = ', req.body);
//         const { fullname, hackerrankId, codechefId, codeforcesId, motto } = req.body; 
//         const user = await User.findOneAndUpdate(
//                 { _id: decodedToken.id }, 
//                 { $set: { fullname, hackerrankId, codechefId, codeforcesId, motto}},
//             );
//         if(user) {
//             return res.status(200).send(user);
//         }
//         return res.status(404).send({ message: "user not found"});

//     } catch (err) {
//         console.log(err);
//         return res.status(501).send({message: "internal server error"});
//     }
// });

// router.post('/add/contest', verifyToken, async (req, res) => {
//     const { name, url, startTime, endTime, platform  } = req.body;
//     console.log(startTime);
//     const contest = new Contest({
//         name, url, startTime, endTime, platform
//     });
//     try {
//         let contestRecord = await contest.save();
//         console.log(contestRecord);
//         return res.status(200).send(contestRecord);
//     } catch(err) {
//         console.log(err);
//         return res.status(501).json({message: "error adding contest, please try again"});
//     }
// });

// router.get('/contests', async (req, res) => {
//     try {
//         const contests = await Contest.find({});
//         if(!contests) {
//             res.status(404).send({ message: 'contests not found'});
//         }
//         res.status(200).send(contests);
//     } catch (err) {
//         console.log(err);
//         return res.status(501).json({ message: "Internal Server Error"});
//     }
// });

// router.post('/feedback', verifyToken, async (req, res) => {
//     console.log(req.body);
//     const { message  } = req.body;
//     const feedback = new Feedback({
//         message,
//         name: decodedToken.username
//     });
//     try {
//         let feedbackRecord = await feedback.save();
//         console.log(feedbackRecord);
//         return res.status(200).send(feedbackRecord);
//     } catch(err) {
//         console.log(err);
//         return res.status(501).json({message: "error sending feedback, please try again"});
//     }
// });

// router.get('/ratings', verifyToken,  async (req, res) => {
//     try {
//         const contests = await User.find({ _id: decodedToken.id }, { contestsList: 1 });
//         // const add = await User.findOneAndUpdate({ _id: decodedToken.id }, { $push: { "contestsList": { contestId: "efg", rank: 2, rating: 1660}}});
//         // add.save();
//         console.log(contests[0]);
//         if(!contests) {
//             res.status(404).send({ message: 'contests not found'});
//         }
//         res.status(200).send(contests[0]);
//     } catch (err) {
//         console.log(err);
//         return res.status(501).json({ message: "Internal Server Error"});
//     }
// });


router.post('/update', async (req, res) => {
    try {
        // console.log(req.body);
        for(let idx in req.body) {
            const { email, fullName, profileUrl, problemsList, effectiveTimeTaken, score, maxScore, contestName, startedAt,
                    rank, timeTaken, percentage, testLink } = req.body[idx];
            const handle = profileUrl.split('@')[1];
            const contest = {
                contestName,
                testLink,
                startedAt,
                rank,
                timeTaken,
                percentage,
                score,
                maxScore,
                effectiveTimeTaken,
                problemsList
            }
            const update = { $set: { fullName, email, profileUrl, handle }, $push: { 'contestsList': contest }  };
            const options = { upsert: true, new: true, setDefaultsOnInsert: true };
            const user = await User.findOneAndUpdate({ email }, update, options);
            if(!user) {
                return res.status(404).send({ message: "Not Successful"});
            }
            const userRecord = await user.save();
        }
        res.status(200).send({ message: "Updated successfully"});
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error"});
    }
});

router.get('/profile', async (req, res) => {
    try {
        const handle = req.query.handle;
        const user = await User.findOne({ handle });
        if(user) {
            console.log(user);
            return res.status(200).json({ user });
        }
        res.status(404).json({ message: "user Not Found" });
    } catch (err) {
        res.status(500).json({ message: "Internal server Error"});
    }
});

router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.find({}, { fullName: 1, handle: 1, profileUrl: 1});
        if(users) {
            console.log(users);
            return res.status(200).json(users);
        }
        res.status(404).json({ message: "user Not Found" });
    } catch (err) {
        res.status(500).json({ message: "Internal server Error"});
    }
});

module.exports = router;