import admin from 'firebase-admin';

import * as serviceAccount from '../sveltekit-authentication-37534-firebase-adminsdk-y2254-91dcd1c97f.json';

const app = !admin.apps.length
	? admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: 'https://sveltekit-authentication-37534-default-rtdb.firebaseio.com'
	  })
	: admin.app();

// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount),
// 	databaseURL: 'https://sveltekit-authentication-37534-default-rtdb.firebaseio.com'
// });

export default app;
