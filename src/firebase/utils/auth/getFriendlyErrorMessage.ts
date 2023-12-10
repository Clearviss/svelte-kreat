/**
 * Translates Firebase error codes into user-friendly messages.
 * @param {FirebaseError} error - The error object from Firebase with `code` and `message` properties.
 * @returns {string} - A user-friendly error message.
 */

import type { FirebaseError } from "firebase/app";

type FirebaseErrorMapping = {
  [key: string]: string;
};

const firebaseErrorMapping: FirebaseErrorMapping = {
  "auth/invalid-login-credentials":
    "Nieprawidłowe dane logowania.",
  "auth/user-not-found":
    "Nie znaleziono konta.",
  "auth/wrong-password":
    "Złe hasło.",
  "auth/weak-password":
    "Hasło powinno zawierac conajmniej 6 znaków.",
  "auth/email-already-in-use":
    "Email zajęty.",
};

function getFriendlyErrorMessage(error: FirebaseError): string {
  return firebaseErrorMapping[error.code] || error.message;
}

export default getFriendlyErrorMessage;
