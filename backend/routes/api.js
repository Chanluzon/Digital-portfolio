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

// Mock Data
const projects = [
    {
        id: 1,
        title: 'SpeakForge - Android Mobile Application',
        description: 'SpeakForge is an AI-Powered multilingual communication tool designed to eliminate language barriers by integrating real-time text and voice translation into chat-based conversations. The project addresses the growing need for seamless cross-lingual communication, particularly among international students, tourists, expatriates, and businesses operating in Cebu. By leveraging advanced AI-powered translation services, speech recognition technology, and intuitive user interfaces, SpeakForge facilitates effortless communication between Bisaya speaking communities and non-native speakers.',
        techStack: ['Java', 'Android Studio', 'Firebase', 'Django', 'Python', 'Claude AI', 'DeepSeek', 'Gemini AI'],
        image: '/speakforge.png',
        imageFit: 'contain',
        liveLink: 'https://speakforge-capstone2.netlify.app/',
        githubLink: 'https://github.com/mhartkhiss/SpeakForge'
    },
    {
        id: 2,
        title: 'Data Privacy Risk Assessment',
        description: 'A comprehensive compliance assessment platform designed to evaluate organizational adherence to NIST Cybersecurity Framework (CSF) 2.0. The system facilitates risk assessments through structured questionnaires, tracks compliance status, and provides actionable insights for improving data privacy posture.\n\nThe questionnaire is designed to assess an organization\'s data privacy risk posture by evaluating controls and practices against the six Core Functions of the NIST Cybersecurity Framework 2.0: Govern, Identify, Protect, Detect, Respond, and Recover. Each question is mapped to a specific CSF Category or Subcategory reference.\n\nThis platform serves as a complete risk assessment solution for organizations seeking to evaluate and enhance their data privacy practices in alignment with NIST standards.',
        techStack: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Node.js', 'Express', 'PostgreSQL', 'JWT'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        liveLink: 'https://example.com/nexus',
        githubLink: 'https://github.com/example/nexus'
    },
    {
        id: 3,
        title: 'WISPHIL-NIST CSF Assessment Platform',
        description: 'WISPHIL-NIST is a web application that helps organizations measure, document, and report their cybersecurity posture using the NIST Cybersecurity Framework (CSF) 2.0. It guides teams through structured assessments, manages role-based access for organization members and moderators, and produces audit-ready summaries and PDF reports from assessment results. The platform is intended for organizations that need a consistent way to capture CSF-aligned answers, track progress over time, and share outcomes with internal stakeholders or regulators.\n\nThe assessment model is built around the six NIST CSF core functions: Govern, Identify, Protect, Detect, Respond, and Recover. Assessment questions are organized by function, category, and subcategory. Responses are used to calculate compliance and risk-related summaries, which can also be exported as PDF reports.',
        techStack: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'shadcn/ui', 'Node.js', 'Express 5', 'PostgreSQL', 'Puppeteer', 'JWT'],
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        liveLink: 'https://example.com/enigma',
        githubLink: 'https://github.com/example/enigma'
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
