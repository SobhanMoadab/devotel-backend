import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

dotenv.config();

@Injectable()
export class FirebaseConfigService {
  constructor() {
    // Initialize Firebase Admin SDK
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    }

    // Initialize Firebase Client SDK
    if (getApps().length === 0) {
      initializeApp({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      });
    }
  }

   getAuthAdmin() {
    return admin.auth();
  }

  // Create or fetch an existing Firebase user
  async createUser(email: string, password: string): Promise<admin.auth.UserRecord> {
    try {
      return await this.getAuthAdmin().createUser({ email, password });
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        return await this.getAuthAdmin().getUserByEmail(email);
      }
      throw error;
    }
  }

  // Set custom claims on a user
  async setCustomClaims(uid: string, roles: string[]): Promise<void> {
    try {
      await this.getAuthAdmin().setCustomUserClaims(uid, { roles });
    } catch (error) {
      console.error(`Error setting custom claims for UID: ${uid}`, error.message);
      throw error;
    }
  }

  // Generate a custom token
  async generateCustomToken(uid: string, roles: string[]): Promise<string> {
    try {
      return await this.getAuthAdmin().createCustomToken(uid, { roles });
    } catch (error) {
      console.error(`Error generating custom token for UID: ${uid}`, error.message);
      throw error;
    }
  }

  // Exchange custom token for ID token
  async exchangeCustomTokenForIdToken(customToken: string): Promise<string> {
    try {
      const clientAuth = getAuth();
      const userCredential = await signInWithCustomToken(clientAuth, customToken);
      const idToken = await userCredential.user.getIdToken();
      return idToken;
    } catch (error) {
      console.error('Error exchanging custom token for ID token', error.message);
      throw error;
    }
  }

  // Combined method: Create a user, set claims, generate token, and fetch ID token
  async createUserAndGenerateIdToken(
    email: string,
    password: string,
    roles: string[],
  ): Promise<{ email: string; uid: string; roles: string[]; idToken: string }> {
    const userRecord = await this.createUser(email, password);
    await this.setCustomClaims(userRecord.uid, roles);

    const customToken = await this.generateCustomToken(userRecord.uid, roles);
    const idToken = await this.exchangeCustomTokenForIdToken(customToken);

    return { email, uid: userRecord.uid, roles, idToken };
  }

  // Verify an ID token to retrieve claims
  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    try {
      return await this.getAuthAdmin().verifyIdToken(idToken);
    } catch (error) {
      console.error('Error verifying ID token', error.message);
      throw error;
    }
  }
}