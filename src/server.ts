import mongoose from 'mongoose';
import app from './app';

async function main() {
  try {
    await mongoose.connect(
      'mongodb+srv://assignment5:assignment5@irfan.btza9xu.mongodb.net/assignment5?retryWrites=true&w=majority&appName=Irfan',
    );
    app.listen(5000, () => {
      console.log('app is running on port 5000');
    });
  } catch (error) {
    console.log(error);
  }
}

main();
