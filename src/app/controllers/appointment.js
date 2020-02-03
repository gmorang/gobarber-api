import Appointment from '../models/appointment';
import * as Yup from 'yup';
import User from '../models/user';

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "validation fails" })
    }

    /**
     * Check if provider_id is a provider
     */

    const { provider_id, date } = req.body;

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true }
    });

    if (!isProvider) res.status(401).json({ error: 'You can only appointments with providers' })

    const appointment = await Appointment.create({
      user_id: req.user_id,
      provider_id,
      date
    })

    return res.json(appointment);
  }
}

export default new AppointmentController();
