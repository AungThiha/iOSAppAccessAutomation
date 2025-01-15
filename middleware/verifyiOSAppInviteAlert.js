const crypto = require('crypto');

const verifyiOSAppInvite = (req, res, next) => {
    const encryptionKey = process.env.IOS_APP_INVITE_ENCRYPTION_KEY_BASE64;
    const algorithm = 'aes-256-gcm';

    const { encryptedData, iv, authTag } = req.body;
    if (!encryptedData || !iv || !authTag) {
        return res.status(403).json({ message: 'Missing required fields' });
    }

    try {
        const decipher = crypto.createDecipheriv(
            algorithm, 
            Buffer.from(encryptionKey, 'base64'), 
            Buffer.from(iv, 'base64')
        );
        decipher.setAuthTag(Buffer.from(authTag, 'base64'));

        let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
        decrypted += decipher.final('utf8');

        const payload = JSON.parse(decrypted);

        req.body = payload;

        next();
    } catch (error) {
        return res.status(400).json({
            message: 'This endpoint accepts data only from iOSAppInviteAlert. For more information -> https://iosappaccessautomation-9db62b5fb979.herokuapp.com/'
        });
    }
};

module.exports = verifyiOSAppInvite;