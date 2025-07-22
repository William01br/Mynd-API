import authServices from '../../use-cases/services/authServices.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Enter all the information' });

  try {
    const user = await authServices.login(email, password);

    if (!user)
      return res.status(400).json({ message: 'Email or Password wrong' });

    const token = authServices.generateToken(user._id);
    return res.status(200).json({ token: token });
  } catch (err) {
    res.status(500).json({ error: err.message, message: 'Error logging in' });
  }
};
