import express from 'express';
import { signIn, signUp, getMe, signOut } from './auth.controller.js';
import { validateSignInUser } from './validators/validateSignInUser.js';
import { validateSignUpUser } from './validators/validateSignUpUser.js';
import { verifyJwtToken } from '../../middlewares/verifyJwtToken.js';
import { blockIfTokenExists } from '../../middlewares/blockIfTokenExists.js';

const router = express.Router();

router.post('/sign-in', blockIfTokenExists, validateSignInUser, signIn);
router.post('/sign-up', blockIfTokenExists, validateSignUpUser, signUp);
router.get('/me', verifyJwtToken, getMe);
router.delete('/sign-out', verifyJwtToken, signOut);

export default router;
