var express = require('express');
var router = express.Router();

const User = require('../models/user')
const Message = require('../models/message')

const authController = require('../controllers/auth-controller')
const messageController = require('../controllers/message-controller')

function checkNotAuth(req, res, next)
{
    if(req.isAuthenticated()){
        res.redirect('/')    
    }
    return next()
    
}

router.get('/', (req, res) =>{
    Message.find().exec((err, msgList)=>{
        if(err) {return next(err)}
        res.render("index", {
            user: req.user,
            msgList: msgList
        })
    })
});


router.get('/sign-up',checkNotAuth, authController.signUp);

router.post('/sign-up', authController.signUpPost);

router.get('/log-in', checkNotAuth, authController.logIn);

router.post('/log-in', authController.logInPost);

router.get('/log-out', authController.logOut)

router.get('/create-message', messageController.createMessage)

router.post('/create-message', messageController.createMessagePost)

module.exports = router;
