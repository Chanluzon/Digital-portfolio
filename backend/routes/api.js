const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Mock Data
const projects = [
    {
        id: 1,
        title: 'SpeakForge - Android Mobile Application',
        description: 'SpeakForge is an AI-Powered multilingual communication tool designed to eliminate language barriers by integrating real-time text and voice translation into chat-based conversations. The project addresses the growing need for seamless cross-lingual communication, particularly among international students, tourists, expatriates, and businesses operating in Cebu. By leveraging advanced AI-powered translation services, speech recognition technology, and intuitive user interfaces, SpeakForge facilitates effortless communication between Bisaya speaking communities and non-native speakers.',
        techStack: ['React', 'Node.js', 'Firebase'],
        image: '/speakforge.png',
        liveLink: 'https://speakforge-capstone2.netlify.app/',
        githubLink: 'https://github.com/mhartkhiss/SpeakForge'
    },
    {
        id: 2,
        title: 'Data Privacy Risk Assessment',
        description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
        techStack: ['Vue', 'Tailwind CSS', 'Vite'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        liveLink: 'https://example.com/nexus',
        githubLink: 'https://github.com/example/nexus'
    },
    {
        id: 3,
        title: 'WISPHIL-NIST CSF Assessment Platform',
        description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
        techStack: ['Node.js', 'Express', 'Firebase', 'Docker'],
        image: '',
        liveLink: 'https://example.com/enigma',
        githubLink: 'https://github.com/example/enigma'
    }
];

const skills = [
    { category: 'Frontend', items: ['React', 'Html', 'Css', 'Javascript', 'TypeScript', 'Tailwind'] },
    { category: 'Backend', items: ['Node.js', 'Express',] },
    { category: 'Database', items: ['PostgreSQL', 'MySql', 'Firebase'] },
    { category: 'DevOps', items: ['AWS', 'GitHub Actions'] }
];

// Routes
router.get('/projects', (req, res) => {
    res.json(projects);
});

router.get('/skills', (req, res) => {
    res.json(skills);
});

router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    try {
        const mailOptions = {
            from: `"${name} (Portfolio)" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER, // Send to your own inbox
            replyTo: email, // Clicking reply replies to the sender directly
            subject: `Portfolio Contact from ${name}`,
            text: `You have a new message from ${name} (${email}):\n\n${message}`,
            html: `
                <h3>New message from your Digital Portfolio</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <hr/>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        if (process.env.GMAIL_USER && process.env.GMAIL_PASS && process.env.GMAIL_PASS !== 'your_16_digit_app_password_here') {
            await transporter.sendMail(mailOptions);
            console.log(`Sent contact email from ${name} <${email}> to Gmail!`);
            res.status(200).json({ success: true, message: 'Message successfully received! I will get back to you soon.' });
        } else {
            console.log(`Received contact from ${name} <${email}>: ${message}\n(Email skipped: GMAIL_USER and GMAIL_PASS are not configured correctly in backend/.env)`);
            res.status(200).json({ success: true, message: 'Message received (Development mode: Email not sent).' });
        }
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
});

module.exports = router;
