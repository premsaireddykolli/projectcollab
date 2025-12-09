const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePassword = (password) => {
    return password && password.length >= 6;
};

const validateRegistration = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || name.trim().length === 0) {
        return res.status(400).json({ error: 'Name is required' });
    }

    if (!email || !validateEmail(email)) {
        return res.status(400).json({ error: 'Valid email is required' });
    }

    if (!password || !validatePassword(password)) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    next();
};

const validateProject = (req, res, next) => {
    const { title } = req.body;

    if (!title || title.trim().length === 0) {
        return res.status(400).json({ error: 'Project title is required' });
    }

    next();
};

module.exports = {
    validateRegistration,
    validateProject
};