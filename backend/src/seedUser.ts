import { connectToDatabase } from './lib/mongodb';
import User from './models/User';

export async function seedUser() {
  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email: 'okumub85@gmail.com' });
    if (existingUser) {
      console.log('User already exists — deleting and recreating');
      await User.deleteOne({ email: 'okumub85@gmail.com' });
    }

    const user = new User({
      name: 'Benjamin Okumu',
      email: 'okumub85@gmail.com',
      password: 'Benja@4771',
    });

    await user.save();
    console.log('User seeded successfully');
  } catch (error) {
    console.error('Error seeding user:', error);
  }
}
