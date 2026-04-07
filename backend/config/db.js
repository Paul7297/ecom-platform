const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔌 Connecting to MongoDB Atlas...');
  
  if (!uri) {
    console.error('❌ MONGODB_URI is not set in .env');
    throw new Error('MONGODB_URI is not set in .env');
  }
  
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📚 Database: ${mongoose.connection.name || 'ecom'}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.log('💡 Tip: Check your password and connection string');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    throw error;
  }
};

module.exports = connectDB;