const db = require("../models");
const User = db.user;
const Device = db.device;

async function saveUser(email, transaction) {
    await User.findOrCreate({
        where: { email: email },
        defaults: {
            email: email
        },
        transaction
    });
}

async function saveDevice(udid, deviceModel, email, transaction) {
    await Device.upsert(
      {
        udid: udid,
        device_model: deviceModel,
        email: email
      },
      { transaction }
    );
}

exports.newDevice = async (req, res) => {
  
  const { email, udid, device_model } = req.body;
  if (!email || !udid || !device_model) {
      return res.status(403).json({ message: 'Missing required fields' });
  }

  if (udid == "ffffffffffffffffffffffffffffffffffffffff") {
    return res.status(403).json({ message: 'Simulator not allowed' });
  }

  try {
    const transaction = await db.sequelize.transaction();
    try {
      await saveUser(email, transaction);
      await saveDevice(udid, device_model, email, transaction);

      await transaction.commit();

      res.status(200).json({ message: "successfully saved" });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "server error" });
  }
};

exports.emails = async (req, res) => {
  try {
    const emails = await User.findAll({
      attributes: ['email']
    });
    res.status(200).json(emails.map(user => user.email));
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "server error" });
  }
};
