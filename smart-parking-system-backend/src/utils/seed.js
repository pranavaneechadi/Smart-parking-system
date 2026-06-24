const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const ParkingLot = require('../models/ParkingLot');
const Slot = require('../models/Slot');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/parking_system', {});
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        await connectDB();

        console.log('Clearing existing data...');
        await User.deleteMany({});
        await ParkingLot.deleteMany({});
        await Slot.deleteMany({});

        console.log('Creating users...');
        const adminPassword = 'admin123';
        const staffPassword = 'staff123';
        const userPassword = 'password123';

        const users = await User.create([
            {
                name: 'Admin User',
                email: 'admin@example.com',
                phone: '9999999999',
                password: adminPassword,
                role: 'admin',
                isVerified: true,
            },
            {
                name: 'Staff Member',
                email: 'staff@example.com',
                phone: '8888888888',
                password: staffPassword,
                role: 'staff',
                isVerified: true,
            },
            {
                name: 'Regular User',
                email: 'user@example.com',
                phone: '7777777777',
                password: userPassword,
                role: 'user',
                isVerified: true,
            },
        ]);

        console.log('Creating parking lots...');
        const parkingLots = await ParkingLot.create([
            {
                name: 'City Center Mall Parking',
                address: 'Sector 17, Chandigarh',
                city: 'Chandigarh',
                location: { type: 'Point', coordinates: [76.7794, 30.7333] }, // CHD
                totalSlots: 50,
                slotsByType: {
                    twoWheeler: 20,
                    threeWheeler: 5,
                    fourWheeler: 20,
                    heavyVehicle: 5
                },
                hourlyRate: 50,
                maxHours: 24,
                overStayFinePerHour: 100,
                createdBy: users[0]._id,
                isActive: true,
            },
            {
                name: 'Tech Park Plaza',
                address: 'IT Park, Bangalore',
                city: 'Bangalore',
                location: { type: 'Point', coordinates: [77.5946, 12.9716] }, // BLR
                totalSlots: 100,
                slotsByType: {
                    twoWheeler: 50,
                    threeWheeler: 10,
                    fourWheeler: 30,
                    heavyVehicle: 10
                },
                hourlyRate: 80,
                maxHours: 48,
                overStayFinePerHour: 200,
                createdBy: users[0]._id,
                isActive: true,
            },
            {
                name: 'Downtown Market',
                address: 'Connaught Place, New Delhi',
                city: 'New Delhi',
                location: { type: 'Point', coordinates: [77.2167, 28.6328] }, // DEL
                totalSlots: 30,
                slotsByType: {
                    twoWheeler: 10,
                    threeWheeler: 5,
                    fourWheeler: 15,
                    heavyVehicle: 0
                },
                hourlyRate: 100,
                maxHours: 12,
                overStayFinePerHour: 500,
                createdBy: users[0]._id,
                isActive: true
            },
            {
                name: 'UB City Parking Hub',
                address: 'UB City, Bangalore',
                city: 'Bangalore',
                location: { type: 'Point', coordinates: [77.5948, 12.9718] },
                totalSlots: 70,
                slotsByType: {
                    twoWheeler: 25,
                    threeWheeler: 5,
                    fourWheeler: 35,
                    heavyVehicle: 5
                },
                hourlyRate: 90,
                maxHours: 36,
                overStayFinePerHour: 220,
                createdBy: users[0]._id,
                isActive: true
            },
            {
                name: 'Koramangala Metro Parking',
                address: '5th Block, Koramangala, Bangalore',
                city: 'Bangalore',
                location: { type: 'Point', coordinates: [77.6250, 12.9352] },
                totalSlots: 80,
                slotsByType: {
                    twoWheeler: 30,
                    threeWheeler: 8,
                    fourWheeler: 35,
                    heavyVehicle: 7
                },
                hourlyRate: 75,
                maxHours: 24,
                overStayFinePerHour: 180,
                createdBy: users[0]._id,
                isActive: true
            },
            {
                name: 'Electronic City Smart Parking',
                address: 'Electronic City Phase 1, Bangalore',
                city: 'Bangalore',
                location: { type: 'Point', coordinates: [77.6633, 12.8456] },
                totalSlots: 90,
                slotsByType: {
                    twoWheeler: 35,
                    threeWheeler: 10,
                    fourWheeler: 40,
                    heavyVehicle: 5
                },
                hourlyRate: 70,
                maxHours: 30,
                overStayFinePerHour: 160,
                createdBy: users[0]._id,
                isActive: true
            },
            {
                name: 'Whitefield Office Parking',
                address: 'Whitefield, Bangalore',
                city: 'Bangalore',
                location: { type: 'Point', coordinates: [77.7485, 12.9698] },
                totalSlots: 75,
                slotsByType: {
                    twoWheeler: 25,
                    threeWheeler: 6,
                    fourWheeler: 35,
                    heavyVehicle: 9
                },
                hourlyRate: 85,
                maxHours: 28,
                overStayFinePerHour: 200,
                createdBy: users[0]._id,
                isActive: true
            },
            {
                name: 'Marathahalli Commercial Parking',
                address: 'Marathahalli, Bangalore',
                city: 'Bangalore',
                location: { type: 'Point', coordinates: [77.7011, 12.9592] },
                totalSlots: 60,
                slotsByType: {
                    twoWheeler: 20,
                    threeWheeler: 5,
                    fourWheeler: 30,
                    heavyVehicle: 5
                },
                hourlyRate: 65,
                maxHours: 24,
                overStayFinePerHour: 140,
                createdBy: users[0]._id,
                isActive: true
            },
            {
                name: 'Tumkur Road Transit Parking',
                address: 'Tumkur Road, Bangalore',
                city: 'Bangalore',
                location: { type: 'Point', coordinates: [77.1025, 12.9834] },
                totalSlots: 65,
                slotsByType: {
                    twoWheeler: 25,
                    threeWheeler: 6,
                    fourWheeler: 30,
                    heavyVehicle: 4
                },
                hourlyRate: 60,
                maxHours: 24,
                overStayFinePerHour: 130,
                createdBy: users[0]._id,
                isActive: true
            },
            {
                name: 'Mysore Road Park Plaza',
                address: 'Mysore Road, Bangalore',
                city: 'Bangalore',
                location: { type: 'Point', coordinates: [77.5394, 12.9531] },
                totalSlots: 55,
                slotsByType: {
                    twoWheeler: 18,
                    threeWheeler: 4,
                    fourWheeler: 28,
                    heavyVehicle: 5
                },
                hourlyRate: 68,
                maxHours: 26,
                overStayFinePerHour: 150,
                createdBy: users[0]._id,
                isActive: true
            }
        ]);

        console.log('Generating slots...');
        const slots = [];

        for (const parking of parkingLots) {
            // Generate 2 Wheeler Slots
            for (let i = 1; i <= parking.slotsByType.twoWheeler; i++) {
                slots.push({
                    slotNumber: `2W-${i}`,
                    parkingId: parking._id,
                    slotType: 'twoWheeler',
                    status: 'available',
                    isActive: true
                });
            }
            // Generate 3 Wheeler Slots
            for (let i = 1; i <= parking.slotsByType.threeWheeler; i++) {
                slots.push({
                    slotNumber: `3W-${i}`,
                    parkingId: parking._id,
                    slotType: 'threeWheeler',
                    status: 'available',
                    isActive: true
                });
            }
            // Generate 4 Wheeler Slots
            for (let i = 1; i <= parking.slotsByType.fourWheeler; i++) {
                slots.push({
                    slotNumber: `4W-${i}`,
                    parkingId: parking._id,
                    slotType: 'fourWheeler',
                    status: 'available',
                    isActive: true
                });
            }
            // Generate Heavy Vehicle Slots
            for (let i = 1; i <= parking.slotsByType.heavyVehicle; i++) {
                slots.push({
                    slotNumber: `HV-${i}`,
                    parkingId: parking._id,
                    slotType: 'heavyVehicle',
                    status: 'available',
                    isActive: true
                });
            }
        }

        await Slot.insertMany(slots);

        console.log(`Successfully seeded:
    - ${users.length} Users
    - ${parkingLots.length} Parking Lots
    - ${slots.length} Slots
    `);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
