import{PrismaClient}from '@prisma/client' 

const prisma = new PrismaClient() 

const dbDisconnect = (req, res, next) => {
    // Define a cleanup function
    const cleanup = () => {
      prisma.$disconnect()
        .then(() => {
          console.log('App now Disconnected from the database');
          process.exit(0); // Exit the process if needed
        })
        .catch((err) => {
          console.error('Error disconnecting from the database', err);
          process.exit(1); // Exit with error code
        });
    };
  
    // Listen for process exit events to trigger cleanup
    process.on('SIGINT', cleanup);  // For Ctrl+C
    process.on('SIGTERM', cleanup); // For termination signals
  
    // Move to the next middleware/route handler
    next();
  }

  export default dbDisconnect