import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.db = app.firestore();
    this.storage = app.storage().ref();
  }

  // Users
  users = () => this.db.collection('users');
  user = uid => this.db.collection('users').doc(uid);

  // Families
  products = uid =>
    this.db
      .collection('users')
      .doc(uid)
      .collection('products');
  product = (uid, pid) =>
    this.db
      .collection('users')
      .doc(uid)
      .collection('products')
      .doc(pid);

  // Image storage
  productImage = path => this.storage.child(path);
}

export default Firebase;
