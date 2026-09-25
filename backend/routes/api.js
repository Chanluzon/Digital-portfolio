const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Email transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

const projects = [
    {
        id: 1,
        title: 'SpeakForge - Mobile Communication App',
        description: 'A communication app built to help Bisaya-speaking users translate live text and voice conversations more easily across languages.',
        techStack: ['Java', 'Android Studio', 'Firebase', 'Django', 'Python'],
        image: '/speakforge.png',
        imageFit: 'contain',
        liveLink: 'https://speakforge-capstone2.netlify.app/',
        githubLink: 'https://github.com/mhartkhiss/SpeakForge'
    },
    {
        id: 2,
        title: 'WISPHIL- DATA PRIVACY RISK ASSESSMENT',
        description: 'A comprehensive compliance assessment platform designed to evaluate organizational adherence to NIST Cybersecurity Framework (CSF) 2.0. The system facilitates risk assessments through structured questionnaires, tracks compliance status, and provides actionable insights for improving data privacy posture.',
        techStack: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Node.js', 'Express', 'PostgreSQL', 'JWT'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        liveLink: 'https://example.com/nexus',
        githubLink: 'https://github.com/example/nexus'
    },
    {
        id: 3,
        title: 'WISPHIL-NIST CSF Assessment Platform',
        description: 'A NIST CSF 2.0 assessment platform that helps organizations measure cybersecurity posture through structured questionnaires, track compliance progress, and generate audit-ready reports.',
        techStack: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'shadcn/ui', 'Node.js', 'Express 5', 'PostgreSQL', 'Puppeteer', 'JWT'],
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        liveLink: 'https://example.com/enigma',
        githubLink: 'https://github.com/example/enigma'
    },
    {
        id: 4,
        title: 'TTX - Tabletop Exercise Game Platform',
        description: 'A full-stack cybersecurity tabletop exercise platform where teams respond to threat scenarios by selecting security response cards. Moderators configure exercises, activate threats, manage timed rounds, and evaluate team performance through real-time scoring and leaderboards.',
        techStack: ['React 19', 'Vite 7', 'Tailwind CSS 4', 'DaisyUI', 'React Router 7', 'Node.js', 'Express 5', 'PostgreSQL', 'JWT'],
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
        category: 'Cybersecurity',
        liveLink: 'https://github.com/Chanluzon/Incident-response-ttx',
        githubLink: 'https://github.com/Chanluzon/Incident-response-ttx'
    }
];

const skills = [
    { 
        category: 'Frontend & Web Development', 
        items: ['ReactJS', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Web Design'] 
    },
    { 
        category: 'Backend & Frameworks', 
        items: ['Python', 'Django', 'Node.js', 'Express.js', 'Firebase', 'REST APIs'] 
    },
    { 
        category: 'Databases & Version Control', 
        items: ['PostgreSQL', 'MySQL', 'Firebase DB', 'Git & GitHub', 'VS Code'] 
    },
    { 
        category: 'QA Testing & Engineering', 
        items: ['Manual Testing', 'Functional Testing', 'Bug Identification', 'Debugging & Troubleshooting', 'API Integration'] 
    },
    { 
        category: 'Soft Skills & Attributes', 
        items: ['Problem Solving', 'Attention to Detail', 'Analytical Thinking', 'Team Collaboration', 'Communication', 'Adaptability', 'Time Management'] 
    }
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
