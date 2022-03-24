import express from 'express';
import { signIn, signUp } from './auth.controller.js';
import { validateSignInUser } from './validators/validateSignInUser.js';
import { validateSignUpUser } from './validators/validateSignUpUser.js';

const router = express.Router();

router.post('/sign-in', validateSignInUser, signIn);
router.post('/sign-up', validateSignUpUser, signUp);

export default router;
