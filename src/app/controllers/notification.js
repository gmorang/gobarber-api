import Notification from '../schemas/notifaction';

import User from '../models/user';

class NotificationController {
  async index(req, res) {

    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only appointments with providers' })
    }

    const notifactions = await Notification.find({ user: req.userId }).sort({ createdAt: 'desc' }).limit(20)

    return res.json(notifactions);

  }
}

export default new NotificationController();
