
const mongoose = require('mongoose');
const Act = require('./models/Act');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const predefinedActs = [
  { category: 'Kindness', description: 'Help a neighbor with their groceries.', identifier: 'act1' },
  { category: 'Generosity', description: 'Buy coffee for the person behind you in line.', identifier: 'act2' },
  { category: 'Community', description: 'Volunteer at a local charity event.', identifier: 'act3' },
  { category: 'Gratitude', description: 'Write a thank-you note to someone who has helped you.', identifier: 'act4' },
  { category: 'Compassion', description: 'Donate to a cause you believe in.', identifier: 'act5' },
  { category: 'Environment', description: 'Plant a tree in your neighborhood.', identifier: 'act6' },
  { category: 'Kindness', description: 'Hold the door open for someone.', identifier: 'act7' },
  { category: 'Generosity', description: 'Leave a positive note for a colleague.', identifier: 'act8' },
  { category: 'Community', description: 'Attend a local community meeting.', identifier: 'act9' },
  { category: 'Gratitude', description: 'Express gratitude to a family member.', identifier: 'act10' },
  { category: 'Compassion', description: 'Visit a nursing home and spend time with residents.', identifier: 'act11' },
  { category: 'Environment', description: 'Pick up litter in your local park.', identifier: 'act12' },
  { category: 'Kindness', description: 'Offer your seat to someone on public transportation.', identifier: 'act13' },
  { category: 'Generosity', description: 'Donate unused clothes to a local charity.', identifier: 'act14' },
  { category: 'Community', description: 'Join a neighborhood cleanup initiative.', identifier: 'act15' },
  { category: 'Gratitude', description: 'Write a gratitude journal for a week.', identifier: 'act16' },
  { category: 'Compassion', description: 'Help a friend with a task without being asked.', identifier: 'act17' },
  { category: 'Environment', description: 'Reduce water usage for a day.', identifier: 'act18' },
  { category: 'Kindness', description: 'Send a positive message to someone you haven’t talked to in a while.', identifier: 'act19' },
  { category: 'Generosity', description: 'Pay for the meal of the person behind you in a drive-thru.', identifier: 'act20' },
  { category: 'Community', description: 'Attend a local farmers market and support local vendors.', identifier: 'act21' },
  { category: 'Gratitude', description: 'Make a list of things you are grateful for.', identifier: 'act22' },
  { category: 'Compassion', description: 'Offer to run errands for a neighbor who may need assistance.', identifier: 'act23' },
  { category: 'Environment', description: 'Use reusable bags for all your shopping for a week.', identifier: 'act24' },
  { category: 'Kindness', description: 'Smile and greet strangers you encounter during the day.', identifier: 'act25' },
  
];


const insertPredefinedActs = async () => {
  
   
    await Act.deleteMany({});

  
    await Act.insertMany(predefinedActs);

    console.log('Predefined acts inserted successfully');
  } 


insertPredefinedActs();
