// backend/src/seedUser.ts
import { connectToDatabase } from '../src/lib/mongodb';
import User from '../src/models/User';

async function seedUser() {
  try {
    await connectToDatabase();
    const user = new User({
      name: 'Benjamin Okumu',
      email: 'okumub85@gmail.com',
      password: await import('bcryptjs').then(bcrypt => bcrypt.hashSync('Benja@4771', 10)),
    });
    await user.save();
    console.log('User created successfully');
  } catch (error) {
    console.error('Error seeding user:', error);
  } finally {
    process.exit();
  }
}

seedUser();